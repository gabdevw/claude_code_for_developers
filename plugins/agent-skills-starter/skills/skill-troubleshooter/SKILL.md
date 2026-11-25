---
name: skill-troubleshooter
description: Diagnoses Claude Code skills that don't trigger, don't load, conflict with another skill or fail when they run. Use when a skill isn't working, doesn't appear in /skills, the wrong skill is used, or the user says "mi skill no funciona" or "Claude no usa mi skill".
allowed-tools: Read, Glob, Bash(node ${CLAUDE_SKILL_DIR}/scripts/check-skills.js *), Bash(claude plugin validate *)
---

# Skill troubleshooter

1. Run the structure check. Don't read the script, just run it:

   ```bash
   node ${CLAUDE_SKILL_DIR}/scripts/check-skills.js .claude/skills ~/.claude/skills
   ```

   If the `claude` CLI is available, also run `claude plugin validate .claude/skills`.

2. Fix every ERROR first. Then find the user's symptom in [references/troubleshooting.md](references/troubleshooting.md) and follow its steps.

3. Explain the cause and the fix in plain words. If you changed a description, show the before and after and suggest a request the user can type to test it.
