#!/usr/bin/env node
// PostToolUse hook (matcher: Edit|Write) — remind Claude to update the other language.
// Hook PostToolUse (matcher: Edit|Write) — recuerda a Claude actualizar el otro idioma.
//
// After Claude edits a bilingual page, this hook adds a short note to Claude's
// context naming the translation file to update.
//
// Después de que Claude edita una página bilingüe, este hook agrega una nota corta
// al contexto de Claude con el archivo de traducción que debe actualizar.
'use strict';

const fs = require('fs');
const path = require('path');
const { readHookInput, projectDir } = require('./lib/read-input');
const { counterpartOf } = require('../../scripts/bilingual');

readHookInput().then((input) => {
  const filePath = input.tool_input && input.tool_input.file_path;
  if (typeof filePath !== 'string') return;

  const root = projectDir(input);
  const rel = path.relative(root, path.resolve(root, filePath)).split(path.sep).join('/');
  if (rel.startsWith('..')) return;

  const other = counterpartOf(rel);
  if (!other) return;

  const message = fs.existsSync(path.join(root, other))
    ? `You edited ${rel}. If the meaning changed, make the same change in its translation ${other}.`
    : `You edited ${rel}. Its translation ${other} does not exist yet: create it in the same change.`;

  const output = {
    hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: message },
  };
  process.stdout.write(JSON.stringify(output));
});
