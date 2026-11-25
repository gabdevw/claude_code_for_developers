**English** | [Español](CONTRIBUTING.es.md)

# Contributing

Thank you for helping! This repository grows with every course and example people add.

## Ways to help

- Fix an error or an unclear explanation.
- Translate a page that only exists in one language.
- Add notes from a new course.
- Add a working example (hook, skill, workflow, setting).

Not sure where to start? Open an issue first, using one of the issue templates.

## Rules for every change

1. **Both languages.** Every page exists in `docs/en/` and `docs/es/` with the same file name. If you only write one language, say so in the pull request and someone can help with the translation.
2. **Plain words.** Short sentences. Explain technical terms the first time they appear. Use examples.
3. **Examples that work.** Commands and configuration must be correct and complete.
4. **No secrets.** Use placeholders like `sk_live_...` or environment variables like `$STRIPE_KEY`.
5. **Relative links** between pages.

The full checklist is in [.claude/skills/verify/reference.md](.claude/skills/verify/reference.md).

## Add a new course

With Claude Code:

```text
/add-course <course name>
```

By hand:

1. Pick a slug in English, lowercase with hyphens: `my-course-name`.
2. Copy [templates/en/course-readme.md](templates/en/course-readme.md) to `docs/en/<slug>/README.md` and [templates/es/course-readme.md](templates/es/course-readme.md) to `docs/es/<slug>/README.md`.
3. Add one page per topic, `01-topic.md`, `02-topic.md`… from the `lesson.md` templates.
4. Add the course to `README.md`, `README.es.md`, `docs/en/README.md` and `docs/es/README.md`.
5. Add an entry to [CHANGELOG.md](CHANGELOG.md).

## Before opening a pull request

Run the checks (or `/verify` inside Claude Code):

```bash
bash .claude/skills/verify/scripts/check.sh
```

The same checks run automatically on every pull request.

## Commit messages

Short and in the imperative: `Add hooks chapter`, `Fix link in skills page`.
