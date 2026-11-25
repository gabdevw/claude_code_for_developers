---
name: add-course
description: Add the notes of a new course to this repository, in English and Spanish, with its indexes and examples. Use when the user wants to add a new course, chapter or lesson to docs/.
disable-model-invocation: true
---

# Add a course

Course and notes: $ARGUMENTS

1. Choose a slug: lowercase English words joined with hyphens, for example `claude-code-in-action`.
2. Create `docs/en/<slug>/README.md` and `docs/es/<slug>/README.md` from `templates/<lang>/course-readme.md`.
3. Create one page per topic, named `NN-topic.md` (for example `01-long-sessions.md`), from `templates/<lang>/lesson.md`. Use the same English file names in both languages.
4. Write in plain words. Follow the checklist in `.claude/skills/verify/reference.md`.
5. If a topic has something that can run (hook, skill, workflow, setting), add it under `.claude/` or `.github/` and link to it from the page.
6. Add the course to the tables in `README.md`, `README.es.md`, `docs/en/README.md` and `docs/es/README.md`.
7. Add an entry to `CHANGELOG.md` in both languages.
8. Run `/verify` and fix anything it reports.
