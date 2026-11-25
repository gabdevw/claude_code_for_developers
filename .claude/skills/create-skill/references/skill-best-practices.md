# Skill best practices

## Where it goes

| Scope | Folder | When |
|---|---|---|
| Personal | `~/.claude/skills/<name>/` (Windows: `C:/Users/<user>/.claude/skills/<name>/`) | Only the user needs it, in every project. |
| Project | `.claude/skills/<name>/` | The team needs it in this repository. Commit it. |
| Plugin | `<plugin>/skills/<name>/` | It is useful beyond one project. Share it through a marketplace. |

Priority when names collide: **enterprise > personal > project**. Plugin skills are namespaced (`/plugin:skill`) and don't collide.

## Name

- Same as the folder. Lowercase letters, numbers and single hyphens, max 64 characters (required to upload to claude.ai or the API).
- Descriptive, to avoid conflicts: `frontend-review`, `release-notes`, not `review` or `helper`.

## Description (the most important field)

Claude decides whether to use the skill by matching the request with the description. It must answer:

1. **What** does the skill do?
2. **When** should Claude use it?

Add the phrases users really type, in every language they use. Keep it under 1,024 characters. Make it different from the other skills' descriptions.

| Weak | Strong |
|---|---|
| "Helps with docs." | "Writes API reference pages from the handlers in `src/api`. Use when the user asks to document an endpoint, update the API docs or 'documenta esta ruta'." |

## Other fields (all optional)

| Field | Use it when |
|---|---|
| `allowed-tools` | The skill always uses the same tools. Approve only what is needed: `Bash(git diff *)`, not `Bash`. Use `${CLAUDE_SKILL_DIR}` for the skill's own scripts. |
| `model` | The task works well (or better) with a specific model, such as `sonnet` for quick read-only work. |
| `disable-model-invocation: true` | Only the user should start it (deployments, anything with side effects). |

## Body

- Numbered steps. Name exact files, commands and the expected result.
- Say what to do when something fails, and what to report at the end.
- Use `$ARGUMENTS` if the user passes input when calling `/name`.

## Progressive disclosure

- SKILL.md under **500 lines**, ideally much less.
- `references/` for long documentation. Link each file and say **when** to read it.
- `scripts/` for operations that must be exact or repeatable. Tell Claude to **run** them, not read them: only the output uses tokens.
- `assets/` for templates, images and data files.
- Use forward slashes in every path. Give scripts execute permission (`chmod +x`) on macOS/Linux, and list their dependencies.

## Final checklist

- [ ] Folder name = `name`, file named exactly `SKILL.md`.
- [ ] Description says what + when, with real trigger phrases.
- [ ] `allowed-tools` is as narrow as possible.
- [ ] Long material moved out of SKILL.md.
- [ ] `claude plugin validate <skills-folder>` passes.
- [ ] Tested with a real request.
