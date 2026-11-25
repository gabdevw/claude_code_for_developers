#!/usr/bin/env bash
# Runs every check for this repository. Used by the /verify skill, the docs-reviewer subagent and CI.
# Ejecuta todas las verificaciones del repositorio. Lo usan la skill /verify, el subagente docs-reviewer y la CI.
#
# Requires: bash (Git Bash on Windows) and Node.js 18+. The `claude` CLI is optional.
# Requiere: bash (Git Bash en Windows) y Node.js 18+. La CLI `claude` es opcional.
set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$ROOT" || exit 1
failed=0
SKILL_CHECKER="plugins/agent-skills-starter/skills/skill-troubleshooter/scripts/check-skills.js"

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
  while IFS= read -r file; do
    node --check "$file" || status=1
  done < <(find .claude scripts plugins -name '*.js' -not -path '*/node_modules/*' 2>/dev/null)
  return $status
}

check_json() {
  local status=0
  for file in .claude/settings.json .claude-plugin/marketplace.json plugins/*/.claude-plugin/plugin.json; do
    [ -e "$file" ] || continue
    node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$file" || { echo "Invalid JSON: $file"; status=1; }
  done
  return $status
}

check_skills() {
  node "$SKILL_CHECKER" .claude/skills plugins/*/skills
}

check_no_todo_markers() {
  if grep -rn '{{TODO' docs; then
    echo "Replace every {{TODO: ...}} marker above."
    return 1
  fi
}

check_plugins_with_claude() {
  if ! command -v claude >/dev/null 2>&1; then
    echo "claude CLI not found: skipped."
    return 0
  fi
  local status=0
  claude plugin validate .claude/skills || status=1
  claude plugin validate .claude/agents || status=1
  claude plugin validate . || status=1
  for plugin in plugins/*/; do
    claude plugin validate "$plugin" || status=1
  done
  return $status
}

run "Every page exists in English and Spanish" node scripts/bilingual.js
run "No {{TODO}} markers left in docs/" check_no_todo_markers
run "Relative links work" node scripts/check-links.js
run "No secrets in files" node scripts/check-secrets.js
run "JavaScript syntax" check_js_syntax
run "JSON files are valid" check_json
run "Skills are well formed" check_skills
run "Claude Code validates skills, agents and plugins" check_plugins_with_claude

echo
if [ "$failed" -eq 0 ]; then
  echo "All checks passed. / Todas las verificaciones pasaron."
else
  echo "Some checks failed. / Algunas verificaciones fallaron."
fi
exit "$failed"
