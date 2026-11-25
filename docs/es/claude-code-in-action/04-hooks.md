[English](../../en/claude-code-in-action/04-hooks.md) | **Español**

# 4. Hooks: reglas que Claude no puede saltarse

> **En una línea:** un hook es tu propio código que se ejecuta en un momento fijo, siempre.

## Qué es un hook

Un **hook** es código determinista (siempre hace lo mismo) que se ejecuta en un punto fijo del ciclo de trabajo de Claude. Por eso puede **garantizar** un comportamiento en lugar de simplemente esperarlo.

Convierte una regla de "Claude normalmente hace caso" en "Claude no puede saltársela".

## Los eventos más usados

| Evento | Cuándo se ejecuta | Uso típico |
|---|---|---|
| `PreToolUse` | Antes de que Claude use una herramienta (Bash, Edit, Write…) | Bloquear o reescribir un comando peligroso. |
| `PostToolUse` | Después de que una herramienta termina bien | Formatear o revisar el archivo editado; agregar un recordatorio para Claude. |
| `UserPromptSubmit` | Cuando envías un prompt, **antes** de que Claude lo lea | Bloquear secretos en tu prompt; agregar contexto. |
| `Stop` | Cuando Claude está por terminar su turno | Comprobar que el trabajo está completo; hacer que Claude siga si no lo está. |
| `SessionStart` | Cuando una sesión empieza, se reanuda o justo después de una compactación | Cargar contexto o estado guardado. |

## Cómo configurar uno

Los hooks se configuran en un archivo de settings:

| Archivo | A quién aplica |
|---|---|
| `.claude/settings.json` | A todos en el proyecto (está en git). |
| `.claude/settings.local.json` | Solo a ti, en este proyecto. |
| `~/.claude/settings.json` | Solo a ti, en todos tus proyectos. |

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/redact-secrets.js\"" }
        ]
      }
    ]
  }
}
```

- **`matcher`** elige qué herramienta activa el hook: `Bash`, `Edit|Write`, etc. Para `SessionStart` elige el momento: `startup`, `resume`, `clear` o `compact`.
- **`$CLAUDE_PROJECT_DIR`** es la carpeta raíz de tu proyecto.
- Ejecuta **`/hooks`** para ver todos los hooks configurados.

## Cómo se comunica un hook con Claude Code

1. **Entrada:** Claude Code le envía al hook un JSON por la entrada estándar (stdin). Por ejemplo, para `PreToolUse` incluye `tool_name` y `tool_input` (el comando que Claude quiere ejecutar).
2. **Salida — la forma simple, con códigos de salida:**
   - `0` → todo bien, continúa.
   - `2` → bloquear. El mensaje que el hook escribe en la salida de error (stderr) explica por qué.
   - Cualquier otro código → se muestra un error, pero la acción continúa.
3. **Salida — la forma detallada:** termina con `0` e imprime un JSON en stdout, como en los ejemplos de abajo.

## Una salvaguarda real: redactar en lugar de bloquear

El problema: Claude conoce una clave secreta (por ejemplo, una clave de Stripe que empieza con `sk_live_...`) y la escribe dentro de un comando. Ahora la clave queda en el historial de la terminal y en los logs.

¿Dónde actúa el hook?

```text
Tú escribes el prompt
      │
      ▼
Claude (el modelo) lo lee            ← un hook PreToolUse NO actúa aquí
      │
      ▼
Claude escribe un comando Bash
      │
      ▼
[ HOOK PreToolUse ]                   ← aquí SÍ actúa: revisa y reescribe el comando
      │
      ▼
La terminal ejecuta el comando
```

Una analogía: el hook no es un filtro entre tu boca y el oído de Claude. **Es un guardia entre la mano de Claude y la terminal.** Claude puede saber el secreto, pero el guardia no deja que lo escriba en un comando sin que tú lo apruebes.

Lo que hace el hook:

1. Encuentra la clave en el comando.
2. La reemplaza por `REDACTED` (`updatedInput`).
3. Te pregunta antes de ejecutarlo (`permissionDecision: "ask"`).

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "The command contained a secret. It was replaced with REDACTED.",
    "updatedInput": { "command": "curl https://api.stripe.com/v1/charges -u REDACTED:" }
  }
}
```

Ejemplo completo: [.claude/hooks/redact-secrets.js](../../../.claude/hooks/redact-secrets.js).

### Un detalle importante

