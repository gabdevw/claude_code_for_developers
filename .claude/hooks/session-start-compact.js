#!/usr/bin/env node
// SessionStart hook (matcher: compact) — restore key state right after compaction.
// Hook SessionStart (matcher: compact) — restaura el estado clave justo después de compactar.
//
// Compaction summarizes the conversation and loses detail. Whatever this hook
// prints to stdout is added to Claude's context, so we print the rules that must
// survive and the notes in .claude/state/current-task.md (a gitignored file).
//
// La compactación resume la conversación y pierde detalle. Lo que este hook
// imprime en stdout se agrega al contexto de Claude, así que imprimimos las reglas
// que deben sobrevivir y las notas de .claude/state/current-task.md (ignorado por git).
'use strict';

const fs = require('fs');
const path = require('path');
const { readHookInput, projectDir } = require('./lib/read-input');

readHookInput().then((input) => {
  const stateFile = path.join(projectDir(input), '.claude', 'state', 'current-task.md');
  const lines = [
    'Context restored after compaction:',
    '- Every page must exist in English and Spanish (docs/en <-> docs/es).',
    '- Run /verify before saying a task is done.',
  ];

  if (fs.existsSync(stateFile)) {
    lines.push('', 'Current task notes (.claude/state/current-task.md):', fs.readFileSync(stateFile, 'utf8').trim());
  } else {
    lines.push('- No task notes yet. On long tasks, write the goal, decisions and next steps in .claude/state/current-task.md.');
  }

  process.stdout.write(lines.join('\n') + '\n');
});
