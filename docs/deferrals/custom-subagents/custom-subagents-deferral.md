---
type: deferral
title: Custom Subagent Definitions
description: Defer creation of purpose-built subagent markdown definitions until automated multi-agent orchestration or distinct agent permissions are required.
status: stable
---

# Custom Subagent Definitions Deferral

## Context

During harness setup, stub subagents (`planner.md` and `reviewer.md`) were created under `.cursor/agents/` and `.claude/agents/` to satisfy `AGT-01` and `AGT-02`. These files contained generic guidance duplicating existing skills (`code-spec`, `code-plan`, `code-review`) without providing specialized tools, prompts, or execution capabilities.

In accordance with strict YAGNI (`pragmatic-guard` and `.agents/rules/yagni-strict.md`), this stateless marketing site repository is pair-programmed directly by a single agent using existing task-specific skills. Dedicated subagent stubs add maintenance overhead and false architectural surface without present need.

## Revisit triggers

Revisit defining dedicated subagents when:

- [ ] A multi-agent orchestration pipeline is introduced that requires autonomous handoffs between agents with isolated context windows.
- [ ] An automated overnight visual regression or accessibility auditing agent is deployed with distinct tool permissions.
- [ ] Subagents require specialized model parameters, temperatures, or system prompts differing from the primary assistant.
