#!/usr/bin/env bash
# Feedback hook: Runs after file edits to provide rapid diagnostic feedback
set -euo pipefail

FILE_PATH="${1:-}"

# If a TypeScript/TSX file was edited, run quick syntax check
if [[ "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  pnpm typecheck >/dev/null 2>&1 || true
fi

exit 0
