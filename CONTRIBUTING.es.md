[English](CONTRIBUTING.md) | **Español**

# Cómo contribuir

¡Gracias por ayudar! Este repositorio crece con cada curso y ejemplo que la gente agrega.

## Formas de ayudar

- Corregir un error o una explicación poco clara.
- Traducir una página que solo existe en un idioma.
- Agregar las notas de un curso nuevo.
- Agregar un ejemplo que funcione (hook, skill, flujo de trabajo, configuración).

¿No sabes por dónde empezar? Abre primero un issue, usando una de las plantillas de issues.

## Reglas para cada cambio

1. **Ambos idiomas.** Cada página existe en `docs/en/` y `docs/es/` con el mismo nombre de archivo. Si solo escribes un idioma, dilo en el pull request y alguien puede ayudar con la traducción.
2. **Palabras sencillas.** Frases cortas. Explica los términos técnicos la primera vez que aparecen. Usa ejemplos.
3. **Ejemplos que funcionen.** Los comandos y la configuración deben ser correctos y completos.
4. **Sin secretos.** Usa marcadores como `sk_live_...` o variables de entorno como `$STRIPE_KEY`.
5. **Enlaces relativos** entre páginas.

La lista completa está en [.claude/skills/verify/reference.md](.claude/skills/verify/reference.md).

## Agregar un curso nuevo

Con Claude Code:

```text
/add-course <nombre del curso>
```

A mano:

1. Elige un slug en inglés, en minúsculas y con guiones: `my-course-name`.
2. Copia [templates/en/course-readme.md](templates/en/course-readme.md) a `docs/en/<slug>/README.md` y [templates/es/course-readme.md](templates/es/course-readme.md) a `docs/es/<slug>/README.md`.
3. Agrega una página por tema, `01-topic.md`, `02-topic.md`… desde las plantillas `lesson.md`.
4. Agrega el curso a `README.md`, `README.es.md`, `docs/en/README.md` y `docs/es/README.md`.
5. Agrega una entrada en [CHANGELOG.md](CHANGELOG.md).

## Antes de abrir un pull request

Ejecuta las verificaciones (o `/verify` dentro de Claude Code):

```bash
bash .claude/skills/verify/scripts/check.sh
```

Las mismas verificaciones se ejecutan automáticamente en cada pull request.

## Mensajes de commit

Cortos y en imperativo. Escríbelos en inglés para mantener un historial uniforme: `Add hooks chapter`, `Fix link in skills page`.
