# CLAUDE.md

The working rules for this repo live in **[AGENTS.md](AGENTS.md)** — read it
before making changes. It is the single source of truth for build gates, coding
patterns, styling, and data conventions, shared by every AI agent that works
here.

Nothing is duplicated in this file on purpose: two copies of the same rules
drift apart. Add or change rules in `AGENTS.md`.

Quick reminder of the one rule that matters most:

```bash
pnpm check      # typecheck && verify:raid && build — must pass before you finish
```
