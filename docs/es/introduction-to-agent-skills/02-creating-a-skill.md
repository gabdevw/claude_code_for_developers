[English](../../en/introduction-to-agent-skills/02-creating-a-skill.md) | **Español**

# 2. Crea tu primera skill

> **En una línea:** crea una carpeta con el nombre de la skill, pon un `SKILL.md` dentro y comprueba que Claude pueda verla.

## Paso 1: crea la carpeta

Crea una carpeta para tu skill dentro de la carpeta de skills. **El nombre de la carpeta debe coincidir con el nombre de la skill.**

Este ejemplo es una skill personal, así que vive en tu carpeta de usuario y funciona en todos tus proyectos:

```bash
# macOS / Linux / Git Bash
mkdir -p ~/.claude/skills/pr-description
```

```powershell
# Windows PowerShell
New-Item -ItemType Directory -Force "$HOME\.claude\skills\pr-description"
```

Para una skill de proyecto, usa `.claude/skills/pr-description` dentro del repositorio.

## Paso 2: escribe SKILL.md

Crea un archivo `SKILL.md` dentro de esa carpeta. Tiene dos partes, separadas por los guiones del frontmatter:

````markdown
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
````

| Parte | Qué hace |
|---|---|
| `name` | Identifica tu skill. También es el comando para llamarla: `/pr-description`. |
| `description` | Le indica a Claude **cuándo** usarla. Es el criterio de coincidencia. |
| Todo lo que viene después del segundo `---` | Las instrucciones que Claude sigue cuando la skill está activa. |

## Paso 3: comprueba que esté disponible

- Ejecuta `/skills` para ver la lista de skills disponibles (escribe para filtrarla).
- Claude Code detecta los cambios en las carpetas de skills durante la sesión. Si una skill nueva no aparece, ejecuta `/reload-skills`.
- Si la carpeta de skills se creó durante esta sesión (por ejemplo, con tu primera skill personal), los cambios no se detectan solos: ejecuta `/reload-skills` después de cada cambio.
- Pruébala con un pedido real: "escribe la descripción del PR para esta rama". O llámala directamente: `/pr-description`.

## Cuando dos skills tienen el mismo nombre

Si clonas un repositorio que tiene una skill con el mismo nombre que una de tus skills personales, ¿cuál gana? Hay un orden de prioridad claro:

| Prioridad | Nivel | Dónde |
|---|---|---|
| 1 (la más alta) | **Enterprise** | Configuración administrada que despliega tu organización |
| 2 | **Personal** | `~/.claude/skills` |
| 3 | **De proyecto** | `.claude/skills` en el repositorio |

Las skills de **plugins** instalados quedan fuera de este orden: tienen su propio espacio de nombres (un prefijo que mantiene separados los nombres): `/nombre-del-plugin:nombre-de-la-skill`. Así que una skill de plugin y otra skill con el mismo nombre se cargan ambas.

Para evitar conflictos, **usa nombres descriptivos**. En lugar de `review`, usa `frontend-review` o `backend-review`.

## En este repositorio

- [pr-description](../../../plugins/agent-skills-starter/skills/pr-description/SKILL.md): el ejemplo del curso, mejorado con `allowed-tools` para los comandos de git.
- Cómo copiarla como skill personal: [README del plugin → Usar una skill como skill personal](../../../plugins/agent-skills-starter/README.es.md#usar-una-skill-como-skill-personal).
- Plantilla lista para copiar: [templates/es/SKILL.md](../../../templates/es/SKILL.md).

## Resumen

- [ ] Crea una carpeta con el nombre de la skill: `~/.claude/skills/<nombre>/` (personal) o `.claude/skills/<nombre>/` (de proyecto).
- [ ] Dentro, escribe `SKILL.md`: el frontmatter (`name`, `description`) y luego las instrucciones.
- [ ] Compruébala con `/skills`; usa `/reload-skills` si una skill nueva no aparece.
- [ ] Mismo nombre en dos lugares: enterprise > personal > proyecto. Las skills de plugins tienen su propio espacio de nombres.
- [ ] Usa nombres descriptivos para evitar conflictos.

---

[← Qué son las skills](01-what-are-skills.md) | Siguiente: [Configuración y skills multiarchivo →](03-configuration-and-multi-file.md)
