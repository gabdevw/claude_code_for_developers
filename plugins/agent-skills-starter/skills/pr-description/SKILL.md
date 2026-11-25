---
name: pr-description
description: Writes pull request descriptions from the changes on the current branch. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request ("escribe la descripción del PR", "resume los cambios para el pull request").
allowed-tools: Bash(git diff *), Bash(git log *), Bash(git branch *)
---

When writing a PR description:

1. Find the base branch (usually `main`). Run `git diff main...HEAD` to see all changes on this branch, and `git log main..HEAD --oneline` to see the commits.
2. Write a description following this format:

```markdown
## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed.

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
```

3. Write it in the language the user is using. Don't invent reasons: if the "why" isn't clear from the changes, ask.
