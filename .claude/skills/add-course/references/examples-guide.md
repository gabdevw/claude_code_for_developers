# Examples guide

Every chapter should point to something real in this repository. Use this guide to decide what to build and where.

## Where each kind of example goes

| Kind | Location | Runs here? | Notes |
|---|---|---|---|
| Project skill useful **for this repo** | `.claude/skills/<name>/` | Yes | Only skills that help maintain this repo, or they trigger on unrelated requests. |
| Reusable skill for **other projects** | `plugins/<plugin>/skills/<name>/` | After installing the plugin | Self-contained: a plugin can't use files outside its folder. |
| Subagent | `.claude/agents/<name>.md` | Yes | If Claude Code doesn't see it, restart the session. |
| Hook | `.claude/hooks/<name>.js` + `.claude/settings.json` | Yes | Node.js, no dependencies. Read JSON from stdin, exit 0 when there is nothing to do. |
| Plugin / marketplace | `plugins/<plugin>/` + `.claude-plugin/marketplace.json` | Structure only | Add a bilingual README with step-by-step publishing instructions. |
| GitHub workflow | `.github/workflows/<name>.yml` | On GitHub | Secrets go in repository secrets, never in the file. |
| Personal or enterprise setup (`~/.claude/...`, managed settings) | A snippet in the chapter | No | Give exact paths for Windows, macOS and Linux, and copy commands. |
| Copy-ready template | `templates/en/` + `templates/es/` | — | Same file name in both folders. |

## Rules

1. **Runnable inside the repo → build it and test it.**
   - Scripts: run them.
   - Hooks: pipe a fake JSON input and check the output.
   - Skills: run `claude plugin validate .claude/skills` when the `claude` CLI is available.
2. **Needs something outside the repo** (a marketplace, an admin console, a cloud service, your home folder): create the file structure, and write a README with numbered steps: what to run, where, and how to check it worked.
3. **Fake secrets only.** In tests, build fake keys from pieces (`"sk_""live_..."`) so the secret hooks don't block your own command.
4. **Link it.** Every example appears in the "In this repository" section of its chapter and in the chapter table of the course README.
5. **Update the tree** in `README.md` and `README.es.md` when you add a new folder or kind of example.
6. **Don't duplicate.** If an example already exists from an earlier course, link to it, or extend it.
