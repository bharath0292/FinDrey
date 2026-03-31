# Comprehensive Sprint Planning Prompt (Reusable)

I want to build a **long‑term, ambitious software product** and need a **detailed sprint planning structure** plus a **spreadsheet‑ready roadmap** that I can turn into Jira tickets later.

---

## 1. Product details

- **Product name:** [Your app name here]  
- **Goal:** [What problem does it solve? For whom?]  
- **Target users:** [Number of users, individuals vs teams, free vs paid]  
- **Tech stack:**
  - Frontend: __________________________
  - Backend: ___________________________
  - Database(s): ________________________
  - AI/ML: _____________________________
  - Other tools: ________________________
- **Architecture:**  
  - Monorepo / multi‑repo: ________________________  
  - Microservices / monolith: ______________________  

- **Additional constraints:**
  - Open source? Yes / No / Maybe  
  - Hard deadlines? Yes / No (specify if yes)  
  - Legacy systems or integrations: ________________________  
  - Compliance or security concerns (e.g., GDPR, financial, healthcare): ________________________  

---

## 2. Release structure

- Design a **version plan** using semantic versioning:
  - v0.1, v0.2, v0.3, ..., v1.0  
- For each version, include:
  - Name
  - Target scope (1–2 lines)
  - Sprint range (e.g., Sprint 1–3)

---

## 3. Epic and feature structure

- Create a list of **epics** (major feature areas).  
- For each epic, include:
  - Epic ID (e.g., `EPIC-001`)
  - Epic name  
  - Category:
    - Platform / Core / Analytics / AI / Ops / Open Source / Security / UX  
  - Target version  
  - Brief description (1–2 lines)

---

## 4. Sprint plan

- Assume **2‑week sprints** by default unless specified otherwise.  
- For each sprint, include:
  - Sprint number (e.g., `Sprint 01`, `Sprint 02`)  
  - Version (e.g., `v0.1`, `v0.2`)  
  - Focus/theme (e.g., Auth, Transactions, Reports, AI, Observability)  
  - Duration (e.g., `2 weeks`)

---

## 5. Backlog structure

Create a **backlog table** with these columns:

- `Issue ID` (e.g., `TASK-001`, `STORY-001`)  
- `Epic` (Epic ID)  
- `Sprint`  
- `Version`  
- `Type`  
  - Story  
  - Task  
  - Bug  
  - Spike  
  - Sub-task  
- `Description` (clear, actionable, 1–2 sentences)  
- `Labels` (comma‑separated, example: `frontend, backend, infra, ai, notifications, db, docs, observability, security, open-source, tech-debt, spike`)  
- `Priority` (High / Medium / Low)  
- `Status` (To Do / In Progress / Done / Blocked)

Distribute backlog items across sprints like this:

- Early sprints:
  - Monorepo / repo setup, auth, basic data model, and basic UI.
- Middle sprints:
  - Core features, import/export, dashboards, rules, notifications.
- Later sprints:
  - AI, observability, CI/CD, security, and open‑source readiness.

---

## 6. Labels and categories

Provide a **labels reference table** with:

- `Label`  
- `Description`  

Suggest 10–15 labels for a Jira or GitHub board, for example:

- `frontend`  
- `backend`  
- `infra`  
- `ai`  
- `notifications`  
- `observability`  
- `security`  
- `db`  
- `docs`  
- `open-source`  
- `tech-debt`  
- `spike`  

---

## 7. Excel‑ready output

Generate a **multi‑sheet Excel‑style plan** with:

- **Sheet 1: `Versions`**  
  - Version, Name, Sprint range, Status  

- **Sheet 2: `Epics`**  
  - Epic ID, Epic name, Category, Version, Description  

- **Sheet 3: `Sprint Overview`**  
  - Sprint, Version, Focus, Duration  

- **Sheet 4: `Backlog`**  
  - Full backlog table with all columns above  

- **Sheet 5: `Labels`**  
  - Label, Description  

Make sure all tables are well‑formatted and ready to export to Excel or CSV.

---

## 8. AI and observability

Include AI‑related epics and stories:

- AI analytics / insights  
- AI assistant / copilot‑style features  
- Research spikes (local vs hosted models)  

Include observability:

- Error tracking (e.g., Sentry)  
- Metrics (e.g., Prometheus)  
- Logging and dashboards  

---

## 9. Monorepo / multi‑repo assumptions

If not specified, assume:

- **Monorepo** for:
  - Frontend  
  - Backend  
  - AI service  
  - Infra / scripts  

Keep them in separate modules or packages, but within one repo.

---

## 10. CI/CD and DevOps

Include a **CI/CD and deployment epic** with tasks for:

- Docker  
- CI/CD pipeline  
- Automated testing  
- Version capture / deployment metadata  

---

## 11. Open‑source readiness

If the project is open source (or might become open source), add:

- Epics:
  - Documentation  
  - Contribution guide  
  - Pull Request templates  
  - Issue templates  
  - Roadmap  
  - Release process  

---

## 12. Flexibility guidelines

Design the plan so I can easily:

- Add new features later  
- Move items between sprints  
- Change priorities without breaking the whole structure  

Keep:

- Early sprints more detailed  
- Later sprints slightly higher level  

---

## 13. Output format

- Provide the **full plan in Markdown or CSV‑style tables** so I can turn them into:
  - An Excel file  
  - A Jira board  
  - A GitHub Project board  
- If possible, also give:
  - A brief mapping of how to convert this into a Jira board:
    - Versions → Jira versions  
    - Epics → Epics  
    - Stories/Tasks/Bugs → Issues  
    - Labels → Labels  

---

## 14. Optional extras

- If supported, generate a **real `.xlsx` file** (Excel) with the sheets above.  
- If not, provide clear instructions so I can build the Excel file manually.

---

Please now create the **full detailed sprint plan** including:

- Versions  
- Epics  
- Sprints  
- Backlog (with issues, types, labels, priorities)  
- Labels reference  