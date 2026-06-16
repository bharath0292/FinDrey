# CLAUDE.md

## Knowledge Graph

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Project Management

### Tooling
- Agile tracker: **GitHub Projects v2** (linked to this repo)
- Structure: **Sprint → Tasks (GitHub Issues)**
- Sprints map to PLAN.md sprint numbers (e.g. Sprint 1, Sprint 2)

### Task Completion Workflow
When a task (GitHub Issue) is finished:
1. Claude stops and notifies the user that the task is done for review
2. The user reviews changes manually, then explicitly asks Claude to commit and push
3. Only when instructed, Claude: commits with a message referencing the issue number (e.g. `fix: implement auth guard (#12)`), pushes to the remote branch, and closes the GitHub Issue using `gh issue close <number>` with a summary comment

### Rules
- Never commit, push, or close an issue automatically — always wait for explicit user instruction
- Commit messages must reference the GitHub Issue number using `(#N)` format
- One issue = one logical unit of work; do not batch-close multiple issues in one commit unless they are truly atomic
- After closing an issue, confirm closure with `gh issue view <number>` to verify status
