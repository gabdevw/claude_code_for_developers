#!/usr/bin/env node
// Checks that every page exists in English AND Spanish.
// Comprueba que cada página exista en inglés Y en español.
//
// Rules / Reglas:
//   docs/en/<path>      <->  docs/es/<path>
//   templates/en/<path> <->  templates/es/<path>
//   <NAME>.md           <->  <NAME>.es.md   (only for ROOT_PAIRS / solo para ROOT_PAIRS)
//   plugins/<p>/README.md <-> plugins/<p>/README.es.md
//
// Used by: the /verify skill, the Stop hook, the PostToolUse hook and CI.
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_PAIRS = ['README', 'CONTRIBUTING', 'CODE_OF_CONDUCT'];
const MIRRORED_DIRS = ['docs', 'templates'];

function listFiles(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(full, base);
    return [path.relative(base, full).split(path.sep).join('/')];
  });
}

/** Returns the list of missing translation files (relative paths). */
function findMissingTranslations(root) {
  const missing = [];

  const pairs = ROOT_PAIRS.map((name) => [`${name}.md`, `${name}.es.md`]);
  const pluginsDir = path.join(root, 'plugins');
  if (fs.existsSync(pluginsDir)) {
    for (const entry of fs.readdirSync(pluginsDir, { withFileTypes: true })) {
      if (entry.isDirectory()) pairs.push([`plugins/${entry.name}/README.md`, `plugins/${entry.name}/README.es.md`]);
    }
  }

  for (const [en, es] of pairs) {
    const hasEn = fs.existsSync(path.join(root, en));
    const hasEs = fs.existsSync(path.join(root, es));
    if (hasEn && !hasEs) missing.push(es);
    if (hasEs && !hasEn) missing.push(en);
  }

  for (const dir of MIRRORED_DIRS) {
    const en = new Set(listFiles(path.join(root, dir, 'en')));
    const es = new Set(listFiles(path.join(root, dir, 'es')));
    for (const file of en) if (!es.has(file)) missing.push(`${dir}/es/${file}`);
    for (const file of es) if (!en.has(file)) missing.push(`${dir}/en/${file}`);
  }

  return missing;
}

/** Given a relative path, returns the path of its translation, or null. */
function counterpartOf(relPath) {
  const p = relPath.split(path.sep).join('/');
  const match = p.match(/^(docs|templates)\/(en|es)\/(.+)$/);
  if (match) return `${match[1]}/${match[2] === 'en' ? 'es' : 'en'}/${match[3]}`;
  const plugin = p.match(/^(plugins\/[^/]+\/README)(\.es)?\.md$/);
  if (plugin) return plugin[2] ? `${plugin[1]}.md` : `${plugin[1]}.es.md`;
  for (const name of ROOT_PAIRS) {
    if (p === `${name}.md`) return `${name}.es.md`;
    if (p === `${name}.es.md`) return `${name}.md`;
  }
  return null;
}

module.exports = { findMissingTranslations, counterpartOf };

if (require.main === module) {
  const root = path.resolve(__dirname, '..');
  const missing = findMissingTranslations(root);
  if (missing.length === 0) {
    console.log('Every page exists in both languages.');
    process.exit(0);
  }
  console.error('Missing translations / Traducciones faltantes:');
  for (const file of missing) console.error(`  - ${file}`);
  process.exit(1);
}
