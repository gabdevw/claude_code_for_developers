[English](../../en/introduction-to-agent-skills/README.md) | **Español**

# Introducción a las Agent Skills: notas y mejores prácticas

Notas del curso gratuito **Introduction to Agent Skills** (Introducción a las Agent Skills) de Anthropic, reescritas con palabras sencillas y conectadas con ejemplos que funcionan en este repositorio.

## Capítulos

| # | Capítulo | Qué vas a aprender | Ejemplo en este repo |
|---|---|---|---|
| 1 | [Qué son las skills](01-what-are-skills.md) | Cómo funcionan, dónde viven y cuándo usarlas | [.claude/skills/](../../../.claude/skills/) |
| 2 | [Crea tu primera skill](02-creating-a-skill.md) | Carpeta, `SKILL.md`, `/skills` y prioridad de nombres | [pr-description](../../../plugins/agent-skills-starter/skills/pr-description/SKILL.md) |
| 3 | [Configuración y skills multiarchivo](03-configuration-and-multi-file.md) | Frontmatter, descripciones, `allowed-tools`, divulgación progresiva, scripts | [add-course](../../../.claude/skills/add-course/SKILL.md) |
| 4 | [Skills frente a otras funciones de Claude Code](04-skills-vs-other-features.md) | CLAUDE.md, subagentes, hooks y MCP: cuál usar y cuándo | [docs-reviewer](../../../.claude/agents/docs-reviewer.md) |
| 5 | [Compartir skills](05-sharing-skills.md) | Git, plugins, marketplaces, enterprise, subagentes con skills | [plugin agent-skills-starter](../../../plugins/agent-skills-starter/README.es.md) |
| 6 | [Solución de problemas de skills](06-troubleshooting.md) | Validador y soluciones para los problemas comunes | [skill-troubleshooter](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/SKILL.md) |

## Resumen rápido

### Qué son las skills
- Un `SKILL.md` con `name` y `description` en el frontmatter, y luego las instrucciones.
- Claude compara tu pedido con cada descripción y activa las que coinciden.
- Se cargan bajo demanda (`CLAUDE.md` se carga siempre). Personales: `~/.claude/skills`. De proyecto: `.claude/skills`.
- ¿Explicas lo mismo una y otra vez? Escribe una skill.

### Crea tu primera skill
- Carpeta con el nombre de la skill + `SKILL.md` dentro.
- Compruébala con `/skills`; `/reload-skills` si una nueva no aparece.
- Mismo nombre: enterprise > personal > proyecto. Los plugins usan `/plugin:skill`. Usa nombres descriptivos.

### Configuración y skills multiarchivo
- Todos los campos son opcionales en Claude Code; `description` es el clave (qué + cuándo).
- `allowed-tools` preaprueba herramientas; `model` elige el modelo.
- `SKILL.md` por debajo de 500 líneas; detalles en `references/`, código en `scripts/`, plantillas en `assets/`.
- Dile a Claude que ejecute los scripts, no que los lea.

### Skills frente a otras funciones
- `CLAUDE.md` siempre activo · skills por pedido · hooks por eventos · subagentes aislados · MCP herramientas externas.
- Combínalas; no fuerces todo dentro de las skills.

### Compartir skills
- Git para tu equipo, plugins + marketplaces para todos, configuración administrada para la organización.
- Los subagentes personalizados precargan skills con `skills:` (lista YAML). Los integrados no.

### Solución de problemas
- Empieza con `claude plugin validate .claude/skills`.
- No se activa → descripción. No se carga → ruta/nombre/YAML. Skill incorrecta → descripciones distintas.
