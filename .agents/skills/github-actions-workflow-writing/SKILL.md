---
name: github-actions-workflow-writing
description: >-
  Write, review, and optimize GitHub Actions workflows with correct YAML syntax,
  reusable workflows, composite actions, matrix builds, caching, concurrency,
  and security hardening. Use when creating or editing `.github/workflows/*`,
  debugging CI failures, or automating GitHub repository tasks. Do NOT use for
  non-GitHub CI systems.
metadata:
  version: '1.0.0'
  sources:
    - 'https://github.com/ancoleman/ai-design-components/tree/main/skills/writing-github-actions'
---

# GitHub Actions Workflow Writing

Create GitHub Actions workflows for CI/CD pipelines, automated testing,
deployments, and repository automation using YAML-based configuration with
native GitHub integration.

## Purpose

GitHub Actions is the native CI/CD platform for GitHub repositories. This skill
covers workflow syntax, triggers, job orchestration, reusable patterns,
optimization techniques, and security practices specific to GitHub Actions.

**Core focus:**
- Workflow YAML syntax and structure
- Reusable workflows and composite actions
- Matrix builds and parallel execution
- Caching and optimization strategies
- Secrets management and OIDC authentication
- Concurrency control and artifact management

## When to use this skill

Trigger this skill when:
- Creating CI/CD workflows for GitHub repositories
- Automating tests, builds, and deployments via GitHub Actions
- Setting up reusable workflows across multiple repositories
- Optimizing workflow performance with caching and parallelization
- Implementing security best practices for GitHub Actions
- Troubleshooting GitHub Actions YAML syntax or behavior

## wolven-prod repo patterns

Before inventing new workflow structure, read the existing workflows:

| File | Role |
|------|------|
| `.github/workflows/validate.yml` | PR/push validation: pnpm tests, legacy Compose validate, shell self-test, optional slot matrix |
| `.github/workflows/deploy.yml` | Manual `workflow_dispatch` deploy via SSH to `/opt/wolven-prod` |

Follow repo policy from [AGENTS.md](../../../AGENTS.md):

- Keep CI behind the protected `production` environment only for deploy work
- Do not enable structural slot deployment before the Phase 1 identity gate is recorded
- Pin third-party actions to commit SHAs, matching existing workflow style
- Use `permissions: contents: read` unless a job truly needs more
- Deploy by exact reviewed 40-character commit SHA
- Never embed production secrets in workflow YAML; use GitHub Environment secrets such as `PROD_CI_SSH_KEY`

## Workflow fundamentals

### Basic workflow structure

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
```

**Key components:**
- `name`: Workflow display name
- `on`: Trigger events (`push`, `pull_request`, `schedule`, `workflow_dispatch`)
- `permissions`: Least-privilege defaults
- `jobs`: Job definitions (parallel by default)
- `runs-on`: Runner type
- `steps`: Sequential operations

For complete trigger reference, see [references/triggers-events.md](references/triggers-events.md).

## Decision frameworks

### Reusable workflow vs composite action

**Use reusable workflow when:**
- Standardizing entire CI/CD jobs across repositories
- Need complete job replacement with inputs/outputs
- Want secrets to inherit by default

**Use composite action when:**
- Packaging 5-20 step sequences for reuse
- Need step-level abstraction within jobs
- Require local file access without artifacts

For detailed patterns, see [references/reusable-workflows.md](references/reusable-workflows.md) and [references/composite-actions.md](references/composite-actions.md).

### Caching strategy

Prefer built-in setup action caching:

```yaml
- uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
  with:
    node-version: 24
    cache: pnpm
```

Use manual `actions/cache` only for custom paths or non-standard artifacts. See [references/caching-strategies.md](references/caching-strategies.md).

## Common patterns

### Multi-job workflow with dependencies

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - run: pnpm run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
      - run: pnpm test
```

### Matrix builds

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: [22, 24]
    steps:
      - uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020 # v4.4.0
        with:
          node-version: ${{ matrix.node }}
      - run: pnpm test
```

See [examples/matrix-build.yml](examples/matrix-build.yml) for more patterns.

### Concurrency control

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

For production deploys, prefer a fixed group with `cancel-in-progress: false`, as in `.github/workflows/deploy.yml`.

## Security best practices

- Pin actions to commit SHAs, not floating tags
- Set minimal `permissions` at workflow and job level
- Pass secrets through `env:` blocks, never echo them
- Prefer OIDC over long-lived cloud credentials when integrating with AWS or other providers
- Use `pull_request` for untrusted fork code; treat `pull_request_target` as dangerous

See [references/security-practices.md](references/security-practices.md).

## Progressive disclosure

### Detailed references

- [references/workflow-syntax.md](references/workflow-syntax.md)
- [references/reusable-workflows.md](references/reusable-workflows.md)
- [references/composite-actions.md](references/composite-actions.md)
- [references/caching-strategies.md](references/caching-strategies.md)
- [references/security-practices.md](references/security-practices.md)
- [references/triggers-events.md](references/triggers-events.md)
- [references/marketplace-actions.md](references/marketplace-actions.md)

### Working examples

- [examples/basic-ci.yml](examples/basic-ci.yml)
- [examples/matrix-build.yml](examples/matrix-build.yml)
- [examples/reusable-deploy.yml](examples/reusable-deploy.yml)
- [examples/composite-setup/action.yml](examples/composite-setup/action.yml)
- [examples/monorepo-workflow.yml](examples/monorepo-workflow.yml)
- [examples/security-scan.yml](examples/security-scan.yml)

### Validation script

```bash
bash .agents/skills/github-actions-workflow-writing/scripts/validate-workflow.sh .github/workflows/validate.yml
```
