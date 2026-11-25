Mejores prácticas de Claude:

No ejecutes /compact solo, sin más. Agrega instrucciones después del comando para decirle a Claude cómo resumir. Por ejemplo, si terminaste de depurar hace un rato y ahora solo te importan algunos cambios de la API, dilo:

/compact Enfócate en la implementación de la bandera --version

Ejecuta trabajo en paralelo con worktrees; Hay un archivo útil que debes conocer. Un archivo .worktreeinclude en la raíz del repositorio enumera los archivos ignorados por git que se deben copiar a cada worktree. Esto es útil para cosas como un archivo de variables de entorno o una configuración local que necesitas en cada worktree pero que no quieres confirmar en el control de versiones.

Loop; Loop ejecuta un prompt en un intervalo entre turnos, ya sea fijo o a su propio ritmo. Úsalo para sondear algo externo, como una ejecución de CI o un despliegue, y actuar cuando el estado cambie.

Resumen: 

Manejar sesiones largas de Claude Code se reduce a un puñado de hábitos:

Delimita tu trabajo primero, luego dirige.
Dirige tu compactación para que el resumen conserve lo que importa.
Usa el menú de rebobinado para corregir el rumbo cuando Claude se desvíe.
Establece un goal cuando puedas describir "terminado" mejor de lo que puedes describir los pasos.
Ejecuta trabajo en paralelo en worktrees.

Haz eso, y podrás confiar en una ejecución larga sin vigilar cada paso de ella.

-----------------------------------------------------------------------------

Un CLAUDE.md que se respeta


Un CLAUDE.md que se respeta; Lo clave que hay que entender es que CLAUDE.md no es una configuración forzada. Es orientación. Cada línea compite con todas las demás por la atención de Claude. Cuanto más crece el archivo, más compite consigo mismo, y con menos fiabilidad Claude sigue cualquier regla individual. Así que el objetivo no es anotarlo todo. El objetivo es mantener el archivo ajustado. Mientras más esbelto sea el archivo, más de él sigue Claude realmente

Primero, pregúntate si CLAUDE.md es siquiera la herramienta correcta; Mueve tus reglas duras a hooks y deja que CLAUDE.md maneje las convenciones más suaves. Las cuatro ubicaciones de CLAUDE.md:

Política gestionada — el archivo a nivel de organización que controla tu equipo de plataforma. No puedes excluirlo, así que la política de la organización siempre está en juego.
Usuario — tus preferencias personales que te siguen en todos los proyectos de tu máquina.
Proyecto — el archivo compartido con tu equipo, registrado en el repositorio.
Local — ignorado por git. Tus notas personales solo para este repositorio.

Divide un archivo grande con importaciones; Cuando tu archivo de proyecto empieza a alargarse, puedes dividirlo en partes usando la sintaxis de importación ruta-al-archivo. En lugar de un muro de texto, apuntas a otros archivos

La redacción es lo que hace que las reglas se mantengan

Una vez que has decidido que una regla pertenece a CLAUDE.md, que Claude realmente la obedezca depende de cómo la redactes. La mayoría de las reglas fallan porque son vagas. Así es como se arregla eso.

Sé específico y verificable por ejemplo:

Vago: "Sigue las mejores prácticas para rutas de API."
Específico: "Pon las nuevas rutas de API en src/api/handlers, una por archivo."


Nombra el reemplazo, no solo prohíbas algo; Cuando le dices a Claude que no haga algo, di qué hacer en su lugar. De lo contrario, dejas la puerta abierta. Ejemplos:

Deja la puerta abierta: "No uses exportaciones por defecto." Bien, ¿pero entonces qué?
La cierra: "Usa exportaciones nombradas, no exportaciones por defecto."

Tu archivo CLAUDE.md nunca está terminado. Trátalo como código vivo que se sigue editando.

Resumen:

Trata tu CLAUDE.md como código de producción. Si no puedes justificar una línea, elimínala. Para mantener el archivo esbelto y fácil de seguir:


Mueve las reglas duras a hooks, donde realmente se aplican.
Organiza archivos largos con importaciones (solo recuerda que no reducen el contexto).
Haz que cada regla sea específica y verificable, y nombra el reemplazo.
Redacta las reglas con sencillez en vez de agregar énfasis.
Sigue revisando el archivo siempre que Claude se equivoque en algo.

La idea completa es simple. Mientras más esbelto sea el archivo, más de él sigue Claude.

-----------------------------------------------------------------------------

Habilidades de verificación

las skills son una buena forma de automatizar el trabajo repetido; Una revisión previa a un PR. La regla general: si has escrito la misma instrucción de varios pasos dos veces, eso es una skill.

Coloca un reference.md junto a SKILL.md para el material detallado, y luego enlázalo desde SKILL.md. Pon también scripts en la carpeta. Claude los ejecuta en lugar de cargar su contenido en el contexto. Eso significa que una skill puede llevar sus propias herramientas, como un check.sh que ejecuta todas las verificaciones.

Qué superficie de instrucciones posee cada regla

