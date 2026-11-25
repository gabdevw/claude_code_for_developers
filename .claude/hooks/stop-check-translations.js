#!/usr/bin/env node
// Stop hook — do not let Claude finish while a page exists in only one language.
// Hook Stop — no deja que Claude termine mientras una página exista en un solo idioma.
//
// When Claude is about to end its turn, this hook runs the bilingual check.
// If something is missing, it blocks the stop and tells Claude what to create.
// `stop_hook_active` is true when Claude is already continuing because of this
// hook: we let it stop then, to avoid an endless loop.
//
// Cuando Claude va a terminar su turno, este hook ejecuta la verificación bilingüe.
// Si falta algo, bloquea el final y le dice a Claude qué crear.
// `stop_hook_active` es true cuando Claude ya está continuando por este hook:
// en ese caso lo dejamos terminar, para evitar un ciclo infinito.
'use strict';

const { readHookInput, projectDir } = require('./lib/read-input');
const { findMissingTranslations } = require('../../scripts/bilingual');

readHookInput().then((input) => {
  if (input.stop_hook_active) return;

  const missing = findMissingTranslations(projectDir(input));
  if (missing.length === 0) return;

  const output = {
    decision: 'block',
    reason:
      'Some pages exist in only one language. Create these translations before finishing:\n' +
      missing.map((file) => `- ${file}`).join('\n'),
  };
  process.stdout.write(JSON.stringify(output));
});
