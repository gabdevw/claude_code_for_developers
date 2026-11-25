[English](../../en/introduction-to-agent-skills/01-what-are-skills.md) | **Español**

# 1. Qué son las skills

> **En una línea:** una skill es un archivo Markdown que le enseña a Claude a hacer algo una sola vez; después, Claude la aplica automáticamente cuando es relevante.

## Qué es una skill

Una **skill** le enseña a Claude una tarea una sola vez. Luego Claude usa ese conocimiento por su cuenta cuando aparece la situación, sin que tengas que explicarlo de nuevo.

Cada skill vive en un archivo `SKILL.md`. Arriba, entre dos líneas `---`, está el **frontmatter**: un bloque pequeño con el nombre y la descripción de la skill.

```yaml
---
name: pr-review
description: Reviews pull requests for code quality. Use when reviewing PRs or checking code changes.
---
```

Todo lo que viene después del segundo `---` son las instrucciones que Claude sigue cuando la skill está activa.

## Cómo elige Claude una skill

1. Haces un pedido, por ejemplo "revisa este PR".
2. Claude compara tu pedido con las **descripciones** de todas las skills disponibles. Busca coincidencias por significado, no por palabras exactas.
3. Activa las skills que coinciden y carga sus instrucciones completas.

Así que **la descripción es cómo Claude decide** si usar una skill. El [capítulo 3](03-configuration-and-multi-file.md#escribe-descripciones-que-funcionen) explica cómo escribir una buena.

## Las skills se cargan bajo demanda

| | `CLAUDE.md` | Skill |
|---|---|---|
| Cuándo se carga | En **cada** conversación | Solo cuando es relevante. Hasta entonces, solo se carga su descripción. |
| Ideal para | Estándares del proyecto que siempre aplican | Conocimiento para tareas específicas |

Como al inicio solo se cargan las descripciones, puedes tener muchas skills sin llenar la ventana de contexto (todo lo que Claude puede leer a la vez en una conversación).

## Dónde viven las skills

| Tipo | Ubicación | Quién la recibe |
|---|---|---|
| **Personal** | `~/.claude/skills/<nombre>/SKILL.md`<br>Windows: `C:/Users/<tu-usuario>/.claude/skills/<nombre>/SKILL.md` | Tú, en todos tus proyectos. |
| **De proyecto** | `.claude/skills/<nombre>/SKILL.md` en la raíz del repositorio | Todos los que clonan el repositorio. Se sube junto con tu código. |

## Cuándo usar una skill

Las skills funcionan mejor para **conocimiento especializado que aplica a tareas específicas**:

- Los estándares de revisión de código que sigue tu equipo.
- El formato de mensajes de commit que prefieres.
- Las guías de marca de tu organización.
- Plantillas de documentación para tipos específicos de documentos.
- Listas de verificación de depuración para frameworks particulares.

La regla general es simple: **si te encuentras explicándole lo mismo a Claude una y otra vez, eso es una skill esperando a ser escrita.**

## En este repositorio

- Skills de proyecto que ayudan a mantener este repositorio: [.claude/skills/](../../../.claude/skills/) (`verify` y `add-course`).
- Skills reutilizables para cualquier proyecto: [plugins/agent-skills-starter/skills/](../../../plugins/agent-skills-starter/skills/).
- Del curso anterior: [Claude Code in Action → Skills](../claude-code-in-action/03-skills.md).

## Resumen

- [ ] Una skill es un archivo `SKILL.md` con un nombre y una descripción en su frontmatter, seguidos de instrucciones.
- [ ] Claude compara tu pedido con cada descripción y activa las skills que coinciden.
- [ ] Las skills se cargan bajo demanda; `CLAUDE.md` se carga en cada conversación.
- [ ] Skills personales: `~/.claude/skills`. Skills de proyecto: `.claude/skills` (se comparten por git).
- [ ] ¿Le explicas lo mismo a Claude una y otra vez? Escribe una skill.

---

[← Índice del curso](README.md) | Siguiente: [Crea tu primera skill →](02-creating-a-skill.md)
