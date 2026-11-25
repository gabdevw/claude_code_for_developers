#!/usr/bin/env bash
# Runs every check for this repository. Used by the /verify skill and by CI.
# Ejecuta todas las verificaciones del repositorio. Lo usan la skill /verify y la CI.
#
# Requires: bash (Git Bash on Windows) and Node.js 18+.
# Requiere: bash (Git Bash en Windows) y Node.js 18+.
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$ROOT" || exit 1
failed=0

run() {
  local title="$1"
  shift
  printf '\n==> %s\n' "$title"
  if "$@"; then
    echo "OK"
  else
    echo "FAILED: $title"
    failed=1
  fi
}

check_js_syntax() {
  local status=0
  for file in .claude/hooks/*.js .claude/hooks/lib/*.js scripts/*.js; do
    [ -e "$file" ] || continue
    node --check "$file" || status=1
  done
  return $status
}

check_settings_json() {
  node -e "JSON.parse(require('fs').readFileSync('.claude/settings.json', 'utf8'))"
}

check_skill_descriptions() {
  local status=0
  for file in .claude/skills/*/SKILL.md; do
    [ -e "$file" ] || continue
    grep -q '^description:' "$file" || { echo "Missing description: $file"; status=1; }
  done
  return $status
}

run "Every page exists in English and Spanish" node scripts/bilingual.js
run "Relative links work" node scripts/check-links.js
run "No secrets in files" node scripts/check-secrets.js
run "JavaScript syntax" check_js_syntax
run ".claude/settings.json is valid JSON" check_settings_json
run "Every skill has a description" check_skill_descriptions

echo
if [ "$failed" -eq 0 ]; then
  echo "All checks passed. / Todas las verificaciones pasaron."
else
  echo "Some checks failed. / Algunas verificaciones fallaron."
fi
exit "$failed"
