[English](../../en/introduction-to-agent-skills/03-configuration-and-multi-file.md) | **Español**

# 3. Configuración y skills multiarchivo

> **En una línea:** lo que más importa es una buena descripción; agrega `allowed-tools` y `model` cuando ayuden, y mantén `SKILL.md` corto moviendo los detalles a `scripts/`, `references/` y `assets/`.

## Campos del frontmatter

El [estándar abierto de Agent Skills](https://agentskills.io) define los campos principales de `SKILL.md`, y Claude Code agrega muchos propios, como `model`. **En Claude Code todos los campos son opcionales, y solo se recomienda `description`.** Estos cuatro son un buen punto de partida:

| Campo | En Claude Code | Qué hace |
|---|---|---|
| `name` | Opcional. Por defecto toma el nombre de la carpeta. | Identifica la skill. |
| `description` | **Recomendado** | Le indica a Claude cuándo usar la skill. Es el campo más importante, porque Claude lo usa para hacer coincidencias. |
| `allowed-tools` | Opcional | Preaprueba las herramientas listadas mientras la skill está activa. |
| `model` | Opcional | Elige qué modelo de Claude usar para la skill. |

> **Importante:** si subes la skill a **claude.ai** o a la **Claude API**, aplican las reglas del estándar abierto: `name` y `description` son obligatorios, `name` solo puede tener letras minúsculas, números y guiones (máximo 64 caracteres), y `description` puede tener hasta 1,024 caracteres. Seguir estas reglas en todos lados hace que tus skills sean portables.

La referencia oficial del frontmatter lista el resto de los campos (por ejemplo `disable-model-invocation`, del [curso anterior](../claude-code-in-action/03-skills.md#campos-del-frontmatter)).

## Escribe descripciones que funcionen

Sé explícito. Si alguien te dijera "tu trabajo es ayudar con la documentación", no sabrías qué hacer, y Claude piensa de la misma manera.

Una buena descripción responde dos preguntas:

1. **¿Qué hace la skill?**
2. **¿Cuándo debería usarla Claude?**

| Vaga | Efectiva |
|---|---|
| "Ayuda con la documentación." | "Escribe páginas de referencia de la API a partir de los handlers de `src/api`. Úsala cuando el usuario pida documentar un endpoint, actualizar la documentación de la API o 'escribe la documentación de esta ruta'." |

Si tu skill no se activa cuando esperas, **agrega palabras clave que coincidan con cómo formulas realmente tus pedidos**, incluso en otros idiomas que use tu equipo. La descripción es lo que Claude usa para decidir si una skill es relevante, así que el lenguaje importa.

## Preaprobar herramientas con `allowed-tools`

A veces una skill usa las mismas pocas herramientas cada vez, y no quieres aprobar cada llamada a mano. `allowed-tools` preaprueba las herramientas que listes, así Claude puede usarlas **sin un aviso de permiso durante el resto del turno que invocó la skill** (un turno dura hasta que Claude termina de responder tu pedido).

```yaml
---
name: codebase-onboarding
description: Helps new developers understand how the system works.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---
```

En este ejemplo, mientras la skill está activa, Claude puede usar `Read`, `Grep`, `Glob` y `Bash` sin preguntar.

Buenas prácticas:

- **Aprueba solo lo que necesitas.** `Bash(git log *)` aprueba solo los comandos `git log`; `Bash` a secas aprueba cualquier comando.
- `allowed-tools` aprueba herramientas; no bloquea las demás. Las herramientas que no están en la lista siguen pidiendo permiso.
- Puedes escribir la lista como texto (`Read, Grep`) o como lista YAML.
- El ejemplo del curso dice *qué* hace, pero no *cuándo*. Nuestra versión agrega la parte "Use when ...": [codebase-onboarding](../../../plugins/agent-skills-starter/skills/codebase-onboarding/SKILL.md).

## Divulgación progresiva

Las skills comparten la ventana de contexto de Claude con tu conversación. Cuando Claude activa una skill, carga ese `SKILL.md` en el contexto. Pero algunas skills necesitan referencias, ejemplos o scripts de ayuda.

La **divulgación progresiva** significa: mantén las instrucciones esenciales en `SKILL.md` y pon el material detallado en archivos separados que Claude lee **solo cuando es necesario**.

El estándar abierto sugiere esta organización:

| Carpeta | Para |
|---|---|
| `scripts/` | Código ejecutable |
| `references/` | Documentación adicional |
| `assets/` | Imágenes, plantillas y otros archivos de datos |

En `SKILL.md`, enlaza los archivos de soporte con instrucciones claras sobre **cuándo** cargarlos: `Si el usuario pregunta por errores, lee [references/errors.md](references/errors.md).`

Una buena regla general: **mantén `SKILL.md` por debajo de 500 líneas.** Si lo superas, divide el contenido en archivos de referencia.

## Usar scripts de manera eficiente

Los scripts de la carpeta de tu skill se ejecutan **sin cargar su contenido en el contexto**. Solo su salida consume tokens.

La instrucción clave en tu `SKILL.md` es decirle a Claude que **ejecute** el script, no que lo lea. Usa `${CLAUDE_SKILL_DIR}` para apuntar a la carpeta de la propia skill, sin importar dónde esté trabajando Claude:

```markdown
Ejecuta `node ${CLAUDE_SKILL_DIR}/scripts/scaffold-course.js <curso> <capítulos...>`. No leas el script.
```

Los scripts son especialmente útiles para:

- Comprobar que el entorno está listo.
- Transformaciones de datos que siempre deben dar el mismo resultado.
- Operaciones que son más confiables como código probado que como código que Claude escribe cada vez.

## En este repositorio

La skill [add-course](../../../.claude/skills/add-course/SKILL.md) usa todas las ideas de este capítulo:

```text
.claude/skills/add-course/
├── SKILL.md                      ← procedimiento corto, con el "cuándo" en la descripción
├── references/
│   ├── writing-style.md          ← se lee al escribir las páginas
│   └── examples-guide.md         ← se lee al elegir los ejemplos
├── scripts/
│   └── scaffold-course.js        ← Claude lo ejecuta para crear el esqueleto bilingüe
└── assets/
    ├── course-readme.en.md / .es.md
    └── lesson.en.md / .es.md     ← plantillas que completa el script
```

- [codebase-onboarding](../../../plugins/agent-skills-starter/skills/codebase-onboarding/SKILL.md): `allowed-tools` + `model`.
- [skill-troubleshooter](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/SKILL.md): un script y un archivo de referencia.

## Resumen

- [ ] En Claude Code todos los campos del frontmatter son opcionales; `description` es el que más importa.
- [ ] Para claude.ai o la API: `name` en minúsculas con guiones (máximo 64) y `description` de hasta 1,024 caracteres.
- [ ] Una descripción dice **qué** y **cuándo**; agrega las palabras que la gente realmente usa.
- [ ] `allowed-tools` preaprueba herramientas durante el turno; aprueba solo lo que necesitas.
- [ ] Mantén `SKILL.md` por debajo de 500 líneas; los detalles van a `references/`, el código a `scripts/` y las plantillas a `assets/`.
- [ ] Dile a Claude que **ejecute** los scripts, no que los lea: solo la salida consume tokens.

---

[← Crea tu primera skill](02-creating-a-skill.md) | Siguiente: [Skills frente a otras funciones de Claude Code →](04-skills-vs-other-features.md)
