---
name: create-skill
description: Creates Claude Code skills with the right structure and best practices, after first deciding whether the request is really a skill or belongs in a hook, a subagent, CLAUDE.md or an MCP server. Use when the user asks to create, write or make a skill, automate something they keep repeating, or says "crea una skill", "quiero una skill para...", "haz que Claude siempre...".
allowed-tools: Read, Glob, Grep, Bash(node ${CLAUDE_SKILL_DIR}/scripts/new-skill.js *), Bash(claude plugin validate *)
---

# Create a skill (or the right thing instead)

Request: $ARGUMENTS

## 1. Analyze before building

Don't create anything yet. Read the request and the project context (`CLAUDE.md`, `.claude/skills/`, `.claude/agents/`, `.claude/settings.json`) and answer the questions in [references/decision-guide.md](references/decision-guide.md):

- What triggers it: a request, an event, every conversation, or delegated work?
- What happens if Claude skips it once?
- How long is it, and does it need its own context, tools or external access?

## 2. Tell the user the decision

In a few lines, say what it should be — **skill**, **hook**, **subagent**, **CLAUDE.md rule** (or `.claude/rules/`), **MCP server**, or a combination — and why, using the user's own example.

- If it is a skill and the scope is clear, continue.
- If it is **not** a skill, or the scope is unclear (personal `~/.claude/skills`, project `.claude/skills`, or a plugin), ask the user to confirm before building. If they still want a skill, build it and note the trade-off.
- If it is something else, build that instead following [references/other-surfaces.md](references/other-surfaces.md).

## 3. Build the skill

1. Choose a descriptive name: lowercase, numbers and hyphens (`frontend-review`, not `review`).
2. Create the folder and SKILL.md with the script. Don't read the script; run it:

   ```bash
   node ${CLAUDE_SKILL_DIR}/scripts/new-skill.js <name> --dir <skills-folder>
   ```

   It refuses to overwrite, and warns if the same name exists at another level (enterprise > personal > project).
3. Replace every `{{TODO: ...}}` following [references/skill-best-practices.md](references/skill-best-practices.md): a description with *what* + *when* + real trigger phrases, short steps, `allowed-tools` only for what is needed.
4. Move long material to `references/`, repeatable or exact operations to `scripts/`, templates to `assets/`. Keep SKILL.md under 500 lines.
5. If the project has its own rules about skills (in `CLAUDE.md`), follow them too.

## 4. Validate and test

1. Run `claude plugin validate <skills-folder>`. If this repository's checker exists, also run `node plugins/agent-skills-starter/skills/skill-troubleshooter/scripts/check-skills.js <skills-folder>`.
2. Fix every error, and any warning about the description.
3. Give the user 2–3 requests, in their own words, that should trigger the skill, and one that should not. If the skills folder was created during this session, tell them to run `/reload-skills`.
