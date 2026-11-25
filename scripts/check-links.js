#!/usr/bin/env node
// Checks that relative links in Markdown files point to files that exist.
// Comprueba que los enlaces relativos en los archivos Markdown apunten a archivos que existen.
//
// templates/ is skipped on purpose: its links contain placeholders like <course-slug>.
// templates/ se omite a propósito: sus enlaces tienen marcadores como <course-slug>.
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['.git', 'node_modules', 'templates', 'worktrees', 'state']);
const LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

function markdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : markdownFiles(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

function withoutCode(text) {
  return text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
}

const broken = [];
for (const file of markdownFiles(ROOT)) {
  const text = withoutCode(fs.readFileSync(file, 'utf8'));
  for (const [, target] of text.matchAll(LINK)) {
    if (/^(https?:|mailto:|#|<)/.test(target)) continue;
    const clean = decodeURI(target.split('#')[0]);
    if (!clean) continue;
    if (!fs.existsSync(path.resolve(path.dirname(file), clean))) {
      broken.push(`${path.relative(ROOT, file)} -> ${target}`);
    }
  }
}

if (broken.length === 0) {
  console.log('All relative links work.');
  process.exit(0);
}
console.error('Broken links / Enlaces rotos:');
for (const item of broken) console.error(`  - ${item}`);
process.exit(1);
