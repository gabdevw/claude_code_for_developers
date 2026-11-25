---
name: verify
description: Run every repository check and review the changes before a commit or pull request. Use when the user asks to verify, check, review or prepare a PR, and before saying a task is done.
allowed-tools: Bash(bash .claude/skills/verify/scripts/check.sh)
---

# Verify

1. Run `bash .claude/skills/verify/scripts/check.sh`.
2. If a check fails, fix the cause and run the script again. Fix the content, not the check.
3. When every check passes, review the changed pages with the checklist in [reference.md](reference.md).
4. Report in a few lines: which checks ran, what you fixed, and anything the user must decide.
