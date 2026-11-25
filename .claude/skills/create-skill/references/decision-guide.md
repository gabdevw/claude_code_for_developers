# Decision guide: skill, hook, subagent, CLAUDE.md or MCP?

Each feature has its own job. Pick the one that matches how the behavior is **triggered** and how **strict** it must be. Combinations are common.

## The questions

| # | Question | If the answer is… | Use |
|---|---|---|---|
| 1 | What triggers it? | An **event**: before/after a tool call, an edit, the start of a session, the end of a turn, a prompt being sent | **Hook** |
| | | A **kind of task** the user asks for ("write a PR description", "review this") | **Skill** |
| | | **Nothing**: it applies to everything, always | **CLAUDE.md** |
| | | It only applies to **certain files** | **`.claude/rules/`** with `paths` |
| | | **Delegation**: "do this apart and bring me the result" | **Subagent** |
| 2 | What if Claude skips it once? | Unacceptable (security, data loss, broken build, a team rule) | **Hook** |
| | | Acceptable, it's guidance | CLAUDE.md or skill |
| 3 | How long is it? | 1–3 lines, always relevant | CLAUDE.md |
| | | Several steps, a format, a checklist, reference material | Skill |
| 4 | Does it need its own context, different tools or a different model, and only the result matters? | Yes | **Subagent** (it can preload skills) |
| 5 | Does it need access to an outside system (database, API, service)? | Yes | **MCP server** (a skill can teach how to use it) |

## Words that hint the answer

| The request says… | Usually |
|---|---|
| "always", "never", "every time", "before each…", "after each…", "block", "don't let…" | Hook (if it must not fail) or CLAUDE.md (if it is soft guidance) |
| "when I ask for…", "when reviewing…", "the format for…", "the steps to…" | Skill |
| "in a separate context", "in parallel", "a reviewer/researcher that…", "without filling my context" | Subagent |
| "connect to…", "read from our…", "access…" | MCP server |
| "our convention is…", "we use X, not Y" | CLAUDE.md |

## Examples

| Request | Answer | Why |
|---|---|---|
| "Always use pnpm, not npm." | CLAUDE.md | Short convention that is always true. |
| "Never let Claude read `.env` or run commands with API keys." | PreToolUse hook | Must never be skipped. |
| "Format every file after Claude edits it." | PostToolUse hook | Happens on an event, every time. |
| "Don't let Claude finish while tests fail." | Stop hook | Controls the end of the turn. |
| "When I ask for a PR description, use this format." | Skill | A procedure for one kind of task, on request. |
| "Our API conventions for `src/api`." | `.claude/rules/` with `paths` (or a skill if it is long and procedural) | Only matters for certain files. |
| "Review my frontend for accessibility without filling my context." | Subagent that preloads an `accessibility-audit` skill | Isolated, delegated work + task knowledge. |
| "Let Claude query our Postgres database." | MCP server (+ optional skill on how to query safely) | External access. |
| "Remind Claude to run the tests before saying it's done." | CLAUDE.md if it's a soft rule; Stop hook if it must always happen | Depends on strictness. |

## Common mix-ups

- **A skill is not enforcement.** If the user says "never" and means it, a skill (or CLAUDE.md) can be ignored; a hook can't.
- **Don't put always-on rules in a skill.** They only load when the description matches.
- **Don't put long procedures in CLAUDE.md.** They load in every conversation and compete for attention.
- **A subagent doesn't see the main conversation** or the skills already invoked. Give it everything it needs in its prompt or through `skills`.
