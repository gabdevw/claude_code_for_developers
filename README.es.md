[English](README.md) | **Español**

# Mejores prácticas de Claude Code

Una guía bilingüe (inglés/español) para trabajar bien con [Claude Code](https://code.claude.com/docs), escrita con palabras sencillas, **más un proyecto base que funciona** y aplica cada práctica.

- 📚 **Aprende**: notas de cursos reescritas en lenguaje simple, una página por tema.
- 🛠️ **Copia**: hooks, skills, configuraciones y flujos de trabajo reales que puedes llevar a tus propios proyectos.
- 🌱 **Crece**: una estructura lista para agregar nuevos cursos y ejemplos.

## Cursos

| Curso | Temas |
|---|---|
| [Claude Code in Action](docs/es/claude-code-in-action/README.md) | Sesiones largas · CLAUDE.md · Skills · Hooks · Tareas programadas · GitHub Actions y Code Review |
| [Introducción a las Agent Skills](docs/es/introduction-to-agent-skills/README.md) | Crear skills · Configuración y skills multiarchivo · Skills frente a otras funciones · Compartir (plugins, subagentes) · Solución de problemas |

Todos los cursos: [docs/es/](docs/es/README.md).

## Qué contiene

```text
.
├── CLAUDE.md                     # Reglas del proyecto para Claude (esbeltas, específicas, verificables)
├── REVIEW.md                     # Indicaciones extra para Claude Code Review
├── .worktreeinclude              # Archivos ignorados que se copian a cada worktree
├── .env.example                  # Nombres de los secretos, sin valores
├── .claude-plugin/
│   └── marketplace.json          # Este repositorio también es un marketplace de plugins
├── .claude/
│   ├── settings.json             # Configuración de los hooks
│   ├── agents/
│   │   └── docs-reviewer.md      # Subagente que precarga la skill verify
│   ├── hooks/                    # Hooks escritos en Node.js (sin dependencias)
│   │   ├── redact-secrets.js         # PreToolUse: redacta claves en comandos Bash y pregunta
│   │   ├── block-secrets-in-prompt.js# UserPromptSubmit: frena secretos antes de que Claude los lea
│   │   ├── translation-reminder.js   # PostToolUse: recuerda a Claude actualizar el otro idioma
│   │   ├── stop-check-translations.js# Stop: no termina mientras falte una traducción
│   │   ├── session-start-compact.js  # SessionStart (compact): restaura el estado tras compactar
│   │   └── lib/                      # Código compartido (patrones de secretos, lector de entrada)
│   └── skills/
│       ├── verify/               # /verify — SKILL.md + reference.md + scripts/check.sh
│       └── add-course/           # Agrega un curso: SKILL.md + references/ + scripts/ + assets/
├── plugins/
│   └── agent-skills-starter/     # Plugin con skills reutilizables + pasos para publicarlo
├── .github/
│   ├── workflows/
│   │   ├── checks.yml            # Ejecuta las verificaciones de /verify en cada pull request
│   │   └── claude.yml            # Claude responde a las menciones de @claude
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── en/<curso>/               # Notas en inglés
│   └── es/<curso>/               # Notas en español (mismos nombres de archivo)
├── templates/
│   ├── en/                       # Plantillas de CLAUDE.md, SKILL.md y subagentes listas para copiar
│   └── es/
└── scripts/                      # Verificaciones que usan los hooks, la skill /verify y la CI
```

## Inicio rápido

Requisitos: [Claude Code](https://code.claude.com/docs), [Node.js](https://nodejs.org) 18 o más reciente, y Git (en Windows, Git for Windows incluye Git Bash).

```bash
git clone https://github.com/<tu-usuario>/<este-repo>.git
cd <este-repo>
cp .env.example .env      # pon tus propios valores en .env (nunca lo subas)
claude
```

Dentro de Claude Code, prueba:

- `/verify`: ejecuta todas las verificaciones del repositorio.
- "Agrega este curso al proyecto" (con tu archivo de notas): la skill `add-course` lo convierte en documentación bilingüe con ejemplos.
- `/hooks`: muestra los hooks activos. `/skills`: muestra las skills.
- `claude --plugin-dir plugins/agent-skills-starter`: prueba el plugin ([pasos](plugins/agent-skills-starter/README.es.md)).

También puedes ejecutar las verificaciones sin Claude:

```bash
bash .claude/skills/verify/scripts/check.sh
```

## Úsalo como base para tu propio proyecto

1. Copia `.claude/` (hooks, skills, agentes y settings), `.worktreeinclude`, `.env.example` y las reglas de `.gitignore`.
2. Empieza tu `CLAUDE.md` desde [templates/es/CLAUDE.md](templates/es/CLAUDE.md), o ejecuta `/init`. Ahí también hay plantillas de [skills](templates/es/SKILL.md) y [subagentes](templates/es/agent.md).
3. Instala el [plugin agent-skills-starter](plugins/agent-skills-starter/README.es.md) para tener skills reutilizables.
4. Quédate solo con los hooks que necesites. Los hooks de secretos sirven en todos lados; los de traducción son propios de este repositorio.
5. Cambia `scripts/` y `check.sh` para que `/verify` ejecute **tus** pruebas y tu linter.

> Los hooks se ejecutan con los permisos de tu usuario. Lee cada hook antes de usarlo.

## Contribuir

Las contribuciones son bienvenidas en inglés, español o ambos. Lee [CONTRIBUTING.es.md](CONTRIBUTING.es.md) y el [Código de conducta](CODE_OF_CONDUCT.es.md).

## Licencia

[MIT](LICENSE). Este es un proyecto de la comunidad y no está afiliado a Anthropic.
