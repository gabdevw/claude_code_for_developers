[English](../../en/claude-code-in-action/06-github-actions-code-review.md) | **Español**

# 6. GitHub Actions y Code Review

> **En una línea:** lleva a Claude a tus pull requests, administrado por Anthropic o ejecutándose en tus propias GitHub Actions.

## Dos formas de hacerlo

| | **Code Review** (camino administrado) | **GitHub Actions** (tu propio flujo) |
|---|---|---|
| Qué hace | Revisa pull requests automáticamente | Hace tareas cuando alguien escribe `@claude` |
| Quién lo configura | Un Owner de tu organización de Claude | Cualquiera con acceso de administrador al repositorio |
| Dónde se ejecuta | En la infraestructura de Anthropic | En los runners de tus GitHub Actions |
| Planes | Team y Enterprise | Cualquiera, con una clave de API |

## El camino administrado: Code Review

### Configuración

1. Un **Owner** de tu organización de Claude lo habilita desde la configuración de administrador de Claude Code. Hay una sección **Code review** con un interruptor **Allow code review** que inicia la configuración.
2. Desde ahí, el Owner instala la **app de Claude para GitHub**, elige qué repositorios observa y decide cuándo se ejecuta.
3. Si el Owner no es también propietario de la organización de GitHub, alguien con ese acceso debe instalar y vincular la app primero.

### Cuándo se ejecuta

Tienes algunas opciones de temporización para cada repositorio:

- **Una vez**, cuando se abre un pull request.
- **En cada push** al pull request.
- **Solo a pedido**, cuando alguien comenta `@claude review`.

### Qué obtienes

Una vez activado, todo se ejecuta en la infraestructura de Anthropic. Un conjunto de agentes de revisión analiza el diff **contra todo tu código base**, no solo las líneas cambiadas de forma aislada. Luego:

- Cada hallazgo llega como un **comentario de Claude, justo en la línea**, con una explicación clara y una corrección sugerida.
- Los hallazgos van **etiquetados por severidad**.
- Aparece una **tabla resumen** en el check run.

Lo bueno es que **elimina duplicados y clasifica los hallazgos**. Así que en lugar de un muro de nimiedades, lees un puñado de problemas reales que merecen tu atención.

### Ajústalo

Code Review sigue tu `CLAUDE.md` y también un archivo **`REVIEW.md`** con indicaciones solo para las revisiones: en qué enfocarse y qué omitir. Se lee desde la rama principal. Ejemplo: [REVIEW.md](../../../REVIEW.md).

> **Importante:** Code Review está disponible en los planes **Team** y **Enterprise**.

## Tu propio camino: GitHub Actions

Con la acción oficial [`anthropics/claude-code-action`](https://github.com/anthropics/claude-code-action), Claude se ejecuta dentro de tus flujos de GitHub. Cualquiera puede mencionar a `@claude` en un issue o en un comentario de un pull request:

```text
@claude corrige el error de tipeo en el README y abre un pull request
@claude ¿por qué falla esta prueba?
```

### Configuración rápida

Dentro de Claude Code, ejecuta:

```text
/install-github-app
```

Te guía para instalar la app de Claude para GitHub, guardar tu clave de API como secreto y crear el flujo de trabajo. (Funciona con repositorios en github.com.)

### Configuración manual

1. Instala la app de Claude para GitHub en tu repositorio.
2. Agrega tu clave de API como secreto del repositorio con el nombre `ANTHROPIC_API_KEY` (*Settings → Secrets and variables → Actions*). **Nunca escribas la clave en el archivo del flujo de trabajo.**
3. Agrega el flujo de trabajo:

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Consejo: Claude también lee tu `CLAUDE.md` dentro de GitHub Actions, así que las reglas de tu proyecto aplican ahí.

### En este repositorio

- [.github/workflows/claude.yml](../../../.github/workflows/claude.yml): responde a las menciones de `@claude`.
- [.github/workflows/checks.yml](../../../.github/workflows/checks.yml): ejecuta las mismas verificaciones que la skill `/verify` en cada pull request. Así, la misma verificación corre en tu computadora y en la CI.

## Resumen

- [ ] **Code Review** (Team/Enterprise): un Owner lo habilita; revisa pull requests en la infraestructura de Anthropic, con comentarios en línea por severidad y una tabla resumen.
- [ ] Elige cuándo se ejecuta: al abrir el PR, en cada push o con `@claude review`.
- [ ] Ajústalo con `CLAUDE.md` y `REVIEW.md`.
- [ ] **GitHub Actions** (cualquier plan): `/install-github-app`, el secreto `ANTHROPIC_API_KEY` y `@claude` en los comentarios.
- [ ] Nunca escribas claves en los archivos de flujo de trabajo: usa los secretos del repositorio.

---

[← 5. Tareas programadas](05-scheduled-tasks.md) | [Volver al índice del curso](README.md)
