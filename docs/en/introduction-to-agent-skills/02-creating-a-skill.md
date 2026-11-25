**English** | [Español](../../es/introduction-to-agent-skills/02-creating-a-skill.md)

# 2. Create your first skill

> **In one line:** create a folder with the skill's name, put a `SKILL.md` inside, and check that Claude can see it.

## Step 1: create the folder

Create a folder for your skill inside the skills folder. **The folder name must match the skill name.**

This example is a personal skill, so it lives in your home folder and works in all your projects:

```bash
# macOS / Linux / Git Bash
mkdir -p ~/.claude/skills/pr-description
```

```powershell
# Windows PowerShell
New-Item -ItemType Directory -Force "$HOME\.claude\skills\pr-description"
```

For a project skill, use `.claude/skills/pr-description` inside the repository instead.

## Step 2: write SKILL.md

Create a `SKILL.md` file inside that folder. It has two parts, separated by the frontmatter dashes:

````markdown
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
````

| Part | What it does |
|---|---|
| `name` | Identifies your skill. It is also the command to call it: `/pr-description`. |
| `description` | Tells Claude **when** to use it. This is the matching criterion. |
| Everything after the second `---` | The instructions Claude follows when the skill is active. |

## Step 3: check that it is available

- Run `/skills` to see the list of available skills (type to filter it).
- Claude Code notices changes in the skill folders during the session. If a new skill doesn't appear, run `/reload-skills`.
- If the skills folder itself was created during this session (for example, with your first personal skill), changes aren't noticed automatically: run `/reload-skills` after each change.
- Test it with a real request: "write the PR description for this branch". Or call it directly: `/pr-description`.

## When two skills have the same name

If you clone a repository that has a skill with the same name as one of your personal skills, which one wins? There is a clear priority order:

| Priority | Level | Where |
|---|---|---|
| 1 (highest) | **Enterprise** | Managed settings deployed by your organization |
| 2 | **Personal** | `~/.claude/skills` |
| 3 | **Project** | `.claude/skills` in the repository |

Skills from installed **plugins** are outside this order: they have their own namespace (a prefix that keeps names apart): `/plugin-name:skill-name`. So a plugin skill and another skill with the same name both load.

To avoid conflicts, **use descriptive names**. Instead of `review`, use `frontend-review` or `backend-review`.

## In this repository

- [pr-description](../../../plugins/agent-skills-starter/skills/pr-description/SKILL.md): the course example, improved with `allowed-tools` for the git commands.
- How to copy it as a personal skill: [plugin README → Use a skill as a personal skill](../../../plugins/agent-skills-starter/README.md#use-a-skill-as-a-personal-skill-instead).
- Copy-ready template: [templates/en/SKILL.md](../../../templates/en/SKILL.md).

## Summary

- [ ] Create a folder named like the skill: `~/.claude/skills/<name>/` (personal) or `.claude/skills/<name>/` (project).
- [ ] Inside it, write `SKILL.md`: frontmatter (`name`, `description`) and then the instructions.
- [ ] Check it with `/skills`; use `/reload-skills` if a new skill doesn't appear.
- [ ] Same name in two places: enterprise > personal > project. Plugin skills have their own namespace.
- [ ] Use descriptive names to avoid conflicts.

---

[← What skills are](01-what-are-skills.md) | Next: [Configuration and multi-file skills →](03-configuration-and-multi-file.md)
