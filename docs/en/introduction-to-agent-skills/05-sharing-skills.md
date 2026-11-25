**English** | [Español](../../es/introduction-to-agent-skills/05-sharing-skills.md)

# 5. Share skills

> **In one line:** commit skills to share them with your team, package them in a plugin to share them with everyone, and use managed settings to apply them to a whole organization.

## Three ways to share

| Way | Who gets the skills | How |
|---|---|---|
| **Commit them to the repository** | Anyone who clones it | Normal git workflow |
| **Plugin in a marketplace** | Anyone who installs it, in any project | Publish a marketplace |
| **Enterprise managed settings** | The whole organization, with the highest priority | Your administrator deploys them |

## 1. Commit skills to your repository

Put them in `.claude/skills`, and anyone who clones the repository gets them automatically, with nothing else to install.

The `.claude` folder holds your agents, hooks, skills and settings, all under version control and shared with the team through normal git workflows:

```text
.claude/
├── agents/       ← subagents
├── hooks/        ← hook scripts
├── skills/       ← project skills
└── settings.json ← hooks and permissions
```

## 2. Distribute skills with plugins

A **plugin** is a package of skills (and optionally agents, hooks and more) that people install in Claude Code. A **marketplace** is a list of plugins that people can add and install from.

This approach is best when your skills **aren't too specific to one project** and can help people beyond your team.

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json        ← manifest: only "name" is required
└── skills/
    └── my-skill/
        └── SKILL.md
```

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "What the plugin offers."
}
```

A marketplace is a repository with a `.claude-plugin/marketplace.json` file:

```json
{
  "name": "my-marketplace",
  "owner": { "name": "Your Name" },
  "plugins": [
    { "name": "my-plugin", "source": "./plugins/my-plugin", "description": "What the plugin offers." }
  ]
}
```

The steps, in short:

1. **Validate**: `claude plugin validate <plugin-folder>`.
2. **Test locally**: `claude --plugin-dir <plugin-folder>`.
3. **Publish**: push the repository with the marketplace to GitHub. There is no submission form.
4. **Install** (other people): `/plugin marketplace add <user>/<repo>` and then `/plugin install my-plugin@my-marketplace`.
5. **Optional**: submit it to the public plugin directory from [claude.ai/directory/manage](https://claude.ai/directory/manage).

Plugin skills are called with their namespace: `/my-plugin:my-skill`.

## 3. Enterprise managed settings

Administrators can deploy skills to the whole organization through **managed settings**, in a `.claude/skills/` folder inside the managed settings directory (on Linux, for example, `/etc/claude-code/.claude/skills/`). They have **the highest priority**, so they are ideal for mandatory standards and compliance. Users can't override them.

## Skills and subagents

Two things to know:

- **Subagents don't see the skills you already invoked** in the main conversation. If they have the `Skill` tool, they can still find and invoke skills.
- **Built-in agents (like Explore and Plan) don't preload skills.** Only custom subagents can list the skills to load at startup, in their `skills` field.

To create a custom subagent with skills, add an agent Markdown file in `.claude/agents/`. You can write it yourself or ask Claude to create it. If the `.claude/agents` folder didn't exist when your session started, restart Claude Code to load the new subagent.

```yaml
---
name: frontend-security-accessibility-reviewer
description: Use this agent when you need to review frontend code for accessibility...
tools: Bash, Glob, Grep, Read, WebFetch, WebSearch, Skill
model: sonnet
color: blue
skills:
  - accessibility-audit
  - performance-check
---
```

> **Note:** write `skills` as a YAML list, like above. That is the format in the official docs.

When you delegate to this subagent, it starts with the full content of both skills and applies them in every review. First make sure the skills exist in `.claude/skills`, then create the subagent or add the `skills` field to an existing one.

This pattern works very well when:

- You want isolated delegation with specific expertise.
- Different subagents need different skills (a frontend reviewer vs. a backend reviewer).
- You want to enforce standards in delegated work without depending on prompts.

## In this repository

- [.claude/agents/docs-reviewer.md](../../../.claude/agents/docs-reviewer.md): a subagent that preloads the `verify` skill to review course pages.
- [plugins/agent-skills-starter/](../../../plugins/agent-skills-starter/README.md): a plugin with three skills, and **step-by-step instructions** to test it, install it and publish it.
- [.claude-plugin/marketplace.json](../../../.claude-plugin/marketplace.json): this repository is also a marketplace.
- Template for your own subagents: [templates/en/agent.md](../../../templates/en/agent.md).

## Summary

- [ ] Project skills in `.claude/skills` are shared through git: whoever clones the repository gets them.
- [ ] Plugins share skills across repositories through marketplaces; a marketplace is a repository with `marketplace.json`.
- [ ] Enterprise managed settings deploy skills to the whole organization, with the highest priority.
- [ ] Subagents don't see skills you already invoked; built-in agents don't preload skills.
- [ ] Custom subagents preload skills with the `skills` field (a YAML list).

---

[← Skills vs. other Claude Code features](04-skills-vs-other-features.md) | Next: [Troubleshoot skills →](06-troubleshooting.md)
