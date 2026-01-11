#!/usr/bin/env bash
# Example: log a navigation click from the demo
node "$(dirname "$0")/log_action.js" '{"action":"nav_click","data":{"item":"Onze bomen & planten > Olijfbomen"}}' 

echo "Logged demo nav_click"
