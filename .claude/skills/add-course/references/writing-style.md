# Writing style

Read this before writing chapter text. The goal: a developer finds a practice fast and can take it to their project.

## Page shape

Every chapter follows the same order, so readers know where to look:

1. Language switch line (the scaffold writes it).
2. `# N. Title` and `> **In one line:** ...` — the whole chapter in one sentence.
3. Body sections (`##`): what it is → why it matters → how to use it → in this repository.
4. `## Summary` — a checklist of 3–6 items `- [ ] ...`.
5. Navigation line (the scaffold writes it).

Course README: chapter table (with a link to the example of each chapter) and a "Quick summary" with one `###` per chapter.

## Plain words

- Short sentences, one idea each. Active voice: "Claude reads the file", not "the file is read".
- Explain a technical term the first time it appears: "a *subagent* (a helper that works in its own separate context)".
- Show, don't tell: a table "vague → specific", a copyable command, a real file from this repo.
- Prefer tables for comparisons and checklists for summaries.
- No emphasis inflation: no ALL CAPS, at most one `> **Important:**` per section.

## Keep the source, add what is missing

- Keep every idea in the user's notes. Reorder and reword them; don't drop them.
- Add only what is important and missing **inside the course topics**: exact commands, file paths, limits, gotchas.
- When the notes and the official docs disagree, follow the docs and tell the user what changed.
- When a limit comes from a different source (for example the open Agent Skills standard vs. Claude Code), say which.

## Both languages

- Write the English page, then the Spanish page with the same sections in the same order.
- Spanish: neutral Latin American Spanish, use "tú".
- Code, commands, file names, frontmatter fields and JSON keys stay in English in both languages.
- Example prompts and comments inside examples are translated.

## Glossary (keep it consistent across courses)

| English | Spanish |
|---|---|
| skill | la skill (plural: las skills) |
| hook | el hook |
| subagent | el subagente |
| plugin | el plugin |
| marketplace | el marketplace |
| pull request (PR) | el pull request (PR) |
| worktree | el worktree |
| frontmatter | el frontmatter |
| context window | la ventana de contexto |
| prompt | el prompt |
| trigger (verb) | activar |
| progressive disclosure | divulgación progresiva |
| managed settings | configuración administrada |
| repository | el repositorio |
