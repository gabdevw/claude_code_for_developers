**English** | [Español](../../es/claude-code-in-action/04-hooks.md)

# 4. Hooks: rules Claude cannot skip

> **In one line:** a hook is your own code that runs at a fixed moment, every time.

## What a hook is

A **hook** is deterministic code (it always does the same thing) that runs at a fixed point in Claude's work cycle. So it can **guarantee** a behavior instead of just hoping for it.

It turns a rule from "Claude usually listens" into "Claude can't skip it".

## The most used events

| Event | When it runs | Typical use |
|---|---|---|
| `PreToolUse` | Before Claude uses a tool (Bash, Edit, Write…) | Block or rewrite a dangerous command. |
| `PostToolUse` | After a tool finishes successfully | Format or check the edited file; add a reminder for Claude. |
| `UserPromptSubmit` | When you send a prompt, **before** Claude reads it | Block secrets in your prompt; add context. |
| `Stop` | When Claude is about to finish its turn | Check the work is complete; make Claude continue if not. |
| `SessionStart` | When a session starts, resumes, or right after a compaction | Load context or saved state. |

## How to set one up

Hooks are configured in a settings file:

| File | Who it applies to |
|---|---|
| `.claude/settings.json` | Everyone in the project (it is in git). |
| `.claude/settings.local.json` | Only you, in this project. |
| `~/.claude/settings.json` | Only you, in all your projects. |

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/redact-secrets.js\"" }
        ]
      }
    ]
  }
}
```

- **`matcher`** chooses which tool triggers the hook: `Bash`, `Edit|Write`, etc. For `SessionStart` it chooses the moment: `startup`, `resume`, `clear` or `compact`.
- **`$CLAUDE_PROJECT_DIR`** is the root folder of your project.
- Run **`/hooks`** to see every hook that is configured.

## How a hook talks to Claude Code

1. **Input:** Claude Code sends the hook a JSON on standard input (stdin). For example, for `PreToolUse` it includes `tool_name` and `tool_input` (the command Claude wants to run).
2. **Output — the simple way, with exit codes:**
   - `0` → all good, continue.
   - `2` → block. The message the hook writes to standard error (stderr) explains why.
   - Any other code → an error is shown, but the action continues.
3. **Output — the detailed way:** exit with `0` and print a JSON to stdout, like in the examples below.

## A real safeguard: redact instead of block

Problem: Claude knows a secret key (for example, a Stripe key that starts with `sk_live_...`) and writes it inside a command. Now the key is in the terminal history and in the logs.

Where does the hook act?

```text
You write a prompt
      │
      ▼
Claude (the model) reads it          ← a PreToolUse hook does NOT act here
      │
      ▼
Claude writes a Bash command
      │
      ▼
[ PreToolUse HOOK ]                   ← it DOES act here: it checks and rewrites the command
      │
      ▼
The terminal runs the command
```

An analogy: the hook is not a filter between your mouth and Claude's ear. **It is a guard between Claude's hand and the terminal.** Claude may know the secret, but the guard won't let it write the secret in a command without your approval.

What the hook does:

1. Finds the key in the command.
2. Replaces it with `REDACTED` (`updatedInput`).
3. Asks you before running it (`permissionDecision: "ask"`).

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "The command contained a secret. It was replaced with REDACTED.",
    "updatedInput": { "command": "curl https://api.stripe.com/v1/charges -u REDACTED:" }
  }
}
```

Full example: [.claude/hooks/redact-secrets.js](../../../.claude/hooks/redact-secrets.js).

### An important detail

The rewritten command with `REDACTED` **won't work** against Stripe, because that is not a valid key. That's fine: the idea is that real keys never travel written inside a command. The right practice is for the command to use an **environment variable**:

```bash
curl https://api.stripe.com/v1/charges -u "$STRIPE_KEY:"
```

The command works, but its text never contains the key. If Claude tries to paste the key "by hand", the hook catches it.

## If you want to protect your prompts: UserPromptSubmit

The hook above protects commands. To protect what **you** type, there is another hook: `UserPromptSubmit`. It runs when you send a message, **before Claude reads it**. It can check your prompt and block it if it finds something like `sk_live_...`, so the secret never reaches the model.

```json
{ "decision": "block", "reason": "Your prompt looks like it contains a secret, so it was not sent." }
```

Example: [.claude/hooks/block-secrets-in-prompt.js](../../../.claude/hooks/block-secrets-in-prompt.js).

Even so, the best rule for your team is simple: **don't paste secrets into prompts.** Keep them in `.env` or in environment variables and refer to them by name. Commit a [.env.example](../../../.env.example) with the names but without the values.

## Check before finishing: Stop

A `Stop` hook runs when Claude is about to end its turn. If the work is not complete, it can block the stop and tell Claude what is missing:

```json
{ "decision": "block", "reason": "These pages are missing their Spanish translation: ..." }
```

Always check the `stop_hook_active` field in the input. It is `true` when Claude is already continuing because of a `Stop` hook. If you block again, you can create an endless loop.

Example: [.claude/hooks/stop-check-translations.js](../../../.claude/hooks/stop-check-translations.js) (it doesn't let Claude finish while a page exists in only one language).

## Keep state across compaction: SessionStart

When Claude compacts a long conversation, it loses a lot of detail. A `SessionStart` hook with the matcher `compact` runs right after the compaction. **Whatever it prints is added to Claude's context**, so you can bring back what must not be lost: the current goal, decisions, next steps.

```json
"SessionStart": [
  {
    "matcher": "compact",
    "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/session-start-compact.js\"" }]
  }
]
```

Example: [.claude/hooks/session-start-compact.js](../../../.claude/hooks/session-start-compact.js) (it prints the notes in `.claude/state/current-task.md`).

## Go beyond auto-formatting: PostToolUse

The classic `PostToolUse` hook formats every file Claude edits. It can also add a note to Claude's context (`additionalContext`):

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "You edited docs/en/intro.md. Update docs/es/intro.md too."
  }
}
```

Example: [.claude/hooks/translation-reminder.js](../../../.claude/hooks/translation-reminder.js).

## Safety first

Hooks run automatically, **with your user's permissions**. Read every hook before you add it, especially when you copy it from a public repository (including this one).

All the hooks of this repository are configured in [.claude/settings.json](../../../.claude/settings.json).

## Summary

Hooks turn a rule Claude usually follows into one it always follows. Go beyond auto-formatting:

- [ ] Guard tools with **`PreToolUse`** (for example, redact secrets and ask before running).
- [ ] Protect your prompts with **`UserPromptSubmit`**, but keep secrets in `.env` anyway.
- [ ] Control the end of the turn with **`Stop`** (and check `stop_hook_active`).
- [ ] Preserve state across a compaction with **`SessionStart`** + matcher `compact`.
- [ ] Review every hook before adding it: it runs with your permissions.

Setting them up takes a little effort up front, but it pays off the first time a hook stops something in a run you weren't even watching.

---

[← 3. Skills](03-skills.md) | Next: [5. Scheduled tasks →](05-scheduled-tasks.md)
