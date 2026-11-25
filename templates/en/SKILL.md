---
name: <skill-name>
description: <What the skill does>. Use when <the situations in which Claude should use it>.
---

# <Skill title>

1. <First step. Be specific: name files, commands and expected results.>
2. Run `bash .claude/skills/<skill-name>/scripts/<script>.sh` and read its output.
3. <What to do if something fails.>
4. <What to report at the end.>

For details, see [reference.md](reference.md).

<!-- Save as .claude/skills/<skill-name>/SKILL.md (project) or ~/.claude/skills/<skill-name>/SKILL.md (personal).
Add `disable-model-invocation: true` to the frontmatter if only you should start it (for example, a deployment). -->
