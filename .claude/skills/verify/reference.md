# Review checklist

Read this after `check.sh` passes. The script checks structure; this list checks meaning.

## Both languages
- The English and Spanish pages have the same sections, in the same order.
- They say the same thing. A translation may change words, never facts.
- Each page starts with the language switch line and it points to the other language.

## Plain words
- Short sentences. One idea per sentence.
- A technical term is explained the first time it appears (for example: "a *hook*, a script that runs automatically at a fixed moment").
- Use examples instead of abstract advice.

| Avoid | Prefer |
|---|---|
| "Leverage hooks to enforce invariants." | "Use a hook when a rule must never be skipped." |
| "Follow best practices for API routes." | "Put new API routes in `src/api/handlers`, one per file." |

## Examples
- Commands and JSON are complete and can be copied as they are.
- No real secrets. Use placeholders like `sk_live_...` or variables like `$STRIPE_KEY`.
- When a page shows a working example from this repo, it links to the file.

## Indexes
- A new course is listed in `README.md`, `README.es.md`, `docs/en/README.md` and `docs/es/README.md`.
- `CHANGELOG.md` has a new entry in both languages.
