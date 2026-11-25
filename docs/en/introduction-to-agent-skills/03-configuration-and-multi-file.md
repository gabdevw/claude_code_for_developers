**English** | [Español](../../es/introduction-to-agent-skills/03-configuration-and-multi-file.md)

# 3. Configuration and multi-file skills

> **In one line:** a good description is what matters most; add `allowed-tools` and `model` when they help, and keep `SKILL.md` short by moving details to `scripts/`, `references/` and `assets/`.

## Frontmatter fields

The open [Agent Skills standard](https://agentskills.io) defines the core fields of `SKILL.md`, and Claude Code adds many of its own, such as `model`. **In Claude Code every field is optional, and only `description` is recommended.** These four are a good starting point:

| Field | In Claude Code | What it does |
|---|---|---|
| `name` | Optional. Defaults to the folder name. | Identifies the skill. |
| `description` | **Recommended** | Tells Claude when to use the skill. The most important field, because Claude uses it for matching. |
| `allowed-tools` | Optional | Pre-approves the listed tools while the skill is active. |
| `model` | Optional | Chooses which Claude model to use for the skill. |

> **Important:** if you upload the skill to **claude.ai** or the **Claude API**, the open standard's rules apply: `name` and `description` are required, `name` can only have lowercase letters, numbers and hyphens (max 64 characters), and `description` can have up to 1,024 characters. Following these rules everywhere keeps your skills portable.

The official frontmatter reference lists the rest of the fields (for example `disable-model-invocation`, from the [previous course](../claude-code-in-action/03-skills.md#frontmatter-fields)).

## Write descriptions that work

Be explicit. If someone told you "your job is to help with documentation", you wouldn't know what to do — and Claude thinks the same way.

A good description answers two questions:

1. **What does the skill do?**
2. **When should Claude use it?**

| Vague | Effective |
|---|---|
| "Helps with documentation." | "Writes API reference pages from the route handlers in `src/api`. Use when the user asks to document an endpoint, update the API docs or 'write docs for this route'." |

If your skill doesn't trigger when you expect, **add keywords that match how you really phrase your requests** — including other languages your team uses. The description is what Claude uses to decide if a skill is relevant, so the wording matters.

## Pre-approve tools with `allowed-tools`

Sometimes a skill uses the same few tools every time, and you don't want to approve each call by hand. `allowed-tools` pre-approves the tools you list, so Claude can use them **without a permission prompt for the rest of the turn that invoked the skill** (a turn lasts until Claude finishes answering your request).

```yaml
---
name: codebase-onboarding
description: Helps new developers understand how the system works.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---
```

In this example, while the skill is active, Claude can use `Read`, `Grep`, `Glob` and `Bash` without asking.

Good practices:

- **Approve only what you need.** `Bash(git log *)` approves only `git log` commands; plain `Bash` approves every command.
- `allowed-tools` approves tools; it doesn't block the others. Tools that aren't listed still ask for permission.
- You can write the list as a string (`Read, Grep`) or as a YAML list.
- The course example describes *what* but not *when*. Our version adds the "Use when ..." part: [codebase-onboarding](../../../plugins/agent-skills-starter/skills/codebase-onboarding/SKILL.md).

## Progressive disclosure

Skills share Claude's context window with your conversation. When Claude activates a skill, it loads that `SKILL.md` into the context. But some skills need references, examples or helper scripts.

**Progressive disclosure** means: keep the essential instructions in `SKILL.md`, and put the detailed material in separate files that Claude reads **only when needed**.

The open standard suggests this layout:

| Folder | For |
|---|---|
| `scripts/` | Executable code |
| `references/` | Additional documentation |
| `assets/` | Images, templates and other data files |

In `SKILL.md`, link the support files with clear instructions about **when** to load them: `If the user asks about errors, read [references/errors.md](references/errors.md).`

A good rule of thumb: **keep `SKILL.md` under 500 lines.** If you go over, split the content into reference files.

## Use scripts efficiently

Scripts in your skill folder run **without loading their content into the context**. Only their output uses tokens.

The key instruction in your `SKILL.md` is to tell Claude to **run** the script, not to read it. Use `${CLAUDE_SKILL_DIR}` to point to the skill's own folder, wherever Claude is working:

```markdown
Run `node ${CLAUDE_SKILL_DIR}/scripts/scaffold-course.js <course> <chapters...>`. Don't read the script.
```

Scripts are especially useful for:

- Checking that the environment is ready.
- Data transformations that must always give the same result.
- Operations that are more reliable as tested code than as code Claude writes each time.

## In this repository

The [add-course](../../../.claude/skills/add-course/SKILL.md) skill uses every idea of this chapter:

```text
.claude/skills/add-course/
├── SKILL.md                      ← short procedure, with "when" in the description
├── references/
│   ├── writing-style.md          ← read when writing pages
│   └── examples-guide.md         ← read when choosing examples
├── scripts/
│   └── scaffold-course.js        ← Claude runs it to create the bilingual skeleton
└── assets/
    ├── course-readme.en.md / .es.md
    └── lesson.en.md / .es.md     ← templates the script fills
```

- [codebase-onboarding](../../../plugins/agent-skills-starter/skills/codebase-onboarding/SKILL.md): `allowed-tools` + `model`.
- [skill-troubleshooter](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/SKILL.md): a script and a reference file.

## Summary

- [ ] In Claude Code every frontmatter field is optional; `description` is the one that matters most.
- [ ] For claude.ai or the API: `name` lowercase with hyphens (max 64), `description` up to 1,024 characters.
- [ ] A description says **what** and **when**; add the words people really use.
- [ ] `allowed-tools` pre-approves tools for the turn; approve only what you need.
- [ ] Keep `SKILL.md` under 500 lines; move details to `references/`, code to `scripts/`, templates to `assets/`.
- [ ] Tell Claude to **run** scripts, not read them: only the output uses tokens.

---

[← Create your first skill](02-creating-a-skill.md) | Next: [Skills vs. other Claude Code features →](04-skills-vs-other-features.md)
