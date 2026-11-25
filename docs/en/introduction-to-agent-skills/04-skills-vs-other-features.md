**English** | [Español](../../es/introduction-to-agent-skills/04-skills-vs-other-features.md)

# 4. Skills vs. other Claude Code features

> **In one line:** each feature has its own job — combine them instead of forcing everything into skills.

## Five ways to customize Claude Code

Claude Code offers several customization options: skills, `CLAUDE.md`, subagents, hooks and MCP servers. They solve different problems, and knowing when to use each one saves you from building the wrong thing.

| Feature | When it acts | Best for |
|---|---|---|
| **CLAUDE.md** | Loaded in every conversation | Project standards that always apply |
| **Skills** | On demand, **by request**: they activate based on what you ask | Task-specific knowledge |
| **Subagents** | When work is delegated to them, in their **own separate context** | Delegated, isolated work |
| **Hooks** | **By events**: a tool call, a file edit, the start of a session… | Automatic operations that must always happen |
| **MCP servers** | When Claude needs an external tool | External tools and integrations |

## Skills vs. CLAUDE.md

`CLAUDE.md` loads in every conversation: use it for project standards that are always on. Skills load on demand: use them for knowledge that only matters for certain tasks. See also [where each rule belongs](../claude-code-in-action/03-skills.md#which-surface-owns-each-rule).

## Skills vs. subagents

A **subagent** is a helper that runs in a separate context. It receives a task, works on it independently and returns the results. It is isolated from the main conversation.

Skills, on the other hand, **add knowledge to your current conversation**.

Use subagents when:

- You want to delegate a task to a separate context.
- You need different tool access than the main conversation.
- You want isolation between the delegated work and your main context.

You can combine both: a subagent can load skills ([chapter 5](05-sharing-skills.md#skills-and-subagents)).

## Skills vs. hooks

Hooks are triggered **by events**: they fire when a file is saved or a tool is called. Skills are triggered **by requests**: they activate based on what you are asking. If something must happen every time, no matter what you ask, it is a hook. See [Claude Code in Action → Hooks](../claude-code-in-action/04-hooks.md).

## Skills vs. MCP servers

**MCP servers** give Claude new tools and integrations, for example to query a database or use an external service. That is a completely different category: a skill teaches Claude **how** to do a task; an MCP server gives Claude **access** to something. A skill can explain how to use the tools an MCP server provides.

## A typical setup

| Piece | Job | In this repository |
|---|---|---|
| `CLAUDE.md` | Always-on project standards | [CLAUDE.md](../../../CLAUDE.md): bilingual writing rules |
| Skills | Task knowledge, on demand | [verify](../../../.claude/skills/verify/SKILL.md), [add-course](../../../.claude/skills/add-course/SKILL.md) |
| Hooks | Automatic operations on events | [.claude/hooks/](../../../.claude/hooks/): secrets, translations, compaction |
| Subagents | Isolated, delegated work | [docs-reviewer](../../../.claude/agents/docs-reviewer.md) |
| MCP servers | External tools | None needed here — not every project needs all five |

## Quick decision guide

| If you think… | Use |
|---|---|
| "Claude must always know this." | `CLAUDE.md` |
| "Claude should know this when doing X." | A skill |
| "This must happen every time Y happens." | A hook |
| "Do this in a separate context and give me the result." | A subagent |
| "Claude needs access to system Z." | An MCP server |

## Summary

- [ ] `CLAUDE.md`: always-on standards. Skills: task knowledge, loaded on demand.
- [ ] Subagents: isolated contexts for delegated work. Skills add knowledge to the current conversation.
- [ ] Hooks fire on events; skills activate on requests.
- [ ] MCP servers provide external tools; skills teach how to do things.
- [ ] Each feature handles its own specialty. Don't force everything into skills; use several together.

---

[← Configuration and multi-file skills](03-configuration-and-multi-file.md) | Next: [Share skills →](05-sharing-skills.md)
