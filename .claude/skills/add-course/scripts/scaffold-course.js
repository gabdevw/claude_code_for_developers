#!/usr/bin/env node
// Creates the bilingual skeleton of a new course: docs/{en,es}/<course>/README.md and one page per chapter.
// Crea el esqueleto bilingüe de un curso nuevo: docs/{en,es}/<curso>/README.md y una página por capítulo.
//
// Usage / Uso:
//   node scaffold-course.js <course-slug> <chapter-slug> [<chapter-slug>...] [--root <dir>]
//   node scaffold-course.js introduction-to-agent-skills what-are-skills creating-a-skill
//
// - Chapters are numbered in the given order: 01-what-are-skills.md, 02-creating-a-skill.md...
// - Fills language links, numbers and previous/next navigation.
// - Leaves {{TODO: ...}} markers for the text. check.sh fails while any marker is left in docs/.
// - Never overwrites an existing file.
'use strict';

const fs = require('fs');
const path = require('path');

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ASSETS = path.join(__dirname, '..', 'assets');
const LABELS = {
  en: { index: 'Course index', next: 'Next', back: 'Back to the course index' },
  es: { index: 'Índice del curso', next: 'Siguiente', back: 'Volver al índice del curso' },
};
const TITLE = { en: '{{TODO: Chapter title}}', es: '{{TODO: Título del capítulo}}' };
const CELLS = {
  en: '{{TODO: one line}} | {{TODO: link to the example, or —}}',
  es: '{{TODO: una línea}} | {{TODO: enlace al ejemplo, o —}}',
};

function fail(message) {
  console.error(message);
  console.error('Usage: node scaffold-course.js <course-slug> <chapter-slug> [<chapter-slug>...] [--root <dir>]');
  process.exit(1);
}

const args = process.argv.slice(2);
let root = path.resolve(__dirname, '..', '..', '..', '..');
const rootFlag = args.indexOf('--root');
if (rootFlag !== -1) {
  root = path.resolve(args[rootFlag + 1] || fail('--root needs a directory'));
  args.splice(rootFlag, 2);
}

const [course, ...chapters] = args;
if (!course || chapters.length === 0) fail('Give a course slug and at least one chapter slug.');
for (const slug of [course, ...chapters]) {
  if (!SLUG.test(slug)) fail(`Invalid slug "${slug}": use lowercase English words joined with hyphens.`);
}

const files = chapters.map((chapter, i) => `${String(i + 1).padStart(2, '0')}-${chapter}.md`);

function fill(template, values) {
  return template.replace(/\{\{(slug|file|n|nav|rows)\}\}/g, (_, key) => values[key]);
}

function nav(lang, i) {
  const l = LABELS[lang];
  const prev = i === 0 ? `[← ${l.index}](README.md)` : `[← ${TITLE[lang]}](${files[i - 1]})`;
  const next = i === files.length - 1 ? `[${l.back}](README.md)` : `${l.next}: [${TITLE[lang]} →](${files[i + 1]})`;
  return `${prev} | ${next}`;
}

const created = [];
const skipped = [];

function write(rel, content) {
  const full = path.join(root, rel);
  if (fs.existsSync(full)) return skipped.push(rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
  created.push(rel);
}

for (const lang of ['en', 'es']) {
  const dir = `docs/${lang}/${course}`;
  const readme = fs.readFileSync(path.join(ASSETS, `course-readme.${lang}.md`), 'utf8');
  const lesson = fs.readFileSync(path.join(ASSETS, `lesson.${lang}.md`), 'utf8');
  const rows = files
    .map((file, i) => `| ${i + 1} | [${TITLE[lang]}](${file}) | ${CELLS[lang]} |`)
    .join('\n');

  write(`${dir}/README.md`, fill(readme, { slug: course, rows }));
  files.forEach((file, i) => {
    write(`${dir}/${file}`, fill(lesson, { slug: course, file, n: String(i + 1), nav: nav(lang, i) }));
  });
}

console.log(`Created ${created.length} file(s):`);
for (const rel of created) console.log(`  + ${rel}`);
if (skipped.length) {
  console.log(`Skipped ${skipped.length} existing file(s):`);
  for (const rel of skipped) console.log(`  = ${rel}`);
}
console.log('Next: replace every {{TODO: ...}} marker, then run the verify checks.');
