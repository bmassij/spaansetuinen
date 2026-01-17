"""Small CLI to demonstrate the roo_compat helpers.

Run as:
  python tools/roo_compat/run_compat_example.py

This script does not call any remote provider; it only demonstrates sanitization
and parsing logic so you can integrate the methods into your actual request
builder and response handler.
"""
from roo_compat import sanitize_request, safe_extract_content, build_chat_request


if __name__ == "__main__":
    example_request = {
        "model": "local-llm",
        "messages": [{"role": "user", "content": "Say hi"}],
        "functions": [{"name": "do_thing", "parameters": {"type": "object"}}],
        "tool_choice": "some_tool",
    }

    cleaned = sanitize_request(example_request)
    print("Cleaned request:\n", cleaned)

    # Example of a noisy model output
    noisy = "```json\n{\"result\": \"ok\"}\n```"
    print("Parsed output:\n", safe_extract_content(noisy))

    # Build a chat request helper usage
    req = build_chat_request(messages=example_request["messages"], model="local-llm", temperature=0.2)
    print("Built payload for local LM:\n", req)
