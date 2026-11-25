#!/usr/bin/env node
// UserPromptSubmit hook — stop secrets before they reach the model.
// Hook UserPromptSubmit — detiene los secretos antes de que lleguen al modelo.
//
// Runs when you send a prompt, BEFORE Claude reads it. If the prompt contains
// a real-looking secret, the prompt is blocked and erased, and you see why.
//
// Se ejecuta cuando envías un prompt, ANTES de que Claude lo lea. Si el prompt
// contiene un secreto con apariencia real, se bloquea y se borra, y ves el motivo.
'use strict';

const { readHookInput } = require('./lib/read-input');
const { findSecrets } = require('./lib/secret-patterns');

readHookInput().then((input) => {
  const found = findSecrets(input.prompt || '');
  if (found.length === 0) return;

  const output = {
    decision: 'block',
    reason:
      `Your prompt looks like it contains a secret (${found.join(', ')}), so it was not sent to Claude. ` +
      'Save it in .env and refer to it by name, for example $STRIPE_KEY. / ' +
      `Tu prompt parece contener un secreto (${found.join(', ')}), así que no se envió a Claude. ` +
      'Guárdalo en .env y refiérete a él por su nombre, por ejemplo $STRIPE_KEY.',
  };
  process.stdout.write(JSON.stringify(output));
});
