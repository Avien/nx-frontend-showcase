# Nx Frontend Architecture Showcase

A feature-driven Angular/Nx workspace demonstrating scalable frontend architecture patterns.

## Overview

This project showcases how to structure a frontend application using Nx with clear separation of concerns and feature-based organization.

It includes two independent feature areas:

* **Connector Wizard** — a multi-step flow with guarded navigation and route-based orchestration
* **Users Directory** — a server-driven list demonstrating pagination, search, and performance considerations

---

## Key Highlights

* **Nx monorepo structure** with domain-based library separation
* **Feature-driven architecture** (feature-shell / ui / data-access / model / util)
* **Facade-based design** for state orchestration and side effects
* **Lazy-loaded routing** at both feature and route levels
* **Container / presentational pattern** where applicable
* **Scalable folder structure** aligned with real-world frontend systems

---

## Architecture

```
apps/
  web/

libs/
  connector-wizard/
    feature-shell/
    feature-steps/
    data-access/
    model/
    util/

  users/
    feature-shell/
    ui/
    data-access/
    model/

  shared/
    ui/
    util/
```

---

## Feature Breakdown

### Connector Wizard

A multi-step workflow demonstrating:

* Route-driven step navigation
* Guard-based flow control
* Feature-scoped facade provider
* Lazy-loaded step components
* Clear separation between orchestration and domain logic

---

### Users Directory

A data-driven UI demonstrating:

* Server-side pagination
* Incremental data loading ("Load more")
* Separation between container and presentational components
* Clean data-access layer abstraction

---

## Architectural Principles

* **Thin application shell** — the app only defines routing and bootstrapping
* **Feature isolation** — each domain is encapsulated in its own set of libraries
* **Separation of concerns** — UI, data, models, and utilities are clearly divided
* **Scalability-first structure** — designed to grow without refactoring core boundaries

---

## Running the Project

```bash
npm install
nx start
```

---

## Notes

This project is intended as an architectural showcase rather than a production-ready system.
The focus is on structure, patterns, and scalability rather than completeness of features.
