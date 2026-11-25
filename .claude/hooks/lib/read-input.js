// Reads the JSON that Claude Code sends to every hook on stdin.
// Lee el JSON que Claude Code envía a cada hook por stdin.
'use strict';

function readHookInput() {
  return new Promise((resolve) => {
    let raw = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => (raw += chunk));
    process.stdin.on('end', () => {
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve({}); // Bad input never crashes a hook. / Una entrada inválida nunca rompe un hook.
      }
    });
  });
}

function projectDir(input = {}) {
  return process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
}

module.exports = { readHookInput, projectDir };
