Roo compatibility layer

Purpose
-------
This small package provides helper functions to make Roo work reliably with
local LLMs (llama.cpp, LM Studio, etc.) by ensuring:

- No function-calling or tool-related fields are included in requests
- Responses are parsed as free-form text only
- Malformed JSON / tool-like syntax from models is treated as plain text
- Warnings are logged instead of throwing errors

Usage
-----
Import the helpers and call them from your project's request builder and
response handler:

from roo_compat import sanitize_request, safe_extract_content, build_chat_request

# Before sending a payload to a local LM
payload = sanitize_request(payload)

# After receiving a response from a local LM
text = safe_extract_content(response)

Integration
-----------
Patch your code that currently constructs OpenAI-like requests or expects
function_call outputs to instead call these helpers. The example script
run_compat_example.py demonstrates intended usage.

Compatibility
-------------
This module is intentionally conservative and makes no assumptions about the
remote/model API. It only manipulates Python data structures and strings. It is
safe to vendor into other projects.
