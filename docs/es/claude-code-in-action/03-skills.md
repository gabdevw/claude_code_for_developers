[English](../../en/claude-code-in-action/03-skills.md) | **Español**

# 3. Skills: empaqueta lo que repites

> **En una línea:** si has escrito la misma instrucción de varios pasos dos veces, conviértela en una skill.

## Qué es una skill

Una **skill** es una carpeta con un archivo `SKILL.md` dentro. Tiene tres partes:

1. **Un nombre**: también se convierte en comando. La skill `verify` se ejecuta con `/verify`.
2. **Una descripción**: le dice a Claude *cuándo* usar la skill.
3. **El procedimiento**: los pasos a seguir.

Las skills son una buena forma de automatizar trabajo repetido, por ejemplo una revisión antes de abrir un pull request (PR).

**Por qué son baratas:** solo las descripciones se cargan en el contexto. El contenido completo se carga solo cuando se necesita la skill. Así que hay poco costo en empaquetar cada procedimiento que repites.

Claude puede usar una skill de dos formas:

- **Automáticamente**, cuando tu pedido coincide con la descripción.
- **Cuando tú la llamas**, escribiendo `/nombre-de-la-skill`.

## Dónde viven las skills

| Ubicación | Quién la recibe |
|---|---|
| `.claude/skills/<nombre>/SKILL.md` | Todos los que trabajan en el proyecto (está en git). |
| `~/.claude/skills/<nombre>/SKILL.md` | Solo tú, en todos tus proyectos. |

## Anatomía de una skill

```text
.claude/skills/verify/
├── SKILL.md          ← nombre, descripción y pasos cortos
├── reference.md      ← detalles largos, se leen solo si hacen falta
└── scripts/
    └── check.sh      ← una herramienta que Claude ejecuta (no la lee)
```

```markdown
---
name: verify
description: Ejecuta todas las verificaciones del proyecto antes de un commit o pull request. Úsala cuando el usuario pida verificar, revisar o preparar un PR.
---

# Verificar

1. Ejecuta `bash .claude/skills/verify/scripts/check.sh`.
2. Si una verificación falla, corrige la causa y vuelve a ejecutarlo.
3. Revisa los cambios con la lista de [reference.md](reference.md).
4. Informa qué verificaciones se ejecutaron y qué corregiste.
```

### Campos del frontmatter

El bloque entre las líneas `---` al inicio es el **frontmatter**.

| Campo | Qué hace |
|---|---|
| `description` | El campo más importante. Dice **qué** hace la skill y **cuándo** usarla. |
| `name` | El nombre del comando. Si no lo pones, se usa el nombre de la carpeta. |
| `disable-model-invocation: true` | Solo tú puedes iniciar la skill con `/nombre`. Bueno para acciones con efectos, como un despliegue. |
| `allowed-tools` | Herramientas que Claude puede usar sin preguntar mientras la skill se ejecuta. |

### Escribe una descripción que la active

| Débil | Fuerte |
|---|---|
| "Ayuda con revisiones." | "Ejecuta todas las verificaciones del proyecto antes de un commit o pull request. Úsala cuando el usuario pida verificar, revisar o preparar un PR." |

## Mantén SKILL.md corto: reference.md y scripts

- **`reference.md`**: coloca el material detallado junto a `SKILL.md` y enlázalo. Claude lo lee solo cuando lo necesita.
- **Scripts**: ponlos también en la carpeta. **Claude los ejecuta en lugar de cargar su contenido en el contexto**; solo el resultado entra al contexto. Eso significa que una skill puede llevar sus propias herramientas, como un `check.sh` que ejecuta todas las verificaciones.

## Qué superficie posee cada regla

| Regla | Dónde va | Ejemplo |
|---|---|---|
| Convenciones que aplican todo el tiempo (nombres, dónde van los archivos) | `CLAUDE.md` | "Usa exportaciones nombradas, no exportaciones por defecto." |
| Procedimientos y material de referencia de un tipo de tarea | Una skill | "Pasos para publicar una nueva versión." |
| Una regla que Claude no debe poder saltarse | Un [hook](04-hooks.md) | "Nunca ejecutes un comando que contenga una clave de API." |

## Empieza con la verificación

La mejor primera skill es una de **verificación**. Constrúyela, agrégala a `.claude/skills/` de tu proyecto, y ahora todo el equipo hereda el mismo movimiento. El trabajo de todos se revisa de la misma manera, automáticamente, sin que nadie tenga que acordarse de pedirlo.

Ejemplos en este repositorio:

- [.claude/skills/verify/](../../../.claude/skills/verify/SKILL.md): ejecuta [check.sh](../../../.claude/skills/verify/scripts/check.sh) y revisa con [reference.md](../../../.claude/skills/verify/reference.md).
- [.claude/skills/add-course/](../../../.claude/skills/add-course/SKILL.md): agrega un curso nuevo en ambos idiomas (`/add-course <nombre>`).
- Plantilla: [templates/es/SKILL.md](../../../templates/es/SKILL.md).

## Resumen

- [ ] Una skill es una carpeta con un `SKILL.md`: un nombre, una descripción que la activa y el procedimiento.
- [ ] Solo las descripciones se cargan hasta que se necesita una skill, así que empaquetar procedimientos cuesta poco.
- [ ] Pon los detalles largos en `reference.md` y las herramientas en `scripts/`.
- [ ] Regla general: la misma instrucción de varios pasos escrita dos veces → conviértela en skill.
- [ ] Empieza con una skill de verificación en `.claude/skills/`, para que todo el equipo revise el trabajo igual.

---

[← 2. Un CLAUDE.md que se respeta](02-claude-md.md) | Siguiente: [4. Hooks →](04-hooks.md)
