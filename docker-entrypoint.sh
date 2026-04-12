#!/bin/sh
set -e

# Generate /config.js from runtime environment variables.
# This runs at container start, so Railway env vars are automatically available.
CONFIG=/usr/share/nginx/html/config.js
: > "$CONFIG"

[ -n "$AUTH_ENABLED" ] && [ "$AUTH_ENABLED" != "false" ] && echo 'window.__AUTH_GATE__=true;' >> "$CONFIG"
[ -n "$APPWRITE_ENDPOINT" ]    && printf 'window.__APPWRITE_ENDPOINT__="%s";\n'    "$APPWRITE_ENDPOINT"    >> "$CONFIG"
[ -n "$APPWRITE_PROJECT_ID" ]  && printf 'window.__APPWRITE_PROJECT_ID__="%s";\n'  "$APPWRITE_PROJECT_ID"  >> "$CONFIG"
[ -n "$POCKETBASE_URL" ]       && printf 'window.__POCKETBASE_URL__="%s";\n'       "$POCKETBASE_URL"       >> "$CONFIG"

# Inject <script src="/config.js"></script> into HTML files (once, idempotent)
for html in /usr/share/nginx/html/index.html /usr/share/nginx/html/login.html; do
    [ -f "$html" ] || continue
    grep -q '/config.js' "$html" && continue
    sed -i 's|</head>|<script src="/config.js"></script></head>|' "$html"
done

exec nginx -g 'daemon off;'
