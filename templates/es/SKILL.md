---
name: <nombre-de-la-skill>
description: <Qué hace la skill>. Úsala cuando <las situaciones en las que Claude debe usarla>.
---

# <Título de la skill>

1. <Primer paso. Sé específico: nombra archivos, comandos y resultados esperados.>
2. Ejecuta `bash .claude/skills/<nombre-de-la-skill>/scripts/<script>.sh` y lee su resultado.
3. <Qué hacer si algo falla.>
4. <Qué informar al final.>

Para más detalles, mira [reference.md](reference.md).

<!-- Guárdala como .claude/skills/<nombre-de-la-skill>/SKILL.md (proyecto) o ~/.claude/skills/<nombre-de-la-skill>/SKILL.md (personal).
Agrega `disable-model-invocation: true` al frontmatter si solo tú debes iniciarla (por ejemplo, un despliegue). -->
