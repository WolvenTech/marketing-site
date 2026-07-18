---
name: coding-principles
description: >-
  Behavioral coding guidelines plus KISS, YAGNI, and DRY. Use when writing,
  modifying, reviewing, or simplifying code — implementation, refactoring, bug
  fixes, feature work, overengineering concerns, speculative features, or
  duplication. Do NOT use for pure documentation or non-code tasks with no
  design tradeoffs.
metadata:
  version: '1.1.0'
  sources:
    - 'Karpathy Guidelines (coding-guidelines)'
    - 'https://www.boldare.com/blog/kiss-yagni-dry-principles/'
---

# Coding Principles

Bias toward caution over speed, and toward the simplest solution that meets
**current** requirements. Prefer working software over speculative generality.
For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them—don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.
- Disagree honestly. If the user's approach seems wrong, say so—don't be sycophantic.

## 2. Simplicity First (KISS + YAGNI)

**Minimum code that solves the problem. Nothing speculative.**

### KISS — Keep It Simple, Stupid

Build the simplest solution that works.

- Prefer clear, direct flows over clever indirection.
- Hide advanced options; do not make them the default path.
- If you write 200 lines and it could be 50, rewrite it.

**Smell:** A senior engineer would call this overcomplicated → simplify.

### YAGNI — You Aren't Gonna Need It

Implement what is needed **now**, not what might be useful later.

- No features, abstractions, hooks, or config beyond the request.
- No “flexibility” or error handling for impossible scenarios.
- Defer until real demand (data, feedback, or an explicit ask) appears.

**Smell:** “We might need X later” with no current requirement → cut it.

## 3. DRY — Don't Repeat Yourself

Every piece of knowledge should have a single, authoritative representation.

- Extract shared logic only when duplication is real and costly to change.
- Apply across code, tests, and docs — not only source files.
- Wrong abstraction is worse than duplication; wait for a second real use case
  before generalizing (YAGNI before DRY).

**Smell:** The same rule must be edited in many unrelated places → centralize.
If a shared helper is harder to understand than two clear copies, keep the copies.

## 4. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it—don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

**The test:** Every changed line should trace directly to the user's request.

## 5. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## Applying KISS / YAGNI / DRY together

| Situation | Prefer |
| --------- | ------ |
| New feature | Smallest path that satisfies acceptance criteria (KISS + YAGNI) |
| Tempted to generalize | Wait for a second real use case (YAGNI before DRY) |
| Clear duplicate knowledge | One source of truth (DRY), still keep the API simple (KISS) |
| Review / refactor | Remove speculative code; consolidate only proven duplication |

**Balance:** Do not strip essential behavior for “simplicity.” Do not invent
deep abstractions to force DRY. Regular review beats upfront overdesign.

When designing or changing code:

1. Restate the **current** requirement in one sentence.
2. Propose the minimal change that meets it (KISS + YAGNI).
3. Extract shared knowledge only if justified (DRY).
4. Call out rejected speculative work (“skipped X — YAGNI”).
5. If the user asked for unneeded complexity, push back briefly and offer the simpler alternative.

## Anti-patterns

- Multi-step UX or config for a one-field action
- Building “flexibility” nobody requested
- Copy-pasting auth/business rules instead of one module
- Abstracting on the first occurrence “for reuse”
- Optimizing or scaffolding for imagined scale
- Silent assumption-picking when the request is ambiguous
