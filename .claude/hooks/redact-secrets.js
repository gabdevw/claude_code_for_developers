#!/usr/bin/env node
// PreToolUse hook (matcher: Bash) — redact instead of block.
// Hook PreToolUse (matcher: Bash) — redactar en lugar de bloquear.
//
// If Claude writes a real-looking secret inside a Bash command, this hook:
//   1. replaces the secret with REDACTED (updatedInput), and
//   2. asks you before running it (permissionDecision: "ask").
// The redacted command will fail on purpose: real keys should come from
// environment variables, e.g.  curl ... -u "$STRIPE_KEY:"
//
// Si Claude escribe un secreto con apariencia real en un comando Bash, este hook:
//   1. reemplaza el secreto por REDACTED (updatedInput), y
//   2. te pregunta antes de ejecutarlo (permissionDecision: "ask").
// El comando redactado fallará a propósito: las claves reales deben venir de
// variables de entorno, por ejemplo  curl ... -u "$STRIPE_KEY:"
'use strict';

const { readHookInput } = require('./lib/read-input');
const { redactSecrets } = require('./lib/secret-patterns');

readHookInput().then((input) => {
  const toolInput = input.tool_input || {};
  if (typeof toolInput.command !== 'string') return;

  const { text, found } = redactSecrets(toolInput.command);
  if (found.length === 0) return; // Nothing to do: exit 0, the command runs normally.

  const output = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason:
        `The command contained a secret (${found.join(', ')}). It was replaced with REDACTED. ` +
        'Use an environment variable such as $STRIPE_KEY instead of writing the key.',
      updatedInput: { ...toolInput, command: text },
    },
  };
  process.stdout.write(JSON.stringify(output));
});
