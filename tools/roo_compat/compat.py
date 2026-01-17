import re
import json
import logging
from typing import Any, Dict

logger = logging.getLogger("roo_compat")
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = logging.Formatter("[roo_compat] %(levelname)s: %(message)s")
    handler.setFormatter(formatter)
    logger.addHandler(handler)
logger.setLevel(logging.WARNING)

REMOVE_KEYS = {"tools", "tool_choice", "function_call", "parallel_tool_calls", "functions", "function_call_schema"}


def _remove_fields(obj: Any) -> Any:
    """Recursively remove tool/function related fields from dicts and lists.

    This mutates nested structures and always returns a sanitized copy or the
    original primitive value.
    """
    if isinstance(obj, dict):
        changed = False
        out = {}
        for k, v in obj.items():
            if k in REMOVE_KEYS:
                changed = True
                continue
            cleaned = _remove_fields(v)
            out[k] = cleaned
            if cleaned is not v:
                changed = True
        return out
    elif isinstance(obj, list):
        return [_remove_fields(x) for x in obj]
    else:
        return obj


def sanitize_request(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Return a sanitized copy of a model request payload.

    - Strips any fields that enable function-calling or tool usage.
    - Logs a warning when such fields are found instead of raising.
    - Safe to call on already-clean payloads.
    """
    if not isinstance(payload, dict):
        logger.warning("sanitize_request called with non-dict payload; returning as-is")
        return payload

    # Quick check for keys to remove
    present = REMOVE_KEYS.intersection(set(payload.keys()))
    if present:
        logger.warning("Removing fields from request that local models don't support: %s", sorted(list(present)))

    cleaned = _remove_fields(payload)

    # Enforce chat-completion friendly shape for LM Studio / llama.cpp style APIs
    # Keep messages, model, temperature, max_tokens, etc. Do not add functions or tools.
    if "functions" in cleaned:
        # defensive — should already be stripped, but ensure removal
        cleaned.pop("functions", None)
    if "tool_choice" in cleaned:
        cleaned.pop("tool_choice", None)

    return cleaned


def _strip_code_fences(text: str) -> str:
    # Remove fenced blocks like ```json ... ``` or ``` ... ``` but keep inner text
    return re.sub(r"```[a-zA-Z0-9+-]*\\n(.*?)```", lambda m: m.group(1), text, flags=re.S)


def parse_response_freeform(resp: Any) -> str:
    """Normalize model responses to free-form plain text.

    - Accepts strings, dicts (OpenAI-like choices/messages), or other types.
    - If JSON is present inside the text, attempt to pretty-print it, but on any
      parse error return the raw text (no exceptions).
    - Ignores any attempted tool syntax and treats everything as plain text.
    """
    try:
        if isinstance(resp, dict):
            # Common OpenAI-style response structures
            if "choices" in resp and isinstance(resp["choices"], list) and resp["choices"]:
                # Try message.content or text
                c = resp["choices"][0]
                if isinstance(c, dict):
                    # gpt-style
                    msg = c.get("message") or c.get("text") or c
                    if isinstance(msg, dict):
                        text = msg.get("content") or msg.get("text") or json.dumps(msg)
                    else:
                        text = str(msg)
                else:
                    text = str(c)
            elif "message" in resp and isinstance(resp["message"], dict):
                text = resp["message"].get("content", "")
            else:
                # fallback to stringifying the dict
                text = json.dumps(resp)
        else:
            text = str(resp)
    except Exception as e:
        logger.warning("Failed to normalize response structure: %s", e)
        text = str(resp)

    # Remove code fences but keep content
    text = _strip_code_fences(text)

    # Try to extract JSON inside the text and pretty-print it; if invalid, keep raw
    json_match = re.search(r"\{[\s\S]*\}|\[[\s\S]*\]", text)
    if json_match:
        candidate = json_match.group(0)
        try:
            parsed = json.loads(candidate)
            pretty = json.dumps(parsed, indent=2, ensure_ascii=False)
            # Replace the found JSON blob with pretty text representation
            start, end = json_match.span(0)
            text = text[:start] + pretty + text[end:]
        except Exception:
            # Malformed JSON — ignore and return the text with fences stripped.
            logger.warning("Found JSON-like content but could not parse; returning as plain text")

    # Final defensive cleanup: remove any residual explicit tool tokens
    text = re.sub(r"<\/?(function_call|tool|tools)[^>]*>", "", text)

    return text


def safe_extract_content(api_response: Any) -> str:
    """Compatibility helper to be called by agent wrappers.

    Use this to get a safe plain-text assistant reply regardless of model output
    format. Never raises on malformed structured output.
    """
    try:
        return parse_response_freeform(api_response)
    except Exception as e:
        logger.warning("Unexpected error while parsing model output: %s", e)
        # Last-resort fallback
        try:
            return str(api_response)
        except Exception:
            return ""


# Small convenience for wrappers that build requests for local LMs
def build_chat_request(messages: Any, model: str = None, **kwargs) -> Dict[str, Any]:
    payload = {"messages": messages}
    if model:
        payload["model"] = model
    payload.update(kwargs)
    return sanitize_request(payload)
