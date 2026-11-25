**English** | [Español](../../es/claude-code-in-action/02-claude-md.md)

# 2. A CLAUDE.md that Claude follows

> **In one line:** keep it short, specific and up to date. The leaner the file, the more of it Claude follows.

## What CLAUDE.md is

`CLAUDE.md` is a Markdown file that Claude reads at the start of every session. It tells Claude how your project works.

The key thing to understand: **CLAUDE.md is guidance, not enforced configuration.** Every line competes with every other line for Claude's attention. The longer the file, the more it competes with itself, and the less reliably Claude follows any single rule.

So the goal is not to write everything down. The goal is to keep the file tight.

- Create a first version with `/init`. Claude looks at your project and writes one for you (if one exists, it suggests improvements instead).
- Open and edit it with `/memory`, or in your editor.

## First, ask if CLAUDE.md is the right tool

| Kind of rule | Where it belongs | Why |
|---|---|---|
| Conventions that are always true (names, where files go) | `CLAUDE.md` | Claude reads it in every session. |
| Steps for one kind of task (release, review, migration) | A [skill](03-skills.md) | It only loads when that task comes up. |
| A rule Claude **must not** be able to skip | A [hook](04-hooks.md) | It is code, so it always runs. |

**Move your hard rules to hooks and let CLAUDE.md handle the softer conventions.**

## The four locations

| Level | Path | Who it is for | In git? |
|---|---|---|---|
| **Managed policy** | Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`<br>macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br>Linux: `/etc/claude-code/CLAUDE.md` | The whole organization. Your platform team controls it and you can't opt out, so the org policy always applies. | No |
| **User** | `~/.claude/CLAUDE.md` | You, in every project on your machine. | No |
| **Project** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Your team. It is committed to the repository. | Yes |
| **Local** | `./CLAUDE.local.md` | You, only in this repository. Personal notes. | No (add it to `.gitignore`) |

Claude reads every one that exists and combines them.

## Split a long file with imports

When your project file starts to grow, split it into pieces with the import syntax `@path/to/file`. Instead of a wall of text, you point to other files:

```markdown
# My project

See @README.md for an overview and @package.json for the available commands.

## Rules
- API conventions: @docs/api-conventions.md
- Testing: @docs/testing.md
- My personal preferences: @~/.claude/my-preferences.md
```

> **Important:** imports **organize** the file, but they **don't reduce the context**. Imported files are loaded at the start, just like the main file.

If you want rules that load **only when needed**, put them in `.claude/rules/` and say which files they apply to with `paths`:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

- Put each API handler in its own file in src/api/handlers.
- Validate the request body with the schemas in src/api/schemas.
```

Claude only loads that file when it works with files that match those paths.

## Wording is what makes rules stick

Once you have decided that a rule belongs in CLAUDE.md, whether Claude actually follows it depends on how you write it. Most rules fail because they are vague. Here is how to fix that.

### Be specific and checkable

You should be able to look at the result and say "yes, it followed the rule" or "no, it didn't".

| Vague | Specific |
|---|---|
| "Follow best practices for API routes." | "Put new API routes in `src/api/handlers`, one per file." |
| "Write good tests." | "Add a test in `tests/` for every new function. Run them with `npm test`." |
| "Keep the code clean." | "Run `npm run lint` before saying a task is done." |

### Name the replacement, don't just forbid

When you tell Claude **not** to do something, say what to do **instead**. Otherwise you leave the door open.

| Leaves the door open | Closes it |
|---|---|
| "Don't use default exports." (OK, but then what?) | "Use named exports, not default exports." |
| "Don't use `console.log`." | "Use the logger in `src/lib/logger.ts`, not `console.log`." |

### Write plainly instead of adding emphasis

`IMPORTANT!!!`, `YOU MUST`, `NEVER EVER` don't help. When everything is emphasized, nothing stands out. Write the rule simply. If a rule is truly critical, it belongs in a hook.

### Keep reviewing it

Your CLAUDE.md is never finished. Treat it as living code that you keep editing. Every time Claude gets something wrong, ask:

1. Is a rule missing? → add it.
2. Is the rule vague? → make it specific.
3. Is the rule buried in a long file? → cut other lines, or move them to a skill or an import.
4. Must it never fail? → move it to a hook.

## Example

```markdown
# Shop API

Node.js REST API for the online shop.

## Commands
- Test: `npm test`
- Lint: `npm run lint`

## Conventions
- Put new API routes in src/api/handlers, one per file.
- Use named exports, not default exports.
- Use the logger in src/lib/logger.ts, not console.log.

## Workflow
- Run `npm test` and `npm run lint` before saying a task is done.
```

Copy-ready templates: [templates/en/CLAUDE.md](../../../templates/en/CLAUDE.md). This repository's own file: [CLAUDE.md](../../../CLAUDE.md).

## Summary

Treat your CLAUDE.md like production code. If you can't justify a line, delete it. To keep the file lean and easy to follow:

- [ ] Move hard rules to **hooks**, where they are actually enforced.
- [ ] Organize long files with **imports** (just remember they don't reduce the context).
- [ ] Make every rule **specific and checkable**, and **name the replacement**.
- [ ] Write rules **plainly** instead of adding emphasis.
- [ ] **Keep reviewing** the file whenever Claude gets something wrong.

The whole idea is simple: the leaner the file, the more of it Claude follows.

---

[← 1. Managing long sessions](01-long-sessions.md) | Next: [3. Skills →](03-skills.md)
