---
description: Run the full validation suite including harness validation, typecheck, linting, tests, and formatting checks.
---

# Validate Suite

Run all validation checks across the workspace:

```bash
pnpm harness:validate && pnpm typecheck && pnpm lint && pnpm test && pnpm format:check
```

Verify that all checks exit with code 0 before committing.
