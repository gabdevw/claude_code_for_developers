**English** | [Español](../../es/introduction-to-agent-skills/06-troubleshooting.md)

# 6. Troubleshoot skills

> **In one line:** start with the validator; most problems are a weak description, a wrong path or file name, two similar skills, or a missing dependency.

When a skill doesn't work as expected, the problem is usually in one of a few groups: it doesn't trigger, it doesn't load, it conflicts with another skill, or it fails when it runs. The good news: most fixes are simple.

## Start with the validator

Before anything else, run the validator. It finds `SKILL.md` files whose frontmatter can't be parsed, so you catch that before spending time on other things.

```bash
claude plugin validate .claude/skills      # project skills
claude plugin validate ~/.claude/skills    # personal skills
```

It also checks `.claude/agents` and whole plugins.

This repository adds a second check that looks for more common problems (name different from the folder, a description without "when", more than 500 lines, links to missing files, scripts without execute permission, the same name in several places):

```bash
node plugins/agent-skills-starter/skills/skill-troubleshooter/scripts/check-skills.js .claude/skills ~/.claude/skills
```

## The skill doesn't trigger

It exists and passes validation, but Claude doesn't use it when you expect. **The cause is almost always the description.**

Claude uses semantic matching: your request must match the *meaning* of the description. Not enough match, no activation. Add trigger phrases that match how you really phrase your requests.

## The skill doesn't load

It doesn't appear when you ask Claude "which skills are available?" or in `/skills`. Check the structure:

- `SKILL.md` must be **inside a named folder**, not at the root of `skills/`: `.claude/skills/my-skill/SKILL.md`.
- The file name must be **exactly** `SKILL.md`: "SKILL" in capitals, "md" in lowercase.
- The YAML frontmatter must be valid.

If you added it during the session, run `/reload-skills`. You can also start Claude Code with `claude --debug` and look for messages that mention your skill's name.

## The wrong skill is used

If Claude uses the wrong skill or seems confused between skills, your descriptions are probably **too similar**. Make each one distinctive.

## Priority conflicts

If your personal skill is being ignored, an enterprise skill (higher priority) may have the same name. Your options:

- Rename your skill to something more distinctive (usually the easiest).
- Talk to your administrator about the enterprise skill.

## Plugin skills don't appear

1. Run `/plugin`, check that the plugin is listed and enabled in **Installed**, then look at the **Errors** tab.
2. If you installed it during this session, run `/reload-plugins`.
3. If they still don't appear, the plugin structure may be wrong: run `claude plugin validate <plugin-folder>`.

## Runtime errors

The skill loads but fails while running. Common causes:

- **Missing dependencies**: if the skill uses external packages, they must be installed. Mention them in the skill's description so Claude knows what is needed.
- **Permissions**: scripts need execute permission. Run `chmod +x` on every script the skill uses.
- **Path separators**: use forward slashes (`/`) everywhere, even on Windows.

## Quick checklist

| Symptom | Fix |
|---|---|
| Doesn't trigger | Improve the description and add trigger phrases. |
| Doesn't load | Check the path, the file name and the YAML. |
| Wrong skill used | Make the descriptions more distinct. |
| Shadowed | Check the priority order and rename if needed. |
| Plugin skills missing | Check `/plugin` for errors, then run `/reload-plugins`. |
| Fails at runtime | Check dependencies, permissions and paths. |

## In this repository

- [skill-troubleshooter](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/SKILL.md): a skill that runs these checks and follows this guide ([references/troubleshooting.md](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/references/troubleshooting.md)) for you.
- [check.sh](../../../.claude/skills/verify/scripts/check.sh) runs both validators on your computer. In CI, on every pull request, it runs `check-skills.js`; `claude plugin validate` only runs where the `claude` CLI is installed.

## Summary

- [ ] Start with `claude plugin validate .claude/skills` (or `~/.claude/skills`).
- [ ] Doesn't trigger → the description. Doesn't load → path, file name, YAML.
- [ ] Wrong skill → make descriptions distinct. Shadowed → rename.
- [ ] Plugin skills missing → `/plugin` (Installed, Errors) and `/reload-plugins`.
- [ ] Runtime errors → dependencies, `chmod +x`, forward slashes.

---

[← Share skills](05-sharing-skills.md) | [Back to the course index](README.md)
