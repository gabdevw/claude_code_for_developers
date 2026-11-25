// Patterns for common secrets. Add your own here: every hook and check uses this list.
// Patrones de secretos comunes. Agrega los tuyos aquí: todos los hooks y verificaciones usan esta lista.
'use strict';

const SECRET_PATTERNS = [
  { name: 'Stripe key', regex: /\b[sr]k_(?:live|test)_[A-Za-z0-9]{10,}/g },
  { name: 'Anthropic API key', regex: /\bsk-ant-[A-Za-z0-9_-]{10,}/g },
  { name: 'GitHub token', regex: /\bgh[pousr]_[A-Za-z0-9]{20,}/g },
  { name: 'AWS access key', regex: /\bAKIA[0-9A-Z]{16}\b/g },
];

/** Returns the names of the secret types found in the text. */
function findSecrets(text) {
  return SECRET_PATTERNS.filter((p) => new RegExp(p.regex.source).test(text)).map((p) => p.name);
}

/** Replaces every secret with REDACTED. Returns the new text and what was found. */
function redactSecrets(text) {
  const found = new Set();
  let result = text;
  for (const p of SECRET_PATTERNS) {
    result = result.replace(p.regex, () => {
      found.add(p.name);
      return 'REDACTED';
    });
  }
  return { text: result, found: [...found] };
}

module.exports = { SECRET_PATTERNS, findSecrets, redactSecrets };
