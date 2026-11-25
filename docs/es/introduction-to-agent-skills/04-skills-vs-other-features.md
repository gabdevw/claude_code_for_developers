[English](../../en/introduction-to-agent-skills/04-skills-vs-other-features.md) | **Español**

# 4. Skills frente a otras funciones de Claude Code

> **En una línea:** cada función tiene su propio trabajo; combínalas en lugar de forzar todo dentro de las skills.

## Cinco formas de personalizar Claude Code

Claude Code ofrece varias opciones de personalización: skills, `CLAUDE.md`, subagentes, hooks y servidores MCP. Resuelven problemas diferentes, y saber cuándo usar cada una te evita construir lo que no corresponde.

| Función | Cuándo actúa | Ideal para |
|---|---|---|
| **CLAUDE.md** | Se carga en cada conversación | Estándares del proyecto que siempre aplican |
| **Skills** | Bajo demanda, **por pedido**: se activan según lo que pides | Conocimiento específico de una tarea |
| **Subagentes** | Cuando les delegas trabajo, en su **propio contexto separado** | Trabajo delegado y aislado |
| **Hooks** | **Por eventos**: una llamada a una herramienta, la edición de un archivo, el inicio de una sesión… | Operaciones automáticas que siempre deben ocurrir |
| **Servidores MCP** | Cuando Claude necesita una herramienta externa | Herramientas externas e integraciones |

## Skills frente a CLAUDE.md

`CLAUDE.md` se carga en cada conversación: úsalo para estándares del proyecto que siempre están activos. Las skills se cargan bajo demanda: úsalas para conocimiento que solo importa en ciertas tareas. Mira también [dónde va cada regla](../claude-code-in-action/03-skills.md#qué-superficie-posee-cada-regla).

## Skills frente a subagentes

Un **subagente** es un ayudante que se ejecuta en un contexto separado. Recibe una tarea, trabaja en ella de forma independiente y devuelve los resultados. Está aislado de la conversación principal.

Las skills, en cambio, **agregan conocimiento a tu conversación actual**.

Usa subagentes cuando:

- Quieras delegar una tarea a un contexto separado.
- Necesites un acceso a herramientas distinto al de la conversación principal.
- Quieras aislamiento entre el trabajo delegado y tu contexto principal.

Puedes combinar ambos: un subagente puede cargar skills ([capítulo 5](05-sharing-skills.md#skills-y-subagentes)).

## Skills frente a hooks

Los hooks se activan **por eventos**: se disparan al guardar un archivo o al llamar a una herramienta. Las skills se activan **por pedido**: según lo que estás pidiendo. Si algo debe ocurrir siempre, sin importar lo que pidas, es un hook. Mira [Claude Code in Action → Hooks](../claude-code-in-action/04-hooks.md).

## Skills frente a servidores MCP

Los **servidores MCP** le dan a Claude nuevas herramientas e integraciones, por ejemplo para consultar una base de datos o usar un servicio externo. Es una categoría completamente distinta: una skill le enseña a Claude **cómo** hacer una tarea; un servidor MCP le da **acceso** a algo. Una skill puede explicar cómo usar las herramientas que da un servidor MCP.

## Una configuración típica

| Pieza | Trabajo | En este repositorio |
|---|---|---|
| `CLAUDE.md` | Estándares del proyecto siempre activos | [CLAUDE.md](../../../CLAUDE.md): reglas de escritura bilingüe |
| Skills | Conocimiento de tareas, bajo demanda | [verify](../../../.claude/skills/verify/SKILL.md), [add-course](../../../.claude/skills/add-course/SKILL.md) |
| Hooks | Operaciones automáticas por eventos | [.claude/hooks/](../../../.claude/hooks/): secretos, traducciones, compactación |
| Subagentes | Trabajo aislado y delegado | [docs-reviewer](../../../.claude/agents/docs-reviewer.md) |
| Servidores MCP | Herramientas externas | Aquí no hace falta ninguno; no todos los proyectos necesitan las cinco |

## Guía rápida para decidir

| Si piensas… | Usa |
|---|---|
| "Claude siempre debe saber esto." | `CLAUDE.md` |
| "Claude debe saber esto cuando haga X." | Una skill |
| "Esto debe pasar cada vez que ocurra Y." | Un hook |
| "Haz esto en un contexto aparte y dame el resultado." | Un subagente |
| "Claude necesita acceso al sistema Z." | Un servidor MCP |

## Resumen

- [ ] `CLAUDE.md`: estándares siempre activos. Skills: conocimiento de tareas, cargado bajo demanda.
- [ ] Subagentes: contextos aislados para trabajo delegado. Las skills agregan conocimiento a la conversación actual.
- [ ] Los hooks se disparan por eventos; las skills se activan por pedido.
- [ ] Los servidores MCP dan herramientas externas; las skills enseñan cómo hacer las cosas.
- [ ] Cada función se encarga de su especialidad. No fuerces todo dentro de las skills; usa varias a la vez.

---

[← Configuración y skills multiarchivo](03-configuration-and-multi-file.md) | Siguiente: [Compartir skills →](05-sharing-skills.md)
