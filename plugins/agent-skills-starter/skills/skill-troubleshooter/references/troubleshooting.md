# Skill troubleshooting

## It doesn't trigger

The skill exists and passes validation, but Claude doesn't use it. The cause is almost always the **description**: Claude matches requests by meaning, and there isn't enough overlap.

- Make sure it says **what** the skill does and **when** to use it ("Use when ...").
- Add trigger phrases the user really types, in every language they use.
- Test with the user's real wording, not with the skill's name.

## It doesn't load

The skill doesn't appear in `/skills`.

- `SKILL.md` must be inside a named folder: `.claude/skills/my-skill/SKILL.md`, not `.claude/skills/SKILL.md`.
- The file name must be exactly `SKILL.md`: "SKILL" in capitals, "md" in lowercase.
- The frontmatter must be valid YAML between two `---` lines.
- Skills added during the session: run `/reload-skills`.
- Look for load errors with `claude --debug`.

## The wrong skill is used

Two descriptions are too similar. Make each one distinctive: say what is different (frontend vs. backend, review vs. writing) and name the situations that belong to each.

## It is shadowed by another skill

A skill with the same name and a higher priority wins: **enterprise > personal (`~/.claude/skills`) > project (`.claude/skills`)**.

- Easiest fix: rename yours to something more specific (`frontend-review` instead of `review`).
- If it is an enterprise skill, talk to your administrator.
- Plugin skills don't conflict: they have their own namespace, `/plugin-name:skill-name`.

## Plugin skills are missing

1. Run `/plugin`, check the plugin is listed and enabled in **Installed**, then check the **Errors** tab.
2. If you installed it during this session, run `/reload-plugins`.
3. If they still don't appear, check the plugin structure: `skills/<name>/SKILL.md` at the plugin root, not inside `.claude-plugin/`. Run `claude plugin validate <plugin-folder>`.

## It fails when it runs

- **Missing dependencies**: install the packages the scripts need, and mention them in the description so Claude knows.
- **Permissions**: scripts need execute permission: `chmod +x scripts/*.sh`.
- **Paths**: use forward slashes everywhere, even on Windows.