El comando reescrito con `REDACTED` **no va a funcionar** contra Stripe, porque esa no es una clave válida. Y está bien: la idea es que las claves reales nunca viajen escritas en el comando. La práctica correcta es que el comando use una **variable de entorno**:

```bash
curl https://api.stripe.com/v1/charges -u "$STRIPE_KEY:"
```

Así el comando funciona, pero su texto nunca contiene la clave. Si Claude intenta pegar la clave "a mano", el hook lo detecta.

## Si quieres proteger tus prompts: UserPromptSubmit

El hook anterior protege los comandos. Para proteger lo que **tú** escribes existe otro hook: `UserPromptSubmit`. Se dispara cuando envías un mensaje, **antes de que Claude lo lea**. Puede revisar tu prompt y bloquearlo si detecta algo como `sk_live_...`, para que el secreto nunca llegue al modelo.

```json
{ "decision": "block", "reason": "Tu prompt parece contener un secreto, así que no se envió." }
```

Ejemplo: [.claude/hooks/block-secrets-in-prompt.js](../../../.claude/hooks/block-secrets-in-prompt.js).

Aun así, la mejor regla para tu equipo es simple: **no pegues secretos en los prompts.** Guárdalos en `.env` o en variables de entorno y refiérete a ellos por su nombre. Sube un [.env.example](../../../.env.example) con los nombres pero sin los valores.

## Revisar antes de terminar: Stop

Un hook `Stop` se ejecuta cuando Claude está por terminar su turno. Si el trabajo no está completo, puede bloquear el final y decirle a Claude qué falta:

```json
{ "decision": "block", "reason": "A estas páginas les falta su traducción al español: ..." }
```

Revisa siempre el campo `stop_hook_active` de la entrada. Es `true` cuando Claude ya está continuando por un hook `Stop`. Si vuelves a bloquear, puedes crear un ciclo infinito.

Ejemplo: [.claude/hooks/stop-check-translations.js](../../../.claude/hooks/stop-check-translations.js) (no deja que Claude termine mientras una página exista en un solo idioma).

## Conservar el estado tras la compactación: SessionStart

Cuando Claude compacta una conversación larga, pierde mucho detalle. Un hook `SessionStart` con el matcher `compact` se ejecuta justo después de la compactación. **Lo que imprime se agrega al contexto de Claude**, así que puedes recuperar lo que no se debe perder: el objetivo actual, las decisiones, los próximos pasos.

```json
"SessionStart": [
  {
    "matcher": "compact",
    "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/session-start-compact.js\"" }]
  }
]
```

Ejemplo: [.claude/hooks/session-start-compact.js](../../../.claude/hooks/session-start-compact.js) (imprime las notas de `.claude/state/current-task.md`).

## Ve más allá del formateo automático: PostToolUse

El hook `PostToolUse` clásico formatea cada archivo que Claude edita. También puede agregar una nota al contexto de Claude (`additionalContext`):

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Editaste docs/en/intro.md. Actualiza también docs/es/intro.md."
  }
}
```

Ejemplo: [.claude/hooks/translation-reminder.js](../../../.claude/hooks/translation-reminder.js).

## La seguridad primero

Los hooks se ejecutan automáticamente, **con los permisos de tu usuario**. Lee cada hook antes de agregarlo, sobre todo si lo copias de un repositorio público (incluido este).

Todos los hooks de este repositorio están configurados en [.claude/settings.json](../../../.claude/settings.json).

## Resumen

Los hooks convierten una regla que Claude normalmente sigue en una que siempre sigue. Ve más allá del formateo automático:

- [ ] Protege las herramientas con **`PreToolUse`** (por ejemplo, redacta secretos y pregunta antes de ejecutar).
- [ ] Protege tus prompts con **`UserPromptSubmit`**, pero de todos modos guarda los secretos en `.env`.
- [ ] Controla el final del turno con **`Stop`** (y revisa `stop_hook_active`).
- [ ] Preserva el estado a través de una compactación con **`SessionStart`** + matcher `compact`.
- [ ] Revisa cada hook antes de agregarlo: se ejecuta con tus permisos.

La configuración requiere un poco de esfuerzo inicial, pero se recompensa la primera vez que un hook detiene algo en una ejecución que ni siquiera estabas observando.

---

[← 3. Skills](03-skills.md) | Siguiente: [5. Tareas programadas →](05-scheduled-tasks.md)
