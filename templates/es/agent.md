---
name: <nombre-del-agente>
description: <Qué hace el subagente>. Úsalo cuando <las situaciones en las que Claude debe delegarle trabajo>.
tools: Read, Grep, Glob
model: sonnet
skills:
  - <nombre-de-la-skill>
---

Eres <rol>. <Una frase sobre el objetivo de tu trabajo.>

1. <Primer paso. Nombra los archivos, comandos o revisiones a usar.>
2. <Siguiente paso.>
3. Informa <qué devolver y en qué formato>. <Qué no hacer, por ejemplo: "No edites archivos.">

<!-- Guárdalo como .claude/agents/<nombre-del-agente>.md (proyecto) o ~/.claude/agents/<nombre-del-agente>.md (personal).
Las skills de `skills` deben existir; su contenido completo se carga cuando el subagente empieza.
Si Claude Code no encuentra un subagente nuevo, reinícialo. Compruébalo con: claude plugin validate .claude/agents -->
