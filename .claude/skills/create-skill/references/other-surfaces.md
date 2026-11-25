# When it isn't a skill: how to build the alternative

## CLAUDE.md rule

- Add it to the project `CLAUDE.md` (team), `~/.claude/CLAUDE.md` (personal) or `CLAUDE.local.md` (personal, this repo only).
- One line. Specific and checkable. Name the replacement: "Use pnpm, not npm."
- No emphasis (`IMPORTANT`, capitals). If it must never fail, it is a hook.
- If it only applies to some files, put it in `.claude/rules/<topic>.md`:

  ```markdown
  ---
  paths:
    - "src/api/**/*.ts"
  ---

  - Put each API handler in its own file in src/api/handlers.
  ```

## Hook

1. Choose the event: `PreToolUse` (block or rewrite before a tool runs), `PostToolUse` (after a tool succeeds), `UserPromptSubmit` (before Claude reads a prompt), `Stop` (before Claude finishes), `SessionStart` (start, resume or after `compact`).
2. Write the script in `.claude/hooks/`. It reads JSON from stdin and must exit 0 when there is nothing to do:

   ```js
   let raw = '';
   process.stdin.on('data', (c) => (raw += c));
   process.stdin.on('end', () => {
     const input = JSON.parse(raw || '{}');
     // Block: print the reason to stderr and exit with code 2.
     // Or print JSON to stdout for finer control.
   });
   ```

3. Register it in `.claude/settings.json` (team) or `.claude/settings.local.json` (personal):

   ```json
   {
     "hooks": {
       "PostToolUse": [
         { "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/my-hook.js\"" }] }
       ]
     }
   }
   ```

4. Test it by piping a fake JSON input into the script. In a `Stop` hook, check `stop_hook_active` to avoid endless loops.
5. Tell the user to check it with `/hooks`.

## Subagent

1. Create `.claude/agents/<name>.md` (team) or `~/.claude/agents/<name>.md` (personal):

   ```markdown
   ---
   name: accessibility-reviewer
   description: Reviews frontend code for accessibility problems. Use after changing UI components.
   tools: Read, Grep, Glob
   model: sonnet
   skills:
     - accessibility-audit
   ---

   You review frontend code for accessibility. Report problems with file, line and fix. Don't edit files.
   ```

2. `skills` is a YAML list; those skills must exist. The subagent doesn't see the main conversation, so its instructions must be complete.
3. Validate with `claude plugin validate .claude/agents`. If `.claude/agents` didn't exist when the session started, the user must restart Claude Code.

## MCP server

This is outside what a skill can do. Point the user to `claude mcp add` and the server's own documentation. Offer to write a skill that explains **how** to use the server's tools safely once it is connected.

## Combinations

- **Subagent + skills**: isolated work with specific expertise.
- **Skill + hook**: the skill explains the procedure; the hook guarantees the critical part.
- **CLAUDE.md + skill**: a one-line rule that points to the skill for details.
