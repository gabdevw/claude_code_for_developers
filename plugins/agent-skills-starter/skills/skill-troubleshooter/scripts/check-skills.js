#!/usr/bin/env node
// Checks the structure of Claude Code skills and reports common problems.
// Revisa la estructura de las skills de Claude Code y reporta los problemas comunes.
//
// Usage / Uso:
//   node check-skills.js [skills-dir ...]
//   (default: .claude/skills in the current folder and ~/.claude/skills)
//
// Errors (exit 1): SKILL.md outside a named folder, wrong file name case, frontmatter that
//   can't be read, `name` different from the folder, links to files that don't exist,
//   {{TODO: ...}} markers left by a template.
// Warnings: missing or weak description, open-standard limits (name format, 1024-char
//   description), more than 500 lines, scripts without execute permission, backslashes
//   in paths, the same skill name in several folders.
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const dirs = process.argv.slice(2);
if (dirs.length === 0) {
  dirs.push(path.join(process.cwd(), '.claude', 'skills'), path.join(os.homedir(), '.claude', 'skills'));
}

const errors = [];
const warnings = [];
const seen = new Map(); // skill name -> folders where it appears

function parseFrontmatter(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  if (lines[0] !== '---') return null;
  const end = lines.indexOf('---', 1);
  if (end === -1) return null;
  const fields = {};
  let current = null;
  for (const line of lines.slice(1, end)) {
    const match = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (match) {
      current = match[1];
      fields[current] = /^[>|][-+]?$/.test(match[2]) ? '' : match[2].replace(/^["']|["']$/g, '');
    } else if (current && /^\s+\S/.test(line)) {
      fields[current] = `${fields[current]} ${line.trim()}`.trim();
    } else if (line.trim() !== '') {
      return null;
    }
  }
  return { fields, body: lines.slice(end + 1).join('\n') };
}

function checkSkill(skillDir, file) {
  const where = path.relative(process.cwd(), file) || file;
  const folder = path.basename(skillDir);
  const text = fs.readFileSync(file, 'utf8');
  const parsed = parseFrontmatter(text);
  if (!parsed) {
    errors.push(`${where}: the frontmatter can't be read. It must start and end with a line containing only "---".`);
    return;
  }
  const { fields, body } = parsed;
  const name = fields.name || folder;
  seen.set(name, [...(seen.get(name) || []), where]);

  if (fields.name && fields.name !== folder) {
    errors.push(`${where}: name "${fields.name}" doesn't match its folder "${folder}".`);
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) {
    warnings.push(`${where}: "${name}" breaks the open-standard name rule (lowercase letters, numbers and single hyphens, max 64). Required to upload to claude.ai or the API.`);
  }

  const description = fields.description || '';
  if (!description) {
    warnings.push(`${where}: no description. Claude uses it to decide when to use the skill.`);
  } else {
    if (description.length > 1024) {
      warnings.push(`${where}: description has ${description.length} characters; the open standard allows 1024.`);
    }
    if (!/(^|[^\wá-ú])(use|úsala|úsalo|usar)\b/i.test(description)) {
      warnings.push(`${where}: the description says what the skill does but not WHEN to use it. Add "Use when ...".`);
    }
  }

  // Markers inside `code` are explanations, not leftovers. / Los marcadores dentro de `código` son explicaciones.
  if (text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '').includes('{{TODO')) {
    errors.push(`${where}: unfinished skill: replace every {{TODO: ...}} marker.`);
  }

  const lineCount = text.split('\n').length;
  if (lineCount > 500) {
    warnings.push(`${where}: ${lineCount} lines. Keep SKILL.md under 500 and move details to references/.`);
  }

  const code = body.replace(/```[\s\S]*?```/g, '');
  for (const [, target] of code.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    if (target.includes('\\')) warnings.push(`${where}: link "${target}" uses backslashes. Use forward slashes.`);
    if (!fs.existsSync(path.resolve(skillDir, target.split('#')[0]))) {
      errors.push(`${where}: link "${target}" points to a file that doesn't exist.`);
    }
  }
  if (/\b(scripts|references|assets)\\/.test(body)) {
    warnings.push(`${where}: a path uses backslashes. Use forward slashes, even on Windows.`);
  }

  const scripts = path.join(skillDir, 'scripts');
  if (process.platform !== 'win32' && fs.existsSync(scripts)) {
    for (const entry of fs.readdirSync(scripts)) {
      const full = path.join(scripts, entry);
      if (/\.(sh|py|rb)$/.test(entry) && !(fs.statSync(full).mode & 0o111)) {
        warnings.push(`${path.relative(process.cwd(), full)}: not executable. Run: chmod +x "${full}"`);
      }
    }
  }
}

function checkDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.toLowerCase() === 'skill.md') {
      errors.push(`${full}: SKILL.md must be inside a named folder, like ${path.join(dir, 'my-skill', 'SKILL.md')}.`);
    }
    if (!entry.isDirectory()) continue;
    const files = fs.readdirSync(full);
    const exact = files.includes('SKILL.md');
    const wrongCase = files.find((f) => f.toLowerCase() === 'skill.md' && f !== 'SKILL.md');
    if (wrongCase) errors.push(`${path.join(full, wrongCase)}: the file must be named exactly SKILL.md.`);
    if (exact) checkSkill(full, path.join(full, 'SKILL.md'));
    else if (!wrongCase) warnings.push(`${full}: folder without SKILL.md, so it is not a skill.`);
  }
}

dirs.forEach(checkDir);

for (const [name, places] of seen) {
  if (places.length > 1) {
    warnings.push(`Skill "${name}" exists in several places: ${places.join(', ')}. Priority: enterprise > personal > project. Rename one to avoid conflicts.`);
  }
}

console.log(`Checked: ${dirs.join(', ')}`);
for (const message of errors) console.log(`ERROR    ${message}`);
for (const message of warnings) console.log(`WARNING  ${message}`);
console.log(`${seen.size} skill(s), ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
