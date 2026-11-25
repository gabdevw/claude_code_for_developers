**English** | [Español](README.es.md)

# Plugin: agent-skills-starter

Reusable skills from the course [Introduction to Agent Skills](../../docs/en/introduction-to-agent-skills/README.md), packaged as a Claude Code **plugin** so you can use them in any project.

| Skill | Command | What it does |
|---|---|---|
| [pr-description](skills/pr-description/SKILL.md) | `/agent-skills-starter:pr-description` | Writes a pull request description from the branch changes. |
| [codebase-onboarding](skills/codebase-onboarding/SKILL.md) | `/agent-skills-starter:codebase-onboarding` | Explains a codebase to a new developer. Uses `allowed-tools` and `model`. |
| [skill-troubleshooter](skills/skill-troubleshooter/SKILL.md) | `/agent-skills-starter:skill-troubleshooter` | Finds why a skill doesn't trigger, load or run. Includes a script and a reference file. |

Plugin skills have their own namespace (`plugin-name:skill-name`), so they never conflict with your own skills of the same name.

## Structure

```text
plugins/agent-skills-starter/
├── .claude-plugin/
│   └── plugin.json          ← the manifest (only "name" is required)
└── skills/
    ├── pr-description/SKILL.md
    ├── codebase-onboarding/SKILL.md
    └── skill-troubleshooter/
        ├── SKILL.md
        ├── references/troubleshooting.md
        └── scripts/check-skills.js
```

The marketplace that lists this plugin is at the repository root: [.claude-plugin/marketplace.json](../../.claude-plugin/marketplace.json).

## Status

The structure is complete and validated with `claude plugin validate`, but the marketplace is **not published yet**. Follow the steps below.

## Step 1 — Test it locally

From the root of this repository:

```bash
# Check the plugin and the marketplace for errors
claude plugin validate plugins/agent-skills-starter
claude plugin validate .

# Start Claude Code with the plugin loaded for this session only
claude --plugin-dir plugins/agent-skills-starter
```

Inside the session, run `/skills` and check that the three skills appear. Then try a request such as "explain how this project works".

After changing a file of the plugin, run `/reload-plugins`.

## Step 2 — Install it from the local marketplace

```bash
claude plugin marketplace add .
claude plugin install agent-skills-starter@claude-code-best-practices
```

Or, inside Claude Code: `/plugin marketplace add .` and then `/plugin install agent-skills-starter@claude-code-best-practices`. Run `/plugin` and check the **Installed** and **Errors** tabs.

## Step 3 — Publish your marketplace on GitHub

A marketplace is just a repository with a `.claude-plugin/marketplace.json` file. There is no submission form.

1. Edit `owner.name` in [marketplace.json](../../.claude-plugin/marketplace.json) and `author` in [plugin.json](.claude-plugin/plugin.json).
2. Raise `version` in `plugin.json` every time you release changes. Users only receive updates when the version changes.
3. Push the repository to GitHub (it must be public, or users need access to it).
4. Anyone can now add it and install the plugin:

   ```bash
   claude plugin marketplace add <your-user>/<this-repo>
   claude plugin install agent-skills-starter@claude-code-best-practices
   ```

## Step 4 (optional) — Submit it to the Claude plugin directory

To appear in the public directory, submit the plugin from the developer portal at [claude.ai/directory/manage](https://claude.ai/directory/manage) (a paid claude.ai plan is required). Check the [official docs](https://code.claude.com/docs/en/plugins) for the current requirements before you submit.

## Use a skill as a personal skill instead

If you only want one skill, without the plugin, copy its folder into your personal skills folder:

```bash
# macOS / Linux / Git Bash on Windows
mkdir -p ~/.claude/skills
cp -r plugins/agent-skills-starter/skills/pr-description ~/.claude/skills/
```

On Windows the folder is `C:/Users/<your-user>/.claude/skills`. Then run `/reload-skills` (or open a new session) and call it with `/pr-description`.
