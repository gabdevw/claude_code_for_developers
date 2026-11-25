**English** | [Español](README.es.md)

# Claude Code Best Practices

A bilingual (English/Spanish) guide to working well with [Claude Code](https://code.claude.com/docs), written in plain words, **plus a working base project** that applies every practice.

- 📚 **Learn**: course notes rewritten in simple language, one page per topic.
- 🛠️ **Copy**: real hooks, skills, settings and workflows you can take to your own projects.
- 🌱 **Grow**: a structure ready to add new courses and examples.

## Courses

| Course | Topics |
|---|---|
| [Claude Code in Action](docs/en/claude-code-in-action/README.md) | Long sessions · CLAUDE.md · Skills · Hooks · Scheduled tasks · GitHub Actions and Code Review |

All courses: [docs/en/](docs/en/README.md).

## What's inside

```text
.
├── CLAUDE.md                     # Project rules for Claude (lean, specific, checkable)
├── REVIEW.md                     # Extra guidance for Claude Code Review
├── .worktreeinclude              # Ignored files copied into every worktree
├── .env.example                  # Secret names without values
├── .claude/
│   ├── settings.json             # Hook configuration
│   ├── hooks/                    # Hooks written in Node.js (no dependencies)
│   │   ├── redact-secrets.js         # PreToolUse: redact keys in Bash commands and ask
│   │   ├── block-secrets-in-prompt.js# UserPromptSubmit: stop secrets before Claude reads them
│   │   ├── translation-reminder.js   # PostToolUse: remind Claude to update the other language
│   │   ├── stop-check-translations.js# Stop: don't finish while a translation is missing
│   │   ├── session-start-compact.js  # SessionStart (compact): restore state after compaction
│   │   └── lib/                      # Shared code (secret patterns, input reader)
│   └── skills/
│       ├── verify/               # /verify — SKILL.md + reference.md + scripts/check.sh
│       └── add-course/           # /add-course — add a new course in both languages
├── .github/
│   ├── workflows/
│   │   ├── checks.yml            # Runs the /verify checks on every pull request
│   │   └── claude.yml            # Claude answers @claude mentions
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/
│   ├── en/<course>/              # English notes
│   └── es/<course>/              # Spanish notes (same file names)
├── templates/
│   ├── en/                       # Copy-ready CLAUDE.md, SKILL.md and page templates
│   └── es/
└── scripts/                      # Checks used by hooks, the /verify skill and CI
```

## Quick start

Requirements: [Claude Code](https://code.claude.com/docs), [Node.js](https://nodejs.org) 18 or newer, and Git (on Windows, Git for Windows includes Git Bash).

```bash
git clone https://github.com/<your-user>/<this-repo>.git
cd <this-repo>
cp .env.example .env      # put your own values in .env (never commit it)
claude
```

Inside Claude Code, try:

- `/verify` — runs every check of the repository.
- `/add-course <course name>` — adds a new course in both languages.
- `/hooks` — shows the hooks that are active.

You can also run the checks without Claude:

```bash
bash .claude/skills/verify/scripts/check.sh
```

## Use it as a base for your own project

1. Copy `.claude/` (hooks, skills and settings), `.worktreeinclude`, `.env.example` and the `.gitignore` rules.
2. Start your `CLAUDE.md` from [templates/en/CLAUDE.md](templates/en/CLAUDE.md), or run `/init`.
3. Keep only the hooks you need. The secret hooks are useful everywhere; the translation hooks are specific to this repository.
4. Change `scripts/` and `check.sh` so `/verify` runs **your** tests and linter.

> Hooks run with your user's permissions. Read every hook before you use it.

## Contributing

Contributions are welcome in English, Spanish or both. Read [CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE). This is a community project and is not affiliated with Anthropic.
