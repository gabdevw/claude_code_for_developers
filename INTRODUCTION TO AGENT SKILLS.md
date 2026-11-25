INTRODUCCIÓN A LAS AGENT SKILLS

Cada skill vive en un archivo SKILL.md con un nombre y una descripción en su frontmatter

Claude usa la descripción para hacer coincidir las skills con las solicitudes.

Las skills personales van en ~/.claude/skills y te acompañan en todos tus proyectos. Las skills de proyecto van en .claude/skills dentro de un repositorio y se comparten con cualquiera que lo clone

Las skills se cargan bajo demanda — a diferencia de CLAUDE.md que se carga en cada conversación

las skills se activan automáticamente cuando Claude reconoce la situación.

Una skill es un archivo markdown que le enseña a Claude cómo hacer algo, una sola vez. Claude luego aplica ese conocimiento automáticamente cuando es relevante.

Cada skill vive en un archivo SKILL.md con un nombre y una descripción en su frontmatter.

La descripción es cómo Claude decide si usar la skill. 

Cuando le pides a Claude que revise un PR, compara tu solicitud con las descripciones de las skills disponibles y encuentra la relevante. Claude lee tu solicitud, la compara con todas las descripciones de skills disponibles y activa las que coinciden.

Así es como se ve el frontmatter de una skill:

---
name: pr-review
description: Reviews pull requests for code quality. Use when reviewing PRs or checking code changes.
---

-------------------------------------------------------------------------------

Dónde viven las skill

Las skills personales van en ~/.claude/skills (tu directorio home)
Las skills de proyecto van en .claude/skills dentro del directorio raíz de tu repositorio.

En Windows, las skills personales viven en C:/Users/<your-user>/.claude/skills.

Las skills de proyecto se confirman en el control de versiones junto con tu código, de modo que todo el equipo las comparte.

Cuándo usar las skills

Las skills funcionan mejor para conocimiento especializado que aplica a tareas específicas:

- Los estándares de revisión de código que sigue tu equipo
- Los formatos de mensajes de commit que prefieres
- Las guías de marca de tu organización
- Las plantillas de documentación para tipos específicos de documentos
- Las listas de verificación de depuración para frameworks particulares

La regla general es simple: si te encuentras explicándole lo mismo a Claude repetidamente, eso es una skill esperando a ser escrita.

Prioridad para conflictos de nombres: Enterprise → Personal → Project. Las skills de plugins tienen espacio de nombres propio, por lo que se cargan junto a una skill con el mismo nombre

Si ~/.claude/skills es nuevo en esta sesión, ejecuta /reload-skills después de cada cambio


-------------------------------------------------------------------------------

Puntos importantes a considerar al crear una skill:

Primero, crea un directorio para tu skill dentro de la carpeta skills. El nombre del directorio debe coincidir con el nombre de tu skill: 

Como es una skill personal, vive en tu directorio home y funciona en todos tus proyectos.

mkdir -p ~/.claude/skills/pr-description

Luego crea un archivo SKILL.md dentro de ese directorio. El archivo tiene dos partes separadas por guiones de frontmatter:

---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed

El nombre identifica tu skill. La descripción le indica a Claude cuándo usarla; este es el criterio de coincidencia. Todo lo que viene después del segundo conjunto de guiones son las instrucciones que Claude sigue cuando se activa la skill.

Puedes verificar que tu skill esté disponible revisando la lista de skills disponibles con el comando /skills

-------------------------------------------------------------------------------

Prioridad/Jerarquía de skills

Si clonas un repositorio que tiene una skill con el mismo nombre que una de tus skills personales, ¿cuál gana? Hay un orden de prioridad claro:


- Enterprise: configuración administrada, máxima prioridad
- Personal: tu directorio home (~/.claude/skills)
- Project: el directorio .claude/skills dentro de un repositorio

Las skills de plugins instalados quedan fuera de este orden; Tienen espacio de nombres propio como /plugin-name:skill-name, por lo que una skill de plugin y otra skill con el mismo nombre se cargan ambas

Para evitar conflictos, usa nombres descriptivos. En lugar de simplemente "review", usa algo como "frontend-review" o "backend-review".

-------------------------------------------------------------------------------

Configuración y skills multiarchivo

Todos los campos del frontmatter son opcionales en Claude Code, y solo se recomienda description.
- allowed-tools y model son dos de las adiciones más útiles

allowed-tools preaprueba las herramientas listadas mientras el skill está activo

