---
trigger: always_on
---

# Rules for Agent

## Plan Management

* Always keep all plans inside the `./.agents/plans` folder to ensure they remain within the project scope.

## Task Execution Workflow

* For each task, create either:

  * `feature-<task-number>`
  * `bug-<task-number>`

* Follow the exact Software Development Lifecycle (SDLC) process for every task.

## Development Process

* Complete tasks **one by one** instead of working on the entire sprint at once.
* After completing each task, stop and wait for manual review.
* Additional changes or feedback may be provided after review.

## Commit & Push Workflow

* Do not commit or push automatically after completing a task.
* After review approval, you will be instructed to:

  * commit the changes
  * push them to the repository
* The commit should reference the corresponding task number.
