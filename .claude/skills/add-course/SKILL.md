---
name: add-course
description: Turns a course notes file into bilingual English/Spanish documentation in docs/, with working examples, indexes and changelog. Use when the user asks to add a new course, add course notes or a course summary to the project, or says "agrega este curso", "agregar un nuevo curso al proyecto", "añade la documentación del curso".
allowed-tools: Read, Grep, Glob, Bash(node ${CLAUDE_SKILL_DIR}/scripts/scaffold-course.js *), Bash(bash .claude/skills/verify/scripts/check.sh)
---

# Add a course

Input: $ARGUMENTS (course name and/or notes file). If nothing is given, look for a new `.md` notes file at the repository root and confirm it with the user.

## 1. Read and plan

1. Read the whole notes file. Group its topics, in order, into chapters (usually 4–8).
2. Choose the course slug and one slug per chapter: lowercase English words joined with hyphens.
3. Check every concrete claim (commands, flags, paths, frontmatter fields, limits) against the official docs at https://code.claude.com/docs. Correct what is wrong and remember each correction for the final report.
4. Read [references/examples-guide.md](references/examples-guide.md) and choose the example for each chapter.
5. Save the plan (slugs, chapters, examples, corrections) in `.claude/state/current-task.md`. A hook restores it after compaction.

## 2. Scaffold

Run the script. Don't read it; its usage is in its first lines if you need it.

```bash
node ${CLAUDE_SKILL_DIR}/scripts/scaffold-course.js <course-slug> <chapter-slug> <chapter-slug> ...
```

It creates `docs/en/<course>/` and `docs/es/<course>/` with a README and one page per chapter, including language links and navigation. It never overwrites files.

## 3. Write the chapters

1. Follow [references/writing-style.md](references/writing-style.md) (page shape, plain words, glossary).
2. For each chapter, write the English page, then the Spanish page with the same sections.
3. Replace every `{{TODO: ...}}` marker, including the chapter titles in the navigation lines. The checks fail while any marker is left.
4. Where a topic was covered by an earlier course, link to that chapter instead of repeating it.

## 4. Build the examples

Follow [references/examples-guide.md](references/examples-guide.md). Build and test what runs inside the repo. For what needs something outside it, create the structure and a README with numbered steps.

## 5. Update the indexes

- The course tables in `README.md`, `README.es.md`, `docs/en/README.md` and `docs/es/README.md`.
- The tree in `README.md` and `README.es.md`, if you added new folders.
- A new entry in `CHANGELOG.md`, in both languages.

## 6. Verify and review

1. Run `bash .claude/skills/verify/scripts/check.sh` and fix everything until it passes.
2. Ask the `docs-reviewer` subagent to review the new course, and give it the path of the notes file so it can confirm no idea was dropped. If that subagent isn't available (it was created during this session), use a general-purpose subagent and tell it to follow `.claude/agents/docs-reviewer.md`.
3. Fix what the review finds and run the checks again.

## 7. Report to the user

In a few lines: the chapters created, the examples (which run, and which are structure only with the steps the user must take), the corrections made against the official docs, and that the original notes file was left untouched (ask if they want it deleted).