Divulgación progresiva: mantén SKILL.md por debajo de 500 líneas y enlaza a archivos de soporte (referencias, scripts, assets) que Claude lee solo cuando es necesario

Los scripts se ejecutan sin cargar su contenido en el contexto — solo la salida consume tokens, manteniendo el contexto eficiente.

Campos de metadatos del skill

El estándar abierto de agent skills define los campos principales en el frontmatter de SKILL.md, y Claude Code añade muchos propios, como model. En Claude Code, todos los campos son opcionales, y solo se recomienda description. Estos cuatro son un buen punto de partida (la referencia de frontmatter lista el resto):

- name (opcional) — Identifica tu skill. Por defecto toma el nombre del directorio. Si subes el skill a Claude.ai o a la Claude API, es obligatorio y está limitado a letras minúsculas, números y guiones, hasta 64 caracteres.
- description (recomendado) — Le indica a Claude cuándo usar el skill. Si subes el skill a Claude.ai o a la Claude API, es obligatorio y tiene un límite de 1,024 caracteres. Este es el campo más importante porque Claude lo usa para hacer coincidencias.
- allowed-tools (opcional) — Preaprueba las herramientas listadas, así Claude puede usarlas sin pedir permiso mientras el skill está activo.
- model (opcional) — Especifica qué modelo de Claude usar para el skill.

-------------------------------------------------------------------------------

Cómo escribir descripciones efectivas.

Sé explícito con tus instrucciones. Si alguien te dijera "tu trabajo es ayudar con la documentación", no sabrías qué hacer — y Claude piensa de la misma manera.

Una buena descripción responde dos preguntas:

¿Qué hace el skill?
¿Cuándo debería Claude usarlo?

Si tu skill no se activa cuando esperas que lo haga, intenta añadir más palabras clave que coincidan con cómo realmente formulas tus solicitudes. La descripción es lo que Claude usa para decidir si un skill es relevante, así que el lenguaje importa.

-------------------------------------------------------------------------------

Preaprobar herramientas con allowed-tools

A veces un skill depende del mismo puñado de herramientas cada vez que se ejecuta, y no quieres aprobar cada llamada manualmente. El campo allowed-tools preaprueba las herramientas que listes, así Claude puede usarlas sin un aviso de permiso durante el resto del turno que invocó el skill.

En este ejemplo, el campo allowed-tools está configurado como Read, Grep, Glob, Bash. Cuando este skill está activo, Claude puede usar esas cuatro herramientas sin pedir permiso. 

---
name: codebase-onboarding
description: Helps new developers understand the system works.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---

-------------------------------------------------------------------------------

Divulgación progresiva

Los skills comparten la ventana de contexto de Claude con tu conversación. Cuando Claude activa un skill, carga el contenido de ese SKILL.md en el contexto. Pero a veces necesitas referencias, ejemplos o scripts de utilidad de los que depende el skill.

Mantén las instrucciones esenciales en SKILL.md y pon el material de referencia detallado en archivos separados que Claude lee solo cuando es necesario.

El estándar abierto sugiere organizar el directorio de tu skill con:


scripts/ — Código ejecutable
references/ — Documentación adicional
assets/ — Imágenes, plantillas u otros archivos de datos

Luego, en SKILL.md, enlaza a los archivos de soporte con instrucciones claras sobre cuándo cargarlos


Una buena regla general: mantén SKILL.md por debajo de 500 líneas. Si estás superando eso, considera si el contenido debería dividirse en archivos de referencia separados.

-------------------------------------------------------------------------------

Usar scripts de manera eficiente

Los scripts en el directorio de tu skill pueden ejecutarse sin cargar su contenido en el contexto. El script se ejecuta y solo la salida consume tokens. La instrucción clave que debes incluir en tu SKILL.md es decirle a Claude que ejecute el script, no que lo lea.

Esto es particularmente útil para:

Validación de entornos
Transformaciones de datos que necesitan ser consistentes
Operaciones que son más confiables como código probado que como código generado

-------------------------------------------------------------------------------

Skills frente a otras funciones de Claude Code

- CLAUDE.md se carga en cada conversación y es ideal para estándares de proyecto siempre activos. Los skills se cargan bajo demanda y son ideales para conocimientos específicos de una tarea
- Los subagentes se ejecutan en contextos de ejecución aislados: úsalos para trabajo delegado. Los skills agregan conocimiento a tu conversación actual
- Los hooks se activan por eventos (se disparan al guardar archivos, al llamar herramientas). Los skills se activan por solicitud (se activan según lo que estás pidiendo)
- Los servidores MCP proporcionan herramientas externas e integraciones, una categoría completamente distinta a la de los skills
- Cada función se encarga de su propia especialidad: combínalas en lugar de forzar todo en un solo enfoque

Claude Code ofrece varias opciones de personalización: Skills, CLAUDE.md, subagentes, hooks y servidores MCP. Resuelven problemas diferentes, y saber cuándo usar cada una te evita construir lo que no corresponde

Los subagentes se ejecutan en un contexto separado. Reciben una tarea, trabajan en ella de forma independiente y devuelven resultados. Están aislados de la conversación principal.

Usa Subagentes cuando:

- Quieras delegar una tarea a un contexto de ejecución separado
- Necesites un acceso a herramientas distinto al de la conversación principal
- Quieras aislamiento entre el trabajo delegado y tu contexto principal

Resumen:

Una configuración típica podría incluir:

CLAUDE.md — estándares de proyecto siempre activos
Skills — conocimientos específicos de una tarea que se cargan bajo demanda
Hooks — operaciones automatizadas disparadas por eventos
Subagentes — contextos de ejecución aislados para trabajo delegado
Servidores MCP — herramientas externas e integraciones

Cada uno se encarga de su propia especialidad. No fuerces todo dentro de los skills cuando otra opción encaja mejor, y puedes usar varios a la vez. Los skills proporcionan conocimientos específicos de una tarea de forma automática, CLAUDE.md es para instrucciones siempre activas, los subagentes se ejecutan en contextos aislados, los hooks se disparan por eventos y MCP proporciona herramientas externas.

Usa skills cuando tengas conocimiento que Claude deba aplicar automáticamente cuando el tema sea relevante, y combínalos con otras funciones para lograr una personalización integral.

-------------------------------------------------------------------------------

Compartir skills

Puntos clave

- Los skills de proyecto en .claude/skills se comparten automáticamente a través de Git: cualquiera que clone el repositorio los obtiene
- Los plugins te permiten distribuir skills entre repositorios a través de marketplaces para un uso más amplio por parte de la comunidad
- Las configuraciones administradas empresariales despliegan skills en toda la organización con la máxima prioridad, ideal para estándares obligatorios y cumplimiento normativo
- Los subagentes no ven los skills que ya has invocado. Si tienen la herramienta Skill, aún pueden encontrar e invocar skills
- Los agentes integrados (como Explore y Plan) no precargan skills. Solo los subagentes personalizados pueden listar los skills que se cargarán al inicio, en su campo skills

Confirmar skills en tu repositorio; Colócalos en .claude/skills, y cualquiera que clone el repositorio obtiene esos skills automáticamente, sin necesidad de instalación adicional.

El directorio .claude contiene tus agentes, hooks, skills y configuraciones, todo bajo control de versiones y compartido con el equipo mediante los flujos de trabajo normales de Git.

Distribuir skills mediante plugins; Después de distribuir tu plugin a un marketplace, otros usuarios pueden descubrirlo e instalarlo en Claude Code por sí mismos. Este enfoque es mejor cuando tus skills no son demasiado específicos del proyecto y pueden ser útiles para miembros de la comunidad más allá de tu equipo inmediato.

-------------------------------------------------------------------------------

Skills y subagente

Para crear un subagente personalizado con skills, agrega un archivo markdown de agente en .claude/agents. Puedes escribir el archivo tú mismo o pedirle a Claude que lo cree por ti. Si .claude/agents no existía cuando se inició tu sesión, reinicia Claude Code para cargar el nuevo subagente.

El campo skills del archivo del agente indica qué skills cargar. Así es como se ve el frontmatter:

---
name: frontend-security-accessibility-reviewer
description: "Use this agent when you need to review frontend code for accessibility..."
tools: Bash, Glob, Grep, Read, WebFetch, WebSearch, Skill...
model: sonnet
color: blue
skills: accessibility-audit, performance-check
---

Cuando delegas en este subagente, tiene ambos skills cargados y los aplica en cada revisión. Primero asegúrate de que los skills existan en tu directorio .claude/skills, y luego crea un nuevo subagente o agrega el campo skills al archivo markdown de un agente existente.

Este patrón funciona muy bien cuando:

- Quieres una delegación de tareas aislada con experiencia específica
- Diferentes subagentes necesitan diferentes skills (revisor de frontend frente a revisor de backend)
- Quieres hacer cumplir estándares en el trabajo delegado sin depender de prompts

-------------------------------------------------------------------------------

Solución de problemas de skills

Cuando las skills no funcionan como se espera, el problema generalmente se encuentra en algunas categorías predecibles, desde skills que no se activan hasta conflictos de prioridad y fallos en tiempo de ejecución

Puntos clave

- Comienza con la herramienta validadora de skills — detecta problemas estructurales antes de que dediques tiempo a depurar otras cosas
- Si una skill no se activa, la causa casi siempre es la descripción — agrega frases de activación que coincidan con cómo realmente formulas tus solicitudes
- Si una skill no se carga, verifica que SKILL.md esté dentro de un directorio con nombre (no en la raíz de skills) y que el nombre del archivo sea exactamente SKILL.md
- Si se usa la skill incorrecta, tus descripciones son demasiado similares — hazlas más distintivas
- Para errores en tiempo de ejecución, verifica las dependencias, los permisos de archivo (chmod +x) y los separadores de ruta (usa barras diagonales en todas partes)

Cuando las skills no funcionan, el problema generalmente se encuentra en una de algunas categorías: la skill no se activa, no se carga, tiene conflictos o falla en tiempo de ejecución. La buena noticia es que la mayoría de las soluciones son bastante sencillas.

Usa el validador de skills; Lo primero que debes probar es el comando claude plugin validate. En tu shell, ejecuta claude plugin validate ~/.claude/skills para skills personales o claude plugin validate .claude/skills para skills de proyecto. 

El validador encuentra archivos SKILL.md cuyo frontmatter no se puede analizar, para que detectes ese problema antes de dedicar tiempo a depurar otras cosas.

La skill no se activa; Tu skill existe y pasa la validación, pero Claude no la usa cuando esperas. La causa casi siempre es la descripción.

Claude usa coincidencia semántica, por lo que tu solicitud necesita coincidir con el significado de la descripción. Si no hay suficiente coincidencia, no hay activación.

La skill no se carga; Si tu skill no aparece cuando le preguntas a Claude "qué skills están disponibles", verifica estos requisitos estructurales:

- El archivo SKILL.md debe estar dentro de un directorio con nombre, no en la raíz de skills
- El nombre del archivo debe ser exactamente SKILL.md — todo en mayúsculas para "SKILL", minúsculas para "md"

Ejecuta claude --debug para ver errores de carga. Busca mensajes que mencionen el nombre de tu skill. A veces esto por sí solo te llevará directamente al problema.

Se usa la skill incorrecta; Si Claude usa la skill incorrecta o parece confundirse entre skills, tus descripciones probablemente sean demasiado similares. Hazlas distintivas. 

Conflictos de prioridad de skills; Si tu skill personal está siendo ignorada, es posible que una skill empresarial o de mayor prioridad tenga el mismo nombre.

Tus opciones:

- Cambia el nombre de tu skill a algo más distintivo (esta suele ser la opción más fácil)
- Habla con tu administrador sobre la skill empresarial

Las skills del plugin no aparecen; ¿Instalaste un plugin pero no puedes ver sus skills? Ejecuta /plugin y verifica que el plugin aparezca en la lista y esté habilitado en Installed, luego revisa la pestaña Errors. Si lo instalaste durante esta sesión, ejecuta /reload-plugins.

Si las skills aún no aparecen después de eso, la estructura del plugin podría ser incorrecta. 

Errores en tiempo de ejecución:

La skill se carga pero falla durante la ejecución. Algunas causas comunes:


- Dependencias faltantes: Si tu skill usa paquetes externos, estos deben estar instalados. Agrega información sobre las dependencias a la descripción de tu skill para que Claude sepa qué se necesita.
- Problemas de permisos: Los scripts necesitan permiso de ejecución. Ejecuta chmod +x en cualquier script al que haga referencia tu skill.
- Separadores de ruta: Usa barras diagonales en todas partes, incluso en Windows.

Lista rápida de solución de problemas

¿No se activa? Mejora tu descripción y agrega frases de activación.
¿No se carga? Verifica tu ruta, el nombre del archivo y la sintaxis YAML.
¿Se usa la skill incorrecta? Haz que las descripciones sean más distintivas entre sí.
¿Está siendo eclipsada? Verifica la jerarquía de prioridad y cambia el nombre si es necesario.
¿Faltan skills del plugin? Verifica /plugin en busca de errores, luego ejecuta /reload-plugins.
¿Falla en tiempo de ejecución? Verifica las dependencias, los permisos y las rutas.