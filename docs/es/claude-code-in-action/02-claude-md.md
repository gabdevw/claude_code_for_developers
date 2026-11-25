[English](../../en/claude-code-in-action/02-claude-md.md) | **Español**

# 2. Un CLAUDE.md que se respeta

> **En una línea:** mantenlo corto, específico y al día. Mientras más esbelto sea el archivo, más de él sigue Claude.

## Qué es CLAUDE.md

`CLAUDE.md` es un archivo Markdown que Claude lee al inicio de cada sesión. Le explica cómo funciona tu proyecto.

Lo clave que hay que entender: **CLAUDE.md es orientación, no una configuración forzada.** Cada línea compite con todas las demás por la atención de Claude. Cuanto más crece el archivo, más compite consigo mismo, y con menos fiabilidad Claude sigue cualquier regla individual.

Así que el objetivo no es anotarlo todo. El objetivo es mantener el archivo ajustado.

- Crea una primera versión con `/init`. Claude revisa tu proyecto y escribe uno por ti (si ya existe, sugiere mejoras).
- Ábrelo y edítalo con `/memory`, o desde tu editor.

## Primero, pregúntate si CLAUDE.md es la herramienta correcta

| Tipo de regla | Dónde va | Por qué |
|---|---|---|
| Convenciones que siempre aplican (nombres, dónde van los archivos) | `CLAUDE.md` | Claude lo lee en cada sesión. |
| Pasos para un tipo de tarea (publicar, revisar, migrar) | Una [skill](03-skills.md) | Solo se carga cuando aparece esa tarea. |
| Una regla que Claude **no debe** poder saltarse | Un [hook](04-hooks.md) | Es código, así que siempre se ejecuta. |

**Mueve tus reglas duras a hooks y deja que CLAUDE.md maneje las convenciones más suaves.**

## Las cuatro ubicaciones

| Nivel | Ruta | Para quién | ¿En git? |
|---|---|---|---|
| **Política gestionada** | Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`<br>macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br>Linux: `/etc/claude-code/CLAUDE.md` | Toda la organización. La controla tu equipo de plataforma y no puedes excluirla, así que la política de la organización siempre aplica. | No |
| **Usuario** | `~/.claude/CLAUDE.md` | Tú, en todos los proyectos de tu máquina. | No |
| **Proyecto** | `./CLAUDE.md` o `./.claude/CLAUDE.md` | Tu equipo. Se sube al repositorio. | Sí |
| **Local** | `./CLAUDE.local.md` | Tú, solo en este repositorio. Notas personales. | No (agrégalo a `.gitignore`) |

Claude lee todos los que existan y los combina.

## Divide un archivo largo con importaciones

Cuando el archivo del proyecto empieza a crecer, divídelo en partes con la sintaxis de importación `@ruta/al/archivo`. En lugar de un muro de texto, apuntas a otros archivos:

```markdown
# Mi proyecto

Mira @README.md para una visión general y @package.json para los comandos disponibles.

## Reglas
- Convenciones de la API: @docs/api-conventions.md
- Pruebas: @docs/testing.md
- Mis preferencias personales: @~/.claude/my-preferences.md
```

> **Importante:** las importaciones **organizan** el archivo, pero **no reducen el contexto**. Los archivos importados se cargan al inicio, igual que el archivo principal.

Si quieres reglas que se carguen **solo cuando se necesitan**, ponlas en `.claude/rules/` e indica a qué archivos aplican con `paths`:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

- Pon cada handler de la API en su propio archivo en src/api/handlers.
- Valida el cuerpo de la petición con los esquemas de src/api/schemas.
```

Claude solo carga ese archivo cuando trabaja con archivos que coinciden con esas rutas.

## La redacción es lo que hace que las reglas se mantengan

Una vez que decidiste que una regla pertenece a CLAUDE.md, que Claude realmente la obedezca depende de cómo la redactes. La mayoría de las reglas fallan porque son vagas. Así se arregla.

### Sé específico y verificable

Deberías poder mirar el resultado y decir "sí, siguió la regla" o "no, no la siguió".

| Vago | Específico |
|---|---|
| "Sigue las mejores prácticas para rutas de API." | "Pon las nuevas rutas de API en `src/api/handlers`, una por archivo." |
| "Escribe buenas pruebas." | "Agrega una prueba en `tests/` por cada función nueva. Ejecútalas con `npm test`." |
| "Mantén el código limpio." | "Ejecuta `npm run lint` antes de decir que una tarea está terminada." |

### Nombra el reemplazo, no solo prohíbas

Cuando le dices a Claude que **no** haga algo, di qué hacer **en su lugar**. De lo contrario, dejas la puerta abierta.

| Deja la puerta abierta | La cierra |
|---|---|
| "No uses exportaciones por defecto." (Bien, ¿pero entonces qué?) | "Usa exportaciones nombradas, no exportaciones por defecto." |
| "No uses `console.log`." | "Usa el logger de `src/lib/logger.ts`, no `console.log`." |

### Redacta con sencillez en vez de agregar énfasis

`IMPORTANTE!!!`, `DEBES`, `NUNCA JAMÁS` no ayudan. Cuando todo está enfatizado, nada destaca. Escribe la regla con sencillez. Si una regla es realmente crítica, va en un hook.

### Sigue revisándolo

Tu CLAUDE.md nunca está terminado. Trátalo como código vivo que se sigue editando. Cada vez que Claude se equivoque en algo, pregúntate:

1. ¿Falta una regla? → agrégala.
2. ¿La regla es vaga? → hazla específica.
3. ¿La regla está enterrada en un archivo largo? → recorta otras líneas, o muévelas a una skill o a una importación.
4. ¿No debe fallar nunca? → muévela a un hook.

## Ejemplo

```markdown
# API de la tienda

API REST en Node.js para la tienda en línea.

## Comandos
- Pruebas: `npm test`
- Lint: `npm run lint`

## Convenciones
- Pon las nuevas rutas de API en src/api/handlers, una por archivo.
- Usa exportaciones nombradas, no exportaciones por defecto.
- Usa el logger de src/lib/logger.ts, no console.log.

## Flujo de trabajo
- Ejecuta `npm test` y `npm run lint` antes de decir que una tarea está terminada.
```

Plantillas listas para copiar: [templates/es/CLAUDE.md](../../../templates/es/CLAUDE.md). El archivo de este repositorio: [CLAUDE.md](../../../CLAUDE.md).

## Resumen

Trata tu CLAUDE.md como código de producción. Si no puedes justificar una línea, elimínala. Para mantener el archivo esbelto y fácil de seguir:

- [ ] Mueve las reglas duras a **hooks**, donde realmente se aplican.
- [ ] Organiza archivos largos con **importaciones** (solo recuerda que no reducen el contexto).
- [ ] Haz que cada regla sea **específica y verificable**, y **nombra el reemplazo**.
- [ ] Redacta las reglas **con sencillez** en vez de agregar énfasis.
- [ ] **Sigue revisando** el archivo siempre que Claude se equivoque en algo.

La idea completa es simple: mientras más esbelto sea el archivo, más de él sigue Claude.

---

[← 1. Manejar sesiones largas](01-long-sessions.md) | Siguiente: [3. Skills →](03-skills.md)
