#!/usr/bin/env node
// Creates a new skill folder with a SKILL.md from the template.
// Crea la carpeta de una skill nueva con un SKILL.md desde la plantilla.
//
// Usage / Uso:
//   node new-skill.js <skill-name> [--dir <skills-folder>]
//   node new-skill.js release-notes --dir .claude/skills
//   node new-skill.js release-notes --dir ~/.claude/skills
//
// - Checks the name: lowercase letters, numbers and single hyphens, max 64 characters.
// - Never overwrites an existing skill.
// - Warns when the same name exists at another level (enterprise > personal > project).
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

function fail(message) {
  console.error(message);
  console.error('Usage: node new-skill.js <skill-name> [--dir <skills-folder>]');
  process.exit(1);
}

const args = process.argv.slice(2);
let dir = path.join(process.cwd(), '.claude', 'skills');
const dirFlag = args.indexOf('--dir');
if (dirFlag !== -1) {
  const value = args[dirFlag + 1] || fail('--dir needs a folder');
  dir = path.resolve(value.replace(/^~(?=$|[\\/])/, os.homedir()));
  args.splice(dirFlag, 2);
}

const name = args[0];
if (!name) fail('Give the skill name.');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) {
  fail(`Invalid name "${name}": use lowercase letters, numbers and single hyphens (max 64), e.g. "release-notes".`);
}

const target = path.join(dir, name);
if (fs.existsSync(target)) fail(`${target} already exists. Choose another name or edit that skill.`);

const otherLevels = [path.join(process.cwd(), '.claude', 'skills'), path.join(os.homedir(), '.claude', 'skills')]
  .filter((level) => path.resolve(level) !== path.resolve(dir))
  .map((level) => path.join(level, name))
  .filter((candidate) => fs.existsSync(candidate));

const title = name
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
const template = fs.readFileSync(path.join(__dirname, '..', 'assets', 'SKILL.template.md'), 'utf8');

fs.mkdirSync(target, { recursive: true });
fs.writeFileSync(path.join(target, 'SKILL.md'), template.replace(/\{\{name\}\}/g, name).replace(/\{\{title\}\}/g, title));

console.log(`Created ${path.join(target, 'SKILL.md')}`);
for (const other of otherLevels) {
  console.log(`WARNING: a skill named "${name}" also exists in ${other}. Priority: enterprise > personal > project. Consider a more specific name.`);
}
console.log('Next: replace every {{TODO: ...}} marker, then validate with: claude plugin validate ' + dir.split(path.sep).join('/'));
