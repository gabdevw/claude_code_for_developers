[English](../../en/claude-code-in-action/05-scheduled-tasks.md) | **Español**

# 5. Tareas programadas: un prompt guardado que se ejecuta en la nube

> **En una línea:** escribe las instrucciones una vez y Claude las ejecuta solo, incluso con tu computadora apagada.

## Qué es una tarea programada

Una **tarea programada** (antes se llamaba *routine*) es un prompt guardado que Claude ejecuta **en la nube**, en la infraestructura de Anthropic. Cada ejecución es una nueva sesión de Claude Code que trabaja sobre un repositorio que tú eliges.

Como se ejecuta en la nube, sigue funcionando cuando tu laptop está cerrada.

## Cómo crear una

**Desde la web:** entra a [claude.ai/code/routines](https://claude.ai/code/routines) y completa:

1. Un **nombre**.
2. Las **instrucciones**: lo que Claude debe hacer en cada sesión.
3. El **repositorio** sobre el que trabaja.
4. El **disparador**: lo que la inicia.

**Desde la terminal**, sin salir de Claude Code: ejecuta `/schedule` y describe lo que quieres en lenguaje natural:

```text
/schedule auditoría diaria de dependencias a las 9am
```

## Disparadores

| Disparador | Ejemplo |
|---|---|
| **Horario** | Todos los días hábiles a las 9:00. |
| **API** | Otro sistema llama a una URL para iniciarla. |
| **Evento de GitHub** | Se abre un pull request, se publica una versión, se crea un issue. |

## Escribe instrucciones que funcionen solas

Nadie está mirando para responder preguntas, así que las instrucciones deben valerse por sí mismas. Indica:

- **Qué** revisar o hacer.
- **Cómo se ve "terminado".**
- **Dónde dejar el resultado**: un pull request, un issue, un comentario.
- **Qué no hacer.**

Ejemplo:

```text
Revisa las dependencias de package.json en busca de vulnerabilidades conocidas con `npm audit`.
Si hay problemas altos o críticos, actualiza los paquetes afectados, ejecuta `npm test`
y abre un pull request titulado "Auditoría de dependencias <fecha>" con la lista de cambios.
Si las pruebas fallan, no abras el pull request: abre un issue con el error.
No cambies ningún otro archivo.
```

## ¿`/loop` o tarea programada?

| | `/loop` | Tarea programada |
|---|---|---|
| Dónde se ejecuta | En tu sesión abierta, en tu computadora | En la nube |
| Se detiene cuando | Cierras la sesión | La pausas o la eliminas |
| Ideal para | Vigilar algo **ahora** (una ejecución de CI, un despliegue) | Trabajo recurrente (auditorías diarias, reportes semanales) |

Ver [/loop en el capítulo 1](01-long-sessions.md#6-repite-una-tarea-con-loop).

> Las tareas programadas están disponibles en los planes de pago y siguen evolucionando. Revisa la [documentación oficial](https://code.claude.com/docs/en/routines) para ver los detalles más recientes.

## Resumen

- [ ] Una tarea programada es un prompt guardado + un repositorio + un disparador.
- [ ] Créala en claude.ai/code/routines o con `/schedule` desde la terminal.
- [ ] Se ejecuta en la nube, así que funciona con tu computadora apagada.
- [ ] Escribe instrucciones autosuficientes: qué hacer, qué significa "terminado", dónde dejar el resultado, qué no tocar.
- [ ] Usa `/loop` para vigilar algo a corto plazo en tu sesión, y tareas programadas para trabajo recurrente.

---

[← 4. Hooks](04-hooks.md) | Siguiente: [6. GitHub Actions y Code Review →](06-github-actions-code-review.md)
