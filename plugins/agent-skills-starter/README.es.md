[English](README.md) | **Español**

# Plugin: agent-skills-starter

Skills reutilizables del curso [Introducción a las Agent Skills](../../docs/es/introduction-to-agent-skills/README.md), empaquetadas como un **plugin** de Claude Code para que puedas usarlas en cualquier proyecto.

| Skill | Comando | Qué hace |
|---|---|---|
| [pr-description](skills/pr-description/SKILL.md) | `/agent-skills-starter:pr-description` | Escribe la descripción de un pull request a partir de los cambios de la rama. |
| [codebase-onboarding](skills/codebase-onboarding/SKILL.md) | `/agent-skills-starter:codebase-onboarding` | Explica un código base a una persona nueva en el proyecto. Usa `allowed-tools` y `model`. |
| [skill-troubleshooter](skills/skill-troubleshooter/SKILL.md) | `/agent-skills-starter:skill-troubleshooter` | Encuentra por qué una skill no se activa, no se carga o falla. Incluye un script y un archivo de referencia. |

Las skills de un plugin tienen su propio espacio de nombres (`nombre-del-plugin:nombre-de-la-skill`), así que nunca chocan con tus propias skills del mismo nombre.

## Estructura

```text
plugins/agent-skills-starter/
├── .claude-plugin/
│   └── plugin.json          ← el manifiesto (solo "name" es obligatorio)
└── skills/
    ├── pr-description/SKILL.md
    ├── codebase-onboarding/SKILL.md
    └── skill-troubleshooter/
        ├── SKILL.md
        ├── references/troubleshooting.md
        └── scripts/check-skills.js
```

El marketplace que lista este plugin está en la raíz del repositorio: [.claude-plugin/marketplace.json](../../.claude-plugin/marketplace.json).

## Estado

La estructura está completa y validada con `claude plugin validate`, pero el marketplace **todavía no está publicado**. Sigue los pasos de abajo.

## Paso 1: pruébalo localmente

Desde la raíz de este repositorio:

```bash
# Busca errores en el plugin y en el marketplace
claude plugin validate plugins/agent-skills-starter
claude plugin validate .

# Inicia Claude Code con el plugin cargado solo para esta sesión
claude --plugin-dir plugins/agent-skills-starter
```

Dentro de la sesión, ejecuta `/skills` y comprueba que aparezcan las tres skills. Luego prueba un pedido como "explícame cómo funciona este proyecto".

Después de cambiar un archivo del plugin, ejecuta `/reload-plugins`.

## Paso 2: instálalo desde el marketplace local

```bash
claude plugin marketplace add .
claude plugin install agent-skills-starter@claude-code-best-practices
```

O, dentro de Claude Code: `/plugin marketplace add .` y luego `/plugin install agent-skills-starter@claude-code-best-practices`. Ejecuta `/plugin` y revisa las pestañas **Installed** y **Errors**.

## Paso 3: publica tu marketplace en GitHub

Un marketplace es simplemente un repositorio con un archivo `.claude-plugin/marketplace.json`. No hay formulario de envío.

1. Cambia `owner.name` en [marketplace.json](../../.claude-plugin/marketplace.json) y `author` en [plugin.json](.claude-plugin/plugin.json).
2. Sube `version` en `plugin.json` cada vez que publiques cambios. Los usuarios solo reciben actualizaciones cuando cambia la versión.
3. Sube el repositorio a GitHub (debe ser público, o los usuarios necesitan acceso).
4. Ahora cualquiera puede agregarlo e instalar el plugin:

   ```bash
   claude plugin marketplace add <tu-usuario>/<este-repo>
   claude plugin install agent-skills-starter@claude-code-best-practices
   ```

## Paso 4 (opcional): envíalo al directorio de plugins de Claude

Para aparecer en el directorio público, envía el plugin desde el portal de desarrolladores en [claude.ai/directory/manage](https://claude.ai/directory/manage) (necesitas un plan de pago de claude.ai). Revisa la [documentación oficial](https://code.claude.com/docs/en/plugins) para ver los requisitos actuales antes de enviarlo.

## Usar una skill como skill personal

Si solo quieres una skill, sin el plugin, copia su carpeta a tu carpeta de skills personales:

```bash
# macOS / Linux / Git Bash en Windows
mkdir -p ~/.claude/skills
cp -r plugins/agent-skills-starter/skills/pr-description ~/.claude/skills/
```

En Windows la carpeta es `C:/Users/<tu-usuario>/.claude/skills`. Luego ejecuta `/reload-skills` (o abre una sesión nueva) y llámala con `/pr-description`.
