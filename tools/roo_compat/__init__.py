"""Roo compatibility layer for local LLMs.

Expose a minimal API that other parts of the project can import to ensure no
function-calling or tools are sent to local models and responses are treated as
plain text.
"""
from .compat import (
    sanitize_request,
    parse_response_freeform,
    safe_extract_content,
    build_chat_request,
)

__all__ = [
    "sanitize_request",
    "parse_response_freeform",
    "safe_extract_content",
    "build_chat_request",
]
