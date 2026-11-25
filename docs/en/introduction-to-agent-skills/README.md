**English** | [Español](../../es/introduction-to-agent-skills/README.md)

# Introduction to Agent Skills — notes and best practices

Notes from the free **Introduction to Agent Skills** course by Anthropic, rewritten in plain words and connected to working examples in this repository.

## Chapters

| # | Chapter | What you will learn | Example in this repo |
|---|---|---|---|
| 1 | [What skills are](01-what-are-skills.md) | How skills work, where they live and when to use them | [.claude/skills/](../../../.claude/skills/) |
| 2 | [Create your first skill](02-creating-a-skill.md) | Folder, `SKILL.md`, `/skills` and name priority | [pr-description](../../../plugins/agent-skills-starter/skills/pr-description/SKILL.md) |
| 3 | [Configuration and multi-file skills](03-configuration-and-multi-file.md) | Frontmatter, descriptions, `allowed-tools`, progressive disclosure, scripts | [add-course](../../../.claude/skills/add-course/SKILL.md) |
| 4 | [Skills vs. other Claude Code features](04-skills-vs-other-features.md) | CLAUDE.md, subagents, hooks and MCP: which one when | [docs-reviewer](../../../.claude/agents/docs-reviewer.md) |
| 5 | [Share skills](05-sharing-skills.md) | Git, plugins, marketplaces, enterprise, subagents with skills | [agent-skills-starter plugin](../../../plugins/agent-skills-starter/README.md) |
| 6 | [Troubleshoot skills](06-troubleshooting.md) | Validator and fixes for the common problems | [skill-troubleshooter](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/SKILL.md) |

## Quick summary

### What skills are
- A `SKILL.md` with `name` and `description` in the frontmatter, then the instructions.
- Claude compares your request with every description and activates the ones that match.
- Loaded on demand (`CLAUDE.md` loads always). Personal: `~/.claude/skills`. Project: `.claude/skills`.
- Explaining the same thing again and again → write a skill.

### Create your first skill
- Folder named like the skill + `SKILL.md` inside.
- Check with `/skills`; `/reload-skills` if a new one doesn't appear.
- Same name: enterprise > personal > project. Plugins use `/plugin:skill`. Use descriptive names.

### Configuration and multi-file skills
- Every field is optional in Claude Code; `description` is the key one (what + when).
- `allowed-tools` pre-approves tools; `model` chooses the model.
- `SKILL.md` under 500 lines; details in `references/`, code in `scripts/`, templates in `assets/`.
- Tell Claude to run scripts, not read them.

### Skills vs. other features
- `CLAUDE.md` always on · skills on request · hooks on events · subagents isolated · MCP external tools.
- Combine them; don't force everything into skills.

### Share skills
- Git for your team, plugins + marketplaces for everyone, managed settings for the organization.
- Custom subagents preload skills with `skills:` (YAML list). Built-in agents don't.

### Troubleshoot skills
- Start with `claude plugin validate .claude/skills`.
- Doesn't trigger → description. Doesn't load → path/name/YAML. Wrong skill → distinct descriptions.
