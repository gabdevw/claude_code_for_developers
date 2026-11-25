[English](../../en/introduction-to-agent-skills/05-sharing-skills.md) | **Español**

# 5. Compartir skills

> **En una línea:** sube las skills al repositorio para compartirlas con tu equipo, empaquétalas en un plugin para compartirlas con todos, y usa la configuración administrada para aplicarlas a toda una organización.

## Tres formas de compartir

| Forma | Quién recibe las skills | Cómo |
|---|---|---|
| **Subirlas al repositorio** | Cualquiera que lo clone | Flujo normal de git |
| **Plugin en un marketplace** | Cualquiera que lo instale, en cualquier proyecto | Publicar un marketplace |
| **Configuración administrada empresarial** | Toda la organización, con la máxima prioridad | Tu administrador las despliega |

## 1. Sube las skills a tu repositorio

Ponlas en `.claude/skills`, y cualquiera que clone el repositorio las obtiene automáticamente, sin instalar nada más.

La carpeta `.claude` contiene tus agentes, hooks, skills y configuraciones, todo bajo control de versiones y compartido con el equipo mediante los flujos normales de git:

```text
.claude/
├── agents/       ← subagentes
├── hooks/        ← scripts de hooks
├── skills/       ← skills de proyecto
└── settings.json ← hooks y permisos
```

## 2. Distribuye skills con plugins

Un **plugin** es un paquete de skills (y opcionalmente agentes, hooks y más) que la gente instala en Claude Code. Un **marketplace** es una lista de plugins desde la que la gente puede agregarlos e instalarlos.

Este enfoque es mejor cuando tus skills **no son demasiado específicas de un proyecto** y pueden ayudar a personas más allá de tu equipo.

```text
my-plugin/
├── .claude-plugin/
│   └── plugin.json        ← manifiesto: solo "name" es obligatorio
└── skills/
    └── my-skill/
        └── SKILL.md
```

```json
{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "What the plugin offers."
}
```

Un marketplace es un repositorio con un archivo `.claude-plugin/marketplace.json`:

```json
{
  "name": "my-marketplace",
  "owner": { "name": "Your Name" },
  "plugins": [
    { "name": "my-plugin", "source": "./plugins/my-plugin", "description": "What the plugin offers." }
  ]
}
```

Los pasos, en resumen:

1. **Valida**: `claude plugin validate <carpeta-del-plugin>`.
2. **Prueba localmente**: `claude --plugin-dir <carpeta-del-plugin>`.
3. **Publica**: sube a GitHub el repositorio con el marketplace. No hay formulario de envío.
4. **Instala** (otras personas): `/plugin marketplace add <usuario>/<repo>` y luego `/plugin install my-plugin@my-marketplace`.
5. **Opcional**: envíalo al directorio público de plugins desde [claude.ai/directory/manage](https://claude.ai/directory/manage).

Las skills de un plugin se llaman con su espacio de nombres: `/my-plugin:my-skill`.

## 3. Configuración administrada empresarial

Los administradores pueden desplegar skills a toda la organización mediante la **configuración administrada**, en una carpeta `.claude/skills/` dentro del directorio de configuración administrada (en Linux, por ejemplo, `/etc/claude-code/.claude/skills/`). Tienen **la máxima prioridad**, así que son ideales para estándares obligatorios y cumplimiento normativo. Los usuarios no pueden reemplazarlas.

## Skills y subagentes

Dos cosas que debes saber:

- **Los subagentes no ven las skills que ya invocaste** en la conversación principal. Si tienen la herramienta `Skill`, aún pueden encontrar e invocar skills.
- **Los agentes integrados (como Explore y Plan) no precargan skills.** Solo los subagentes personalizados pueden listar las skills que se cargan al inicio, en su campo `skills`.

Para crear un subagente personalizado con skills, agrega un archivo Markdown de agente en `.claude/agents/`. Puedes escribirlo tú o pedirle a Claude que lo cree. Si la carpeta `.claude/agents` no existía cuando empezó tu sesión, reinicia Claude Code para cargar el subagente nuevo.

```yaml
---
name: frontend-security-accessibility-reviewer
description: Use this agent when you need to review frontend code for accessibility...
tools: Bash, Glob, Grep, Read, WebFetch, WebSearch, Skill
model: sonnet
color: blue
skills:
  - accessibility-audit
  - performance-check
---
```

> **Nota:** escribe `skills` como una lista YAML, como arriba. Ese es el formato de la documentación oficial.

Cuando delegas en este subagente, empieza con el contenido completo de ambas skills y las aplica en cada revisión. Primero asegúrate de que las skills existan en `.claude/skills`, y luego crea el subagente o agrega el campo `skills` a uno existente.

Este patrón funciona muy bien cuando:

- Quieres una delegación aislada con experiencia específica.
- Distintos subagentes necesitan distintas skills (un revisor de frontend frente a uno de backend).
- Quieres hacer cumplir estándares en el trabajo delegado sin depender de los prompts.

## En este repositorio

- [.claude/agents/docs-reviewer.md](../../../.claude/agents/docs-reviewer.md): un subagente que precarga la skill `verify` para revisar las páginas de los cursos.
- [plugins/agent-skills-starter/](../../../plugins/agent-skills-starter/README.es.md): un plugin con tres skills, e **instrucciones paso a paso** para probarlo, instalarlo y publicarlo.
- [.claude-plugin/marketplace.json](../../../.claude-plugin/marketplace.json): este repositorio también es un marketplace.
- Plantilla para tus propios subagentes: [templates/es/agent.md](../../../templates/es/agent.md).

## Resumen

- [ ] Las skills de proyecto en `.claude/skills` se comparten por git: quien clona el repositorio las obtiene.
- [ ] Los plugins comparten skills entre repositorios mediante marketplaces; un marketplace es un repositorio con `marketplace.json`.
- [ ] La configuración administrada empresarial despliega skills a toda la organización, con la máxima prioridad.
- [ ] Los subagentes no ven las skills que ya invocaste; los agentes integrados no precargan skills.
- [ ] Los subagentes personalizados precargan skills con el campo `skills` (una lista YAML).

---

[← Skills frente a otras funciones de Claude Code](04-skills-vs-other-features.md) | Siguiente: [Solución de problemas de skills →](06-troubleshooting.md)
