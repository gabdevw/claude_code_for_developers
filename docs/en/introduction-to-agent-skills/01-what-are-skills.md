**English** | [Español](../../es/introduction-to-agent-skills/01-what-are-skills.md)

# 1. What skills are

> **In one line:** a skill is a Markdown file that teaches Claude how to do something once; after that, Claude applies it automatically whenever it is relevant.

## What a skill is

A **skill** teaches Claude a task one time. Claude then uses that knowledge on its own when the situation comes up, without you explaining it again.

Each skill lives in a `SKILL.md` file. At the top, between two `---` lines, is the **frontmatter**: a small block with the skill's name and description.

```yaml
---
name: pr-review
description: Reviews pull requests for code quality. Use when reviewing PRs or checking code changes.
---
```

Everything after the second `---` is the set of instructions Claude follows when the skill is active.

## How Claude chooses a skill

1. You make a request, for example "review this PR".
2. Claude compares your request with the **descriptions** of all available skills. It matches by meaning, not by exact words.
3. It activates the skills that match and loads their full instructions.

So **the description is how Claude decides** whether to use a skill. [Chapter 3](03-configuration-and-multi-file.md#write-descriptions-that-work) explains how to write a good one.

## Skills load on demand

| | `CLAUDE.md` | Skill |
|---|---|---|
| When it loads | In **every** conversation | Only when it is relevant. Until then, only its description is loaded. |
| Best for | Project standards that always apply | Knowledge for specific tasks |

Because only the descriptions load up front, you can have many skills without filling the context window (everything Claude can read at once in a conversation).

## Where skills live

| Type | Location | Who gets it |
|---|---|---|
| **Personal** | `~/.claude/skills/<name>/SKILL.md`<br>Windows: `C:/Users/<your-user>/.claude/skills/<name>/SKILL.md` | You, in all your projects. |
| **Project** | `.claude/skills/<name>/SKILL.md` at the repository root | Everyone who clones the repository. It is committed with your code. |

## When to use a skill

Skills work best for **specialized knowledge that applies to specific tasks**:

- Your team's code review standards.
- The commit message format you prefer.
- Your organization's brand guidelines.
- Documentation templates for specific kinds of documents.
- Debugging checklists for particular frameworks.

The rule of thumb is simple: **if you find yourself explaining the same thing to Claude again and again, that is a skill waiting to be written.**

## In this repository

- Project skills that help maintain this repository: [.claude/skills/](../../../.claude/skills/) (`verify` and `add-course`).
- Reusable skills for any project: [plugins/agent-skills-starter/skills/](../../../plugins/agent-skills-starter/skills/).
- From the previous course: [Claude Code in Action → Skills](../claude-code-in-action/03-skills.md).

## Summary

- [ ] A skill is a `SKILL.md` file with a name and a description in its frontmatter, followed by instructions.
- [ ] Claude compares your request with every description and activates the skills that match.
- [ ] Skills load on demand; `CLAUDE.md` loads in every conversation.
- [ ] Personal skills: `~/.claude/skills`. Project skills: `.claude/skills` (shared through git).
- [ ] Explaining the same thing to Claude over and over? Write a skill.

---

[← Course index](README.md) | Next: [Create your first skill →](02-creating-a-skill.md)
