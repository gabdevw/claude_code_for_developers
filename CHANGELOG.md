# Changelog / Registro de cambios

All notable changes to this repository. / Todos los cambios importantes de este repositorio.

## [Unreleased] / [Sin publicar]

### Added / Agregado
- **EN:** Course *Introduction to Agent Skills*: 6 chapters (what skills are, creating a skill, configuration and multi-file skills, skills vs. other features, sharing, troubleshooting).
  **ES:** Curso *Introducción a las Agent Skills*: 6 capítulos (qué son las skills, crear una skill, configuración y skills multiarchivo, skills frente a otras funciones, compartir, solución de problemas).
- **EN:** Plugin `agent-skills-starter` (pr-description, codebase-onboarding, skill-troubleshooter) and a marketplace in `.claude-plugin/marketplace.json`.
  **ES:** Plugin `agent-skills-starter` (pr-description, codebase-onboarding, skill-troubleshooter) y un marketplace en `.claude-plugin/marketplace.json`.
- **EN:** Subagent `docs-reviewer` that preloads the `verify` skill, and a subagent template.
  **ES:** Subagente `docs-reviewer` que precarga la skill `verify`, y una plantilla de subagente.

### Changed / Cambiado
- **EN:** `add-course` is now a multi-file skill (`scripts/`, `references/`, `assets/`) that triggers automatically. The course templates moved into its `assets/`.
  **ES:** `add-course` ahora es una skill multiarchivo (`scripts/`, `references/`, `assets/`) que se activa automáticamente. Las plantillas de curso pasaron a su carpeta `assets/`.
- **EN:** `check.sh` also validates skills, agents and plugins, and fails while `{{TODO}}` markers remain.
  **ES:** `check.sh` también valida skills, agentes y plugins, y falla mientras queden marcadores `{{TODO}}`.

### Added earlier / Agregado antes
- **EN:** Course *Claude Code in Action*: 6 chapters (long sessions, CLAUDE.md, skills, hooks, scheduled tasks, GitHub Actions and Code Review).
  **ES:** Curso *Claude Code in Action*: 6 capítulos (sesiones largas, CLAUDE.md, skills, hooks, tareas programadas, GitHub Actions y Code Review).
- **EN:** Working hooks: secret redaction (PreToolUse), prompt protection (UserPromptSubmit), translation reminder (PostToolUse), translation check (Stop), state after compaction (SessionStart).
  **ES:** Hooks que funcionan: redacción de secretos (PreToolUse), protección de prompts (UserPromptSubmit), recordatorio de traducción (PostToolUse), verificación de traducciones (Stop), estado tras compactar (SessionStart).
- **EN:** Skills `/verify` and `/add-course`, bilingual templates, and CI checks.
  **ES:** Skills `/verify` y `/add-course`, plantillas bilingües y verificaciones en la CI.
