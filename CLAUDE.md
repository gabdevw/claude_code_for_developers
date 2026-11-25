# Claude Code Best Practices

Bilingual (English/Spanish) knowledge base of Claude Code practices, with working examples in `.claude/` and `.github/`.

## Structure
- Course notes go in `docs/en/<course-slug>/` and `docs/es/<course-slug>/`, with the same English file names in both.
- Copy-ready templates go in `templates/en/` and `templates/es/`.
- Shared scripts go in `scripts/`, written in Node.js with no dependencies.
- Review guidance for Code Review lives in `REVIEW.md`.

## Writing rules
- Every page exists in both languages. When you edit one, update the other in the same change.
- Use short sentences and plain words. Explain a technical term the first time it appears.
- Start every page with the language switch line, like `**English** | [Español](...)`.
- Use relative links between pages, not absolute GitHub URLs.
- Write example secrets as placeholders like `sk_live_...` and read real ones from environment variables like `$STRIPE_KEY`.

## Workflow
- Add a new course with `/add-course <course name>`.
- Before saying a task is done, run `/verify` (or `bash .claude/skills/verify/scripts/check.sh`).
- On long tasks, keep `.claude/state/current-task.md` updated with the goal, decisions and next steps. A hook restores it after compaction.
- Add a line to `CHANGELOG.md` (both languages) for every new course or example.

## Compact instructions
When compacting, keep: the current goal, the files changed so far, and any page still missing its translation.
