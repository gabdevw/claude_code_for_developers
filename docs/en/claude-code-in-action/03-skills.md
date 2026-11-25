**English** | [Español](../../es/claude-code-in-action/03-skills.md)

# 3. Skills: package what you repeat

> **In one line:** if you have written the same multi-step instruction twice, make it a skill.

## What a skill is

A **skill** is a folder with a `SKILL.md` file inside. It has three parts:

1. **A name** — it also becomes a command: the skill `verify` runs with `/verify`.
2. **A description** — it tells Claude *when* to use the skill.
3. **The procedure** — the steps to follow.

Skills are a good way to automate repeated work, for example a check before opening a pull request (PR).

**Why they are cheap:** only the descriptions are loaded into the context. The full content loads only when the skill is needed. So there is little cost in packaging every procedure you repeat.

Claude can use a skill in two ways:

- **Automatically**, when your request matches the description.
- **When you call it**, by typing `/skill-name`.

## Where skills live

| Location | Who gets it |
|---|---|
| `.claude/skills/<name>/SKILL.md` | Everyone working in the project (it is in git). |
| `~/.claude/skills/<name>/SKILL.md` | Only you, in all your projects. |

## Anatomy of a skill

```text
.claude/skills/verify/
├── SKILL.md          ← name, description and short steps
├── reference.md      ← long details, read only when needed
└── scripts/
    └── check.sh      ← a tool Claude runs (it doesn't read it)
```

```markdown
---
name: verify
description: Run every project check before a commit or pull request. Use when the user asks to verify, check or prepare a PR.
---

# Verify

1. Run `bash .claude/skills/verify/scripts/check.sh`.
2. If a check fails, fix the cause and run it again.
3. Review the changes with the checklist in [reference.md](reference.md).
4. Report which checks ran and what you fixed.
```

### Frontmatter fields

The block between `---` lines at the top is the **frontmatter**.

| Field | What it does |
|---|---|
| `description` | The most important field. It says **what** the skill does and **when** to use it. |
| `name` | The command name. If you leave it out, the folder name is used. |
| `disable-model-invocation: true` | Only you can start the skill with `/name`. Good for actions with side effects, like a deployment. |
| `allowed-tools` | Tools Claude can use without asking while the skill runs. |

### Write a description that triggers

| Weak | Strong |
|---|---|
| "Helps with checks." | "Run every project check before a commit or pull request. Use when the user asks to verify, check or prepare a PR." |

## Keep SKILL.md short: reference.md and scripts

- **`reference.md`**: put the detailed material next to `SKILL.md` and link to it. Claude reads it only when it needs it.
- **Scripts**: put them in the folder too. **Claude runs them instead of loading their content into the context**; only the output enters the context. That means a skill can carry its own tools, like a `check.sh` that runs every check.

## Which surface owns each rule

| Rule | Where it goes | Example |
|---|---|---|
| Conventions that apply all the time (naming, where files go) | `CLAUDE.md` | "Use named exports, not default exports." |
| Procedures and reference material tied to one kind of task | A skill | "Steps to publish a new version." |
| A rule Claude must not be able to skip | A [hook](04-hooks.md) | "Never run a command that contains an API key." |

## Start with verification

The best first skill is a **verification** skill. Build it, add it to `.claude/skills/` in your project, and now the whole team inherits the same move. Everyone's work is checked the same way, automatically, without anyone having to remember to ask for it.

Examples in this repository:

- [.claude/skills/verify/](../../../.claude/skills/verify/SKILL.md) — runs [check.sh](../../../.claude/skills/verify/scripts/check.sh) and reviews with [reference.md](../../../.claude/skills/verify/reference.md).
- [.claude/skills/add-course/](../../../.claude/skills/add-course/SKILL.md) — adds a new course in both languages (`/add-course <name>`).
- Template: [templates/en/SKILL.md](../../../templates/en/SKILL.md).

> **Go deeper:** the course [Introduction to Agent Skills](../introduction-to-agent-skills/README.md) covers skills in detail: configuration, subagents, plugins and troubleshooting.

## Summary

- [ ] A skill is a folder with a `SKILL.md`: a name, a description that triggers it, and the procedure.
- [ ] Only descriptions load until a skill is needed, so packaging procedures is cheap.
- [ ] Put long details in `reference.md` and tools in `scripts/`.
- [ ] Rule of thumb: the same multi-step instruction written twice → make it a skill.
- [ ] Start with a verification skill in `.claude/skills/`, so the whole team checks work the same way.

---

[← 2. A CLAUDE.md that Claude follows](02-claude-md.md) | Next: [4. Hooks →](04-hooks.md)