- Las convenciones que aplican todo el tiempo, cosas como reglas de nomenclatura o dónde van los archivos, pertenecen a tu archivo CLAUDE.md
- Los procedimientos y el material de referencia vinculados a un tipo particular de tarea pertenecen a una skill.
-  Una regla que Claude no debe poder saltarse pertenece a un hook, no a ninguno de los dos anteriores.

Resumen:

Una skill es una carpeta con un SKILL.md dentro: un nombre, una descripción que la activa, y el procedimiento en sí. Solo las descripciones se cargan en el contexto hasta que se necesita una skill, así que hay poco costo en empaquetar cada procedimiento que repites.

Empieza con la verificación. Construye la skill, agrégala a .claude/skills de tu proyecto, y ahora todo el equipo hereda el mismo movimiento. El trabajo de todos se revisa de la misma manera, automáticamente, sin que nadie tenga que acordarse de pedirlo.

-----------------------------------------------------------------------------

Hooks

Un hook es código determinista que se ejecuta en un punto fijo del ciclo, por lo que puede garantizar un comportamiento en lugar de simplemente esperarlo. Convierte una regla de "Claude normalmente hace caso" en "Claude no puede saltársela".

los mas usados son PreToolUse, PostToolUse, etc.

Una salvaguarda real: redactar en lugar de bloquear

Tú escribes el prompt  →  Claude (el modelo) lo lee  →  Claude escribe un comando Bash  →  [HOOK]  →  La terminal lo ejecuta
                          ↑                                                              ↑
                    aquí NO actúa                                                aquí SÍ actúa


Una analogía: el hook no es un filtro entre tu boca y el oído de Claude. Es un guardia entre la mano de Claude y la terminal. Claude puede saber el secreto, pero el guardia no deja que lo escriba en un comando sin que tú lo apruebes.

Un detalle importante

Fíjate que el comando reescrito con REDACTED ya no va a funcionar contra Stripe, porque esa no es una clave válida. Y está bien, porque la idea es que las claves reales nunca viajen escritas en el comando. La práctica correcta es que el comando use una variable de entorno:

bash
curl https://api.stripe.com/v1/charges -u $STRIPE_KEY:

Así el comando funciona, pero el texto del comando nunca contiene la clave. Si Claude intenta pegar la clave "a mano", el hook lo detecta.


Si lo que quieres es proteger tus prompts

Para eso existe otro hook, UserPromptSubmit, que se dispara cuando envías un mensaje, antes de que Claude lo lea. Puede revisar tu prompt y bloquearlo si detecta algo como sk_live_, para que el secreto nunca llegue al modelo. Aun así, la mejor regla para tu equipo es simple: no pegar secretos en los prompts. Hay que guardarlos en .env o en variables de entorno y referirse a ellos por su nombre.

Preservar el estado a través de una compactación
Cuando Claude compacta una conversación larga, pierde mucho detalle. Un hook de SessionStart con el matcher compact se ejecuta justo después de la compactación. 

Resumen:

Los hooks convierten una regla que Claude normalmente sigue en una que siempre sigue. Ve más allá del formateo automático: protege las herramientas con PreToolUse, controla el turno con Stop y preserva el estado a través de una compactación. La configuración requiere un poco de esfuerzo inicial, pero se recompensa la primera vez que detiene algo en una ejecución que ni siquiera estabas observando.

-----------------------------------------------------------------------------

Tareas programadas: un prompt guardado que se ejecuta en la nube

Puedes crear una tarea programada desde la web en claude.ai/code/routines. Le das un nombre, escribes las instrucciones que describen lo que Claude debe hacer en cada sesión, eliges un repositorio y eliges un disparador.
También puedes crear una desde dentro de Claude Code sin salir de tu terminal. Solo ejecuta el comando /schedule y describe lo que quieres en lenguaje natural, por ejemplo:

/schedule auditoría diaria de dependencias a las 9am

------------------------------------------------------------------------

GitHub Actions y Code Review

El camino administrado: Code Review

Un Owner de tu organización de Claude lo habilita desde la configuración de administrador de Claude Code. Encontrarás una sección de Code review con un interruptor Allow code review que inicia la configuración.
Desde ahí, el Owner instala la app de Claude para GitHub, elige qué repositorios observa y decide cuándo se ejecuta. Si el Owner no es también propietario de la organización de GitHub, alguien debe instalar y vincular la app primero

Tienes algunas opciones de temporización:

- Una vez cuando se abre un PR
- En cada push al PR
- Solo cuando alguien comenta @claude review

Una vez activado, todo se ejecuta en la infraestructura de Anthropic. Un conjunto de agentes de revisión analiza el diff contra todo tu código base, no solo las líneas cambiadas de forma aislada. Luego publica hallazgos como comentarios en línea sobre las líneas específicas, etiquetados por severidad, con una tabla resumen en el check run.

Cada hallazgo llega como un comentario de Claude, justo en la línea, con una explicación clara y una corrección sugerida.

Lo bueno es que deduplica y clasifica los hallazgos. Así que en lugar de un muro de nimiedades, lees un puñado de problemas reales que merecen tu atención.

IMPORTANTE: Está disponible en los planes Team y Enterprise.