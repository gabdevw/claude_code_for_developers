[English](../../en/introduction-to-agent-skills/06-troubleshooting.md) | **Español**

# 6. Solución de problemas de skills

> **En una línea:** empieza con el validador; la mayoría de los problemas son una descripción débil, una ruta o nombre de archivo incorrecto, dos skills parecidas o una dependencia que falta.

Cuando las skills no funcionan como se espera, el problema suele estar en alguna de pocas categorías: no se activa, no se carga, choca con otra skill o falla al ejecutarse. La buena noticia: la mayoría de las soluciones son sencillas.

## Empieza con el validador

Antes que nada, ejecuta el validador. Encuentra archivos `SKILL.md` cuyo frontmatter no se puede leer, para que detectes eso antes de dedicar tiempo a depurar otras cosas.

```bash
claude plugin validate .claude/skills      # skills de proyecto
claude plugin validate ~/.claude/skills    # skills personales
```

También revisa `.claude/agents` y plugins completos.

Este repositorio agrega una segunda revisión que busca más problemas comunes (nombre distinto al de la carpeta, una descripción sin el "cuándo", más de 500 líneas, enlaces a archivos que no existen, scripts sin permiso de ejecución, el mismo nombre en varios lugares):

```bash
node plugins/agent-skills-starter/skills/skill-troubleshooter/scripts/check-skills.js .claude/skills ~/.claude/skills
```

## La skill no se activa

Existe y pasa la validación, pero Claude no la usa cuando esperas. **La causa casi siempre es la descripción.**

Claude usa coincidencia semántica: tu pedido debe coincidir con el *significado* de la descripción. Si no hay suficiente coincidencia, no hay activación. Agrega frases de activación que coincidan con cómo formulas realmente tus pedidos.

## La skill no se carga

No aparece cuando le preguntas a Claude "¿qué skills están disponibles?" ni en `/skills`. Revisa la estructura:

- `SKILL.md` debe estar **dentro de una carpeta con nombre**, no en la raíz de `skills/`: `.claude/skills/mi-skill/SKILL.md`.
- El nombre del archivo debe ser **exactamente** `SKILL.md`: "SKILL" en mayúsculas, "md" en minúsculas.
- El frontmatter YAML debe ser válido.

Si la agregaste durante la sesión, ejecuta `/reload-skills`. También puedes iniciar Claude Code con `claude --debug` y buscar mensajes que mencionen el nombre de tu skill.

## Se usa la skill incorrecta

Si Claude usa la skill incorrecta o parece confundirse entre skills, tus descripciones probablemente son **demasiado parecidas**. Haz que cada una sea distintiva.

## Conflictos de prioridad

Si tu skill personal está siendo ignorada, puede que una skill empresarial (de mayor prioridad) tenga el mismo nombre. Tus opciones:

- Cambia el nombre de tu skill por uno más distintivo (suele ser lo más fácil).
- Habla con tu administrador sobre la skill empresarial.

## Las skills del plugin no aparecen

1. Ejecuta `/plugin`, comprueba que el plugin aparezca y esté habilitado en **Installed**, y luego revisa la pestaña **Errors**.
2. Si lo instalaste durante esta sesión, ejecuta `/reload-plugins`.
3. Si aún no aparecen, la estructura del plugin puede estar mal: ejecuta `claude plugin validate <carpeta-del-plugin>`.

## Errores al ejecutarse

La skill se carga pero falla durante la ejecución. Causas comunes:

- **Dependencias faltantes**: si la skill usa paquetes externos, deben estar instalados. Menciónalos en la descripción de la skill para que Claude sepa qué se necesita.
- **Permisos**: los scripts necesitan permiso de ejecución. Ejecuta `chmod +x` en cada script que use la skill.
- **Separadores de ruta**: usa barras normales (`/`) en todas partes, incluso en Windows.

## Lista rápida

| Síntoma | Solución |
|---|---|
| No se activa | Mejora la descripción y agrega frases de activación. |
| No se carga | Revisa la ruta, el nombre del archivo y el YAML. |
| Se usa la skill incorrecta | Haz que las descripciones sean más distintas entre sí. |
| Está eclipsada | Revisa el orden de prioridad y cambia el nombre si hace falta. |
| Faltan skills del plugin | Revisa `/plugin` en busca de errores y luego ejecuta `/reload-plugins`. |
| Falla al ejecutarse | Revisa dependencias, permisos y rutas. |

## En este repositorio

- [skill-troubleshooter](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/SKILL.md): una skill que ejecuta estas revisiones y sigue esta guía ([references/troubleshooting.md](../../../plugins/agent-skills-starter/skills/skill-troubleshooter/references/troubleshooting.md)) por ti.
- [check.sh](../../../.claude/skills/verify/scripts/check.sh) ejecuta ambos validadores en tu computadora. En la CI, en cada pull request, ejecuta `check-skills.js`; `claude plugin validate` solo se ejecuta donde está instalada la CLI `claude`.

## Resumen

- [ ] Empieza con `claude plugin validate .claude/skills` (o `~/.claude/skills`).
- [ ] No se activa → la descripción. No se carga → ruta, nombre del archivo, YAML.
- [ ] Skill incorrecta → descripciones distintas. Eclipsada → cambia el nombre.
- [ ] Faltan skills del plugin → `/plugin` (Installed, Errors) y `/reload-plugins`.
- [ ] Errores al ejecutarse → dependencias, `chmod +x`, barras normales.

---

[← Compartir skills](05-sharing-skills.md) | [Volver al índice del curso](README.md)
