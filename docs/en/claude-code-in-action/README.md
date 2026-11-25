**English** | [Español](../../es/claude-code-in-action/README.md)

# Claude Code in Action — notes and best practices

Notes from the **Claude Code in Action** course by Anthropic, rewritten in plain words and connected to working examples in this repository.

## Chapters

| # | Chapter | What you will learn | Example in this repo |
|---|---|---|---|
| 1 | [Managing long sessions](01-long-sessions.md) | Plan, compact, rewind, goals, worktrees and loops | [.worktreeinclude](../../../.worktreeinclude) |
| 2 | [A CLAUDE.md that Claude follows](02-claude-md.md) | Where it lives and how to write rules that stick | [CLAUDE.md](../../../CLAUDE.md) |
| 3 | [Skills](03-skills.md) | Package the procedures you repeat | [.claude/skills/](../../../.claude/skills/) |
| 4 | [Hooks](04-hooks.md) | Rules Claude cannot skip | [.claude/hooks/](../../../.claude/hooks/) |
| 5 | [Scheduled tasks](05-scheduled-tasks.md) | Saved prompts that run in the cloud | — |
| 6 | [GitHub Actions and Code Review](06-github-actions-code-review.md) | Claude in your pull requests | [.github/workflows/](../../../.github/workflows/) |

## Quick summary

### Long sessions
- Scope the work first (plan mode), then steer. Use `/clear` between unrelated tasks.
- Don't run `/compact` alone: `/compact Focus on <what matters>`.
- Rewind with `Esc Esc` or `/rewind` when Claude goes the wrong way.
- Use `/goal <checkable condition>` when you can describe "done".
- Work in parallel with `claude --worktree <name>` + `.worktreeinclude`.
- Watch something external with `/loop`.

### CLAUDE.md
- It is guidance, not enforced configuration: the leaner, the better.
- Four levels: managed policy, user, project, local.
- Split it with `@imports` (they don't reduce context).
- Specific and checkable rules; name the replacement; no emphasis.

### Skills
- Same multi-step instruction twice → skill.
- `SKILL.md` + `reference.md` + `scripts/`. Only descriptions load up front.
- Start with a verification skill in `.claude/skills/`.

### Where each rule belongs
- Always true → `CLAUDE.md`. One kind of task → skill. Must never be skipped → hook.

### Hooks
- `PreToolUse` guards tools; `PostToolUse` acts after edits; `UserPromptSubmit` checks prompts; `Stop` controls the end of the turn; `SessionStart` + `compact` restores state.
- Redact instead of block; real keys come from environment variables.

### Scheduled tasks
- Saved prompt + repository + trigger, run in the cloud. `/schedule` from the terminal.

### GitHub
- Code Review (Team/Enterprise): automatic reviews with inline comments by severity.
- GitHub Actions: `/install-github-app` and `@claude` in comments.
