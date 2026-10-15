#!/usr/bin/env bash
# Gate hook: Inspects commands before shell execution and blocks risky operations
set -euo pipefail

COMMAND="${1:-}"

# Reject destructive system commands
if echo "$COMMAND" | grep -qE "(rm -rf /|mkfs|dd if=|chmod -R 777)"; then
  echo "Blocked destructive command pattern detected: $COMMAND" >&2
  exit 1
fi

# Reject accidental force push or production host commands
if echo "$COMMAND" | grep -qE "(git push.*--force|ssh.*prod)"; then
  echo "Blocked dangerous git/ssh command: $COMMAND" >&2
  exit 1
fi

exit 0
