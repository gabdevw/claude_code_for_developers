---
name: <agent-name>
description: <What the subagent does>. Use when <the situations in which Claude should delegate to it>.
tools: Read, Grep, Glob
model: sonnet
skills:
  - <skill-name>
---

You are <role>. <One sentence about the goal of your work.>

1. <First step. Name the files, commands or checks to use.>
2. <Next step.>
3. Report <what to return, and in which format>. <What not to do, for example: "Don't edit files.">

<!-- Save as .claude/agents/<agent-name>.md (project) or ~/.claude/agents/<agent-name>.md (personal).
The skills listed in `skills` must exist; their full content is loaded when the subagent starts.
If Claude Code doesn't find a new subagent, restart it. Check it with: claude plugin validate .claude/agents -->
