[English](../../en/claude-code-in-action/01-long-sessions.md) | **Español**

# 1. Manejar sesiones largas

> **En una línea:** planifica primero, mantén limpio el contexto y corrige el rumbo a tiempo.

## Por qué importa

Claude trabaja dentro de una **ventana de contexto**: la "memoria" de la conversación actual. En una sesión larga se llena de mensajes viejos, contenido de archivos y resultados de comandos. Cuando se llena, a Claude le queda menos espacio para lo que importa ahora y empieza a perder detalles.

Estos hábitos mantienen una sesión larga en buen camino.

## 1. Delimita el trabajo primero, luego dirige

Antes de que Claude escriba código, pónganse de acuerdo en qué construir.

- Usa el **modo plan**: presiona `Shift+Tab` hasta ver "plan mode". Claude lee archivos y propone un plan, pero no cambia nada.
- Pídele que primero lea los archivos relevantes, luego planifique y después programe.
- Da una tarea clara a la vez, y dirige con correcciones cortas y concretas: "usa la función que ya existe en `utils/date.ts`".

Comandos útiles:

| Comando | Qué hace |
|---|---|
| `/context` | Muestra qué tan llena está la ventana de contexto. |
| `/clear` | Empieza de nuevo con el contexto vacío. Úsalo al cambiar a una tarea que no tiene relación. |
| `claude --continue` | Abre de nuevo tu conversación más reciente. |
| `claude --resume` | Te deja elegir una conversación anterior para continuarla. |

## 2. Dirige la compactación

`/compact` resume la conversación para liberar espacio. Claude también compacta solo cuando el contexto está casi lleno.

El problema: un resumen pierde detalle y, si no das indicaciones, Claude decide qué conservar.

**No ejecutes `/compact` solo, sin más.** Agrega instrucciones que digan qué importa ahora. Por ejemplo, si terminaste de depurar hace un rato y ahora solo te importan algunos cambios de la API:

```text
/compact Enfócate en la implementación de la bandera --version
```

Más ejemplos:

```text
/compact Conserva la lista de archivos cambiados y los nombres de las pruebas que fallan. Descarta el historial de depuración.
/compact Conserva el esquema final de la base de datos y las decisiones que tomamos sobre los nombres.
```

También puedes dejar instrucciones permanentes en tu `CLAUDE.md`, en una sección como `## Compact instructions`. Este repositorio lo hace en [CLAUDE.md](../../../CLAUDE.md).

Para recuperar el estado clave *automáticamente* después de cada compactación, usa un hook (ver [Hooks → Conservar el estado tras la compactación](04-hooks.md#conservar-el-estado-tras-la-compactación-sessionstart)).

## 3. Rebobina cuando Claude se desvíe

Cuando Claude va en la dirección equivocada, no discutas durante diez mensajes: el camino equivocado se queda en el contexto. **Mejor vuelve atrás.**

- Presiona `Esc` dos veces (con el cuadro de texto vacío) o ejecuta `/rewind`.
- Elige el mensaje al que quieres volver.
- Elige qué restaurar: **código y conversación**, **solo la conversación** o **solo el código**.

Luego inténtalo de nuevo con un mejor prompt.

Límites que debes conocer:

- Los archivos cambiados **solo por comandos Bash** (por ejemplo `rm`, `mv` o un script) no se rastrean.
- Los cambios que haces fuera de Claude no se rastrean.
- Rebobinar no reemplaza a git. Sigue haciendo commits de tu trabajo.

## 4. Establece un goal cuando puedas describir "terminado"

Algunas tareas son más fáciles de describir por su resultado que por sus pasos. Para esas, usa `/goal`:

```text
/goal todas las pruebas en test/auth pasan y el paso de lint está limpio
```

Después de cada turno, una verificación aparte revisa la condición. Claude sigue trabajando hasta que se cumple (o hasta que es claramente imposible).

- `/goal` sin nada después muestra el estado actual.
- `/goal clear` quita el goal. Hay un goal por sesión.

Escribe goals que se puedan comprobar:

| Vago | Comprobable |
|---|---|
| "Mejora el código." | "`npm test` pasa y `npm run lint` no muestra errores." |
| "Arregla el login." | "Al entrar con una contraseña incorrecta aparece el mensaje 'Credenciales inválidas'." |

## 5. Ejecuta trabajo en paralelo con worktrees

Un **worktree de git** es una segunda carpeta del mismo repositorio, en otra rama. Dos sesiones de Claude pueden trabajar cada una en su propio worktree sin tocar los archivos de la otra.

```bash
claude --worktree feature-login    # forma corta: claude -w feature-login
```

Claude Code crea el worktree en `.claude/worktrees/feature-login/`, en la rama `worktree-feature-login`. Agrega `.claude/worktrees/` a tu `.gitignore`.

### El archivo `.worktreeinclude`

Un worktree nuevo es una copia limpia del repositorio, así que **los archivos ignorados por git (como `.env`) no están ahí**. Para resolverlo, crea un archivo `.worktreeinclude` en la raíz del repositorio y enumera esos archivos. Usa la misma sintaxis que `.gitignore`:

```text
.env
.env.local
CLAUDE.local.md
```

Solo se copian los archivos que coinciden con un patrón **y** están ignorados por git. Es útil para variables de entorno o configuraciones locales que necesitas en cada worktree pero que no debes subir al repositorio.

Ejemplo en este repositorio: [.worktreeinclude](../../../.worktreeinclude).

## 6. Repite una tarea con `/loop`

`/loop` ejecuta un prompt una y otra vez mientras tu sesión está abierta. Úsalo para vigilar algo externo a Claude, como una ejecución de CI o un despliegue, y actuar cuando el estado cambie.

```text
/loop 5m revisa si terminó la ejecución de CI de esta rama; si falló, lee los logs y resume el error
```

- Con un intervalo (`30s`, `5m`, `2h`, `1d`) se ejecuta a ese ritmo fijo.
- Sin intervalo, Claude elige su propio ritmo (entre 1 minuto y 1 hora).
- El loop se detiene cuando cierras la sesión. Para tareas que deben correr con tu computadora apagada, usa [tareas programadas](05-scheduled-tasks.md).

## Resumen

Manejar sesiones largas de Claude Code se reduce a un puñado de hábitos:

- [ ] **Delimita tu trabajo primero, luego dirige.** Usa el modo plan, y `/clear` entre tareas sin relación.
- [ ] **Dirige tu compactación** con `/compact <instrucciones>` para que el resumen conserve lo que importa.
- [ ] **Usa el menú de rebobinado** (`Esc Esc` o `/rewind`) para corregir el rumbo cuando Claude se desvíe.
- [ ] **Establece un `/goal`** cuando puedas describir "terminado" mejor que los pasos.
- [ ] **Ejecuta trabajo en paralelo en worktrees**, con un `.worktreeinclude` para tus archivos ignorados.
- [ ] **Usa `/loop`** para vigilar algo externo mientras la sesión está abierta.

Haz eso, y podrás confiar en una ejecución larga sin vigilar cada paso.

---

Siguiente: [2. Un CLAUDE.md que se respeta →](02-claude-md.md)
