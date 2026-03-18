# Nx Frontend Showcase

A small Angular/Nx workspace showcasing two isolated frontend feature areas under a single host app:

- **Connector Wizard** – a routed multi-step integration flow with a facade-driven state layer.
- **Users Directory** – a server-driven users list with search, incremental loading, and a details panel.

## Workspace structure

```text
apps/
  web/

libs/
  connector-wizard/
    feature-shell/
    feature-steps/
    data-access/

  users/
    feature-shell/
    ui/
    data-access/

tools/
  mock-servers/
```

## Run locally

```bash
npm install
npm start
```
