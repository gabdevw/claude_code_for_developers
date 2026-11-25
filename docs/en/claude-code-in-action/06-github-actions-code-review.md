**English** | [Español](../../es/claude-code-in-action/06-github-actions-code-review.md)

# 6. GitHub Actions and Code Review

> **In one line:** bring Claude into your pull requests, either managed by Anthropic or running in your own GitHub Actions.

## Two ways to do it

| | **Code Review** (managed path) | **GitHub Actions** (your own workflow) |
|---|---|---|
| What it does | Reviews pull requests automatically | Does tasks when someone writes `@claude` |
| Who sets it up | An Owner of your Claude organization | Anyone with admin access to the repository |
| Where it runs | Anthropic's infrastructure | Your GitHub Actions runners |
| Plans | Team and Enterprise | Any, with an API key |

## The managed path: Code Review

### Setup

1. An **Owner** of your Claude organization turns it on in the Claude Code admin settings. There is a **Code review** section with an **Allow code review** switch that starts the setup.
2. From there, the Owner installs the **Claude GitHub app**, chooses which repositories it watches, and decides when it runs.
3. If the Owner is not also an owner of the GitHub organization, someone with that access must install and link the app first.

### When it runs

You have a few timing options for each repository:

- **Once**, when a pull request is opened.
- **On every push** to the pull request.
- **Only on request**, when someone comments `@claude review`.

### What you get

Once it is on, everything runs on Anthropic's infrastructure. A set of review agents analyzes the diff **against your whole codebase**, not just the changed lines on their own. Then:

- Each finding arrives as a **comment from Claude, right on the line**, with a clear explanation and a suggested fix.
- Findings are **labeled by severity**.
- A **summary table** appears in the check run.

The good part: it **removes duplicates and ranks the findings**. So instead of a wall of nitpicks, you read a handful of real problems worth your attention.

### Tune it

Code Review follows your `CLAUDE.md` and also a **`REVIEW.md`** file with guidance only for reviews: what to focus on and what to skip. It is read from the main branch. Example: [REVIEW.md](../../../REVIEW.md).

> **Important:** Code Review is available on the **Team** and **Enterprise** plans.

## Your own path: GitHub Actions

With the official action [`anthropics/claude-code-action`](https://github.com/anthropics/claude-code-action), Claude runs inside your GitHub workflows. Anyone can mention `@claude` in an issue or a pull request comment:

```text
@claude fix the typo in the README and open a pull request
@claude why does this test fail?
```

### Quick setup

Inside Claude Code, run:

```text
/install-github-app
```

It guides you to install the Claude GitHub app, save your API key as a secret, and create the workflow. (It works with repositories on github.com.)

### Manual setup

1. Install the Claude GitHub app on your repository.
2. Add your API key as a repository secret named `ANTHROPIC_API_KEY` (*Settings → Secrets and variables → Actions*). **Never write the key in the workflow file.**
3. Add the workflow:

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    if: contains(github.event.comment.body, '@claude')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
        with:
          fetch-depth: 1
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

Tip: Claude reads your `CLAUDE.md` inside GitHub Actions too, so your project rules also apply there.

### In this repository

- [.github/workflows/claude.yml](../../../.github/workflows/claude.yml) — answers `@claude` mentions.
- [.github/workflows/checks.yml](../../../.github/workflows/checks.yml) — runs the same checks as the `/verify` skill on every pull request. That way, the same verification runs on your computer and in CI.

## Summary

- [ ] **Code Review** (Team/Enterprise): an Owner turns it on; it reviews pull requests on Anthropic's infrastructure, with inline comments by severity and a summary table.
- [ ] Choose when it runs: when the PR opens, on every push, or with `@claude review`.
- [ ] Tune it with `CLAUDE.md` and `REVIEW.md`.
- [ ] **GitHub Actions** (any plan): `/install-github-app`, the `ANTHROPIC_API_KEY` secret, and `@claude` in comments.
- [ ] Never write keys in workflow files: use repository secrets.

---

[← 5. Scheduled tasks](05-scheduled-tasks.md) | [Back to the course index](README.md)
