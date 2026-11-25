# Review guidance

Used by Claude Code Review on pull requests. General project rules are in CLAUDE.md.

## Focus on
- Every page in `docs/en/` has the same page in `docs/es/`, with the same sections and meaning.
- Plain words. Technical terms are explained the first time they appear.
- Commands, settings and code examples are correct and safe to copy.
- No real secrets. Examples use placeholders like `sk_live_...` or environment variables.
- Hook scripts read JSON from stdin, never crash on unexpected input, and exit 0 when there is nothing to do.
- Relative links point to files that exist.

## Skip
- Wording preferences when the text is already clear in both languages.
