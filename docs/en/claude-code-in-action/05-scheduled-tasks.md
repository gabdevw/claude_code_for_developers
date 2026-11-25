**English** | [Español](../../es/claude-code-in-action/05-scheduled-tasks.md)

# 5. Scheduled tasks: a saved prompt that runs in the cloud

> **In one line:** write the instructions once, and Claude runs them on its own, even with your computer off.

## What a scheduled task is

A **scheduled task** (it used to be called a *routine*) is a saved prompt that Claude runs **in the cloud**, on Anthropic's infrastructure. Each run is a new Claude Code session that works on a repository you choose.

Because it runs in the cloud, it keeps working when your laptop is closed.

## How to create one

**From the web:** go to [claude.ai/code/routines](https://claude.ai/code/routines) and fill in:

1. A **name**.
2. The **instructions**: what Claude must do in each session.
3. The **repository** it works on.
4. The **trigger**: what starts it.

**From the terminal**, without leaving Claude Code: run `/schedule` and describe what you want in plain language:

```text
/schedule daily dependency audit at 9am
```

## Triggers

| Trigger | Example |
|---|---|
| **Schedule** | Every weekday at 9:00. |
| **API** | Another system calls a URL to start it. |
| **GitHub event** | A pull request is opened, a release is published, an issue is created. |

## Write instructions that work alone

Nobody is watching to answer questions, so the instructions must stand on their own. Say:

- **What** to check or do.
- **What "done" looks like.**
- **Where to leave the result**: a pull request, an issue, a comment.
- **What not to do.**

Example:

```text
Check the dependencies in package.json for known vulnerabilities with `npm audit`.
If there are high or critical issues, update the affected packages, run `npm test`,
and open a pull request titled "Dependency audit <date>" that lists what changed.
If the tests fail, don't open the pull request: open an issue with the error instead.
Don't change any other file.
```

## `/loop` or a scheduled task?

| | `/loop` | Scheduled task |
|---|---|---|
| Where it runs | In your open session, on your computer | In the cloud |
| Stops when | You close the session | You pause or delete it |
| Best for | Watching something **now** (a CI run, a deployment) | Recurring work (daily audits, weekly reports) |

See [/loop in chapter 1](01-long-sessions.md#6-repeat-a-task-with-loop).

> Scheduled tasks are available on paid plans and are still evolving. Check the [official docs](https://code.claude.com/docs/en/routines) for the latest details.

## Summary

- [ ] A scheduled task is a saved prompt + a repository + a trigger.
- [ ] Create it at claude.ai/code/routines or with `/schedule` from the terminal.
- [ ] It runs in the cloud, so it works with your computer off.
- [ ] Write self-contained instructions: what to do, what "done" means, where to leave the result, what not to touch.
- [ ] Use `/loop` for short-term watching in your session, and scheduled tasks for recurring work.

---

[← 4. Hooks](04-hooks.md) | Next: [6. GitHub Actions and Code Review →](06-github-actions-code-review.md)
