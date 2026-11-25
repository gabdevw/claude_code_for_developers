---
name: codebase-onboarding
description: Explains how a codebase is organized and how its parts work together, for developers who are new to it. Use when someone asks for an overview of the project, onboarding help, "how does this project work", "where is X handled", or "explícame cómo funciona el proyecto".
allowed-tools: Read, Grep, Glob, Bash(git log *)
model: sonnet
---

Help a new developer understand this codebase. Read; don't change files.

1. Read the entry points first: `README*`, `CLAUDE.md`, the package or build file (`package.json`, `pyproject.toml`, `go.mod`, ...).
2. Map the main folders: what each one holds, in one line each.
3. Follow one real request or flow from start to end (for example, an HTTP request from route to database) and name the files it passes through.
4. Run `git log --oneline -15` to see what is changing lately.

Answer with:

- **What it is**: two sentences.
- **Map**: a short folder tree with one line per folder.
- **One flow, step by step**, with file paths.
- **How to run it and test it**: the exact commands you found.
- **Where to start**: 3 files worth reading first.

If the user asked about one area ("where is X handled"), skip the full overview and answer only that, with file paths and line references.
