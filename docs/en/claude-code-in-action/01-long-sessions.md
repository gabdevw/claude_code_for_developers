**English** | [Español](../../es/claude-code-in-action/01-long-sessions.md)

# 1. Managing long sessions

> **In one line:** plan the work first, keep the context clean, and fix the course early.

## Why it matters

Claude works inside a **context window**: the "memory" of the current conversation. In a long session it fills up with old messages, file contents and command output. When it gets full, Claude has less room for what matters now and starts to lose details.

These habits keep a long session on track.

## 1. Scope the work first, then steer

Before Claude writes code, agree on what to build.

- Use **plan mode**: press `Shift+Tab` until you see "plan mode". Claude reads files and proposes a plan, but does not change anything.
- Ask Claude to read the relevant files first, then plan, then code.
- Give one clear task at a time, and steer with short, concrete corrections: "use the existing helper in `utils/date.ts`".

Useful commands:

| Command | What it does |
|---|---|
| `/context` | Shows how full the context window is. |
| `/clear` | Starts over with an empty context. Use it when you switch to an unrelated task. |
| `claude --continue` | Opens your most recent conversation again. |
| `claude --resume` | Lets you pick an older conversation to continue. |

## 2. Guide the compaction

`/compact` summarizes the conversation to free up space. Claude also compacts on its own when the context is almost full.

The problem: a summary loses detail, and if you give no direction, Claude decides what to keep.

**Don't run `/compact` alone.** Add instructions that say what matters now. For example, if you finished debugging a while ago and now only care about some API changes:

```text
/compact Focus on the implementation of the --version flag
```

More examples:

```text
/compact Keep the list of files changed and the failing test names. Drop the debugging history.
/compact Keep the final database schema and the decisions we made about naming.
```

You can also leave permanent instructions in your `CLAUDE.md` under a section like `## Compact instructions`. This repository does that in [CLAUDE.md](../../../CLAUDE.md).

To bring back key state *automatically* after every compaction, use a hook (see [Hooks → Keep state across compaction](04-hooks.md#keep-state-across-compaction-sessionstart)).

## 3. Rewind when Claude goes the wrong way

When Claude heads in the wrong direction, don't argue over ten messages: the wrong path stays in the context. **Go back instead.**

- Press `Esc` twice (with the input box empty) or run `/rewind`.
- Pick the message you want to go back to.
- Choose what to restore: **code and conversation**, **conversation only**, or **code only**.

Then try again with a better prompt.

Limits you should know:

- Files changed **only by Bash commands** (for example `rm`, `mv` or a script) are not tracked.
- Changes you make outside Claude are not tracked.
- Rewind is not a replacement for git. Keep committing your work.

## 4. Set a goal when you can describe "done"

Some tasks are easier to describe by their result than by their steps. For those, use `/goal`:

```text
/goal all tests in test/auth pass and the lint step is clean
```

After each turn, a separate check looks at the condition. Claude keeps working until it is met (or until it is clearly impossible).

- `/goal` with nothing after it shows the current status.
- `/goal clear` removes the goal. There is one goal per session.

Write goals that can be checked:

| Vague | Checkable |
|---|---|
| "Make the code better." | "`npm test` passes and `npm run lint` shows no errors." |
| "Fix the login." | "Logging in with a wrong password shows the message 'Invalid credentials'." |

## 5. Run work in parallel with worktrees

A **git worktree** is a second folder of the same repository, on a different branch. Two Claude sessions can each work in their own worktree without touching each other's files.

```bash
claude --worktree feature-login    # short form: claude -w feature-login
```

Claude Code creates the worktree in `.claude/worktrees/feature-login/`, on the branch `worktree-feature-login`. Add `.claude/worktrees/` to your `.gitignore`.

### The `.worktreeinclude` file

A new worktree is a clean copy of the repository, so **files ignored by git (like `.env`) are not there**. To fix that, create a `.worktreeinclude` file at the root of the repository and list those files. It uses the same syntax as `.gitignore`:

```text
.env
.env.local
CLAUDE.local.md
```

Only files that match a pattern **and** are ignored by git are copied. This is useful for environment variables or local settings you need in every worktree but must not commit.

Example in this repository: [.worktreeinclude](../../../.worktreeinclude).

## 6. Repeat a task with `/loop`

`/loop` runs a prompt again and again while your session is open. Use it to watch something outside Claude, like a CI run or a deployment, and act when the state changes.

```text
/loop 5m check if the CI run for this branch finished; if it failed, read the logs and summarize the error
```

- With an interval (`30s`, `5m`, `2h`, `1d`) it runs at that fixed pace.
- Without an interval, Claude chooses its own pace (between 1 minute and 1 hour).
- The loop stops when you close the session. For tasks that must run with your computer off, use [scheduled tasks](05-scheduled-tasks.md).

## Summary

Managing long Claude Code sessions comes down to a handful of habits:

- [ ] **Scope your work first, then steer.** Use plan mode, and `/clear` between unrelated tasks.
- [ ] **Guide your compaction** with `/compact <instructions>` so the summary keeps what matters.
- [ ] **Use the rewind menu** (`Esc Esc` or `/rewind`) to correct course when Claude goes the wrong way.
- [ ] **Set a `/goal`** when you can describe "done" better than you can describe the steps.
- [ ] **Run work in parallel in worktrees**, with a `.worktreeinclude` for your ignored files.
- [ ] **Use `/loop`** to watch something external while the session is open.

Do that, and you can trust a long run without watching every step of it.

---

Next: [2. A CLAUDE.md that Claude follows →](02-claude-md.md)
