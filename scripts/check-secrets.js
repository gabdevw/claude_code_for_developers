#!/usr/bin/env node
// Looks for real-looking secrets in the repository files.
// Busca secretos con apariencia real en los archivos del repositorio.
//
// Uses the same patterns as the hooks (.claude/hooks/lib/secret-patterns.js),
// so there is a single list to maintain.
'use strict';

const fs = require('fs');
const path = require('path');
const { findSecrets } = require('../.claude/hooks/lib/secret-patterns');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'worktrees', 'state']);
// Local, gitignored files are SUPPOSED to hold secrets. / Los archivos locales ignorados SÍ deben guardar secretos.
const SKIP_FILES = /^(\.env(\..+)?|settings\.local\.json|CLAUDE\.local\.md)$/;
const MAX_SIZE = 1024 * 1024;

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : files(full);
    if (SKIP_FILES.test(entry.name) && entry.name !== '.env.example') return [];
    return [full];
  });
}

const hits = [];
for (const file of files(ROOT)) {
  if (fs.statSync(file).size > MAX_SIZE) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('\u0000')) continue; // binary file / archivo binario
  const found = findSecrets(text);
  if (found.length) hits.push(`${path.relative(ROOT, file)} (${found.join(', ')})`);
}

if (hits.length === 0) {
  console.log('No secrets found.');
  process.exit(0);
}
console.error('Possible secrets / Posibles secretos:');
for (const hit of hits) console.error(`  - ${hit}`);
process.exit(1);
