[English](../../en/claude-code-in-action/README.md) | **Español**

# Claude Code in Action: notas y mejores prácticas

Notas del curso **Claude Code in Action** de Anthropic, reescritas con palabras sencillas y conectadas con ejemplos que funcionan en este repositorio.

## Capítulos

| # | Capítulo | Qué vas a aprender | Ejemplo en este repo |
|---|---|---|---|
| 1 | [Manejar sesiones largas](01-long-sessions.md) | Planificar, compactar, rebobinar, goals, worktrees y loops | [.worktreeinclude](../../../.worktreeinclude) |
| 2 | [Un CLAUDE.md que se respeta](02-claude-md.md) | Dónde vive y cómo escribir reglas que se cumplan | [CLAUDE.md](../../../CLAUDE.md) |
| 3 | [Skills](03-skills.md) | Empaquetar los procedimientos que repites | [.claude/skills/](../../../.claude/skills/) |
| 4 | [Hooks](04-hooks.md) | Reglas que Claude no puede saltarse | [.claude/hooks/](../../../.claude/hooks/) |
| 5 | [Tareas programadas](05-scheduled-tasks.md) | Prompts guardados que se ejecutan en la nube | — |
| 6 | [GitHub Actions y Code Review](06-github-actions-code-review.md) | Claude en tus pull requests | [.github/workflows/](../../../.github/workflows/) |

## Resumen rápido

### Sesiones largas
- Delimita el trabajo primero (modo plan), luego dirige. Usa `/clear` entre tareas sin relación.
- No ejecutes `/compact` solo: `/compact Enfócate en <lo que importa>`.
- Rebobina con `Esc Esc` o `/rewind` cuando Claude se desvíe.
- Usa `/goal <condición comprobable>` cuando puedas describir "terminado".
- Trabaja en paralelo con `claude --worktree <nombre>` + `.worktreeinclude`.
- Vigila algo externo con `/loop`.

### CLAUDE.md
- Es orientación, no configuración forzada: mientras más esbelto, mejor.
- Cuatro niveles: política gestionada, usuario, proyecto, local.
- Divídelo con `@importaciones` (no reducen el contexto).
- Reglas específicas y verificables; nombra el reemplazo; sin énfasis.

### Skills
- La misma instrucción de varios pasos dos veces → skill.
- `SKILL.md` + `reference.md` + `scripts/`. Solo las descripciones se cargan al inicio.
- Empieza con una skill de verificación en `.claude/skills/`.

### Dónde va cada regla
- Siempre aplica → `CLAUDE.md`. Un tipo de tarea → skill. Nunca se debe saltar → hook.

### Hooks
- `PreToolUse` protege herramientas; `PostToolUse` actúa después de editar; `UserPromptSubmit` revisa prompts; `Stop` controla el final del turno; `SessionStart` + `compact` restaura el estado.
- Redacta en lugar de bloquear; las claves reales vienen de variables de entorno.

### Tareas programadas
- Prompt guardado + repositorio + disparador, ejecutado en la nube. `/schedule` desde la terminal.

### GitHub
- Code Review (Team/Enterprise): revisiones automáticas con comentarios en línea por severidad.
- GitHub Actions: `/install-github-app` y `@claude` en los comentarios.
