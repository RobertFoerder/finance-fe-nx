# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 21 + Nx 22 monorepo for a personal finance application. Uses NgRx for state management and Azure AD (MSAL) for authentication. Deployed to Azure Static Web Apps. Built with esbuild (`application` builder).

## Common Commands

### Development
```bash
npm run start:dev          # Dev server on localhost:4200
npm run start:mock         # Dev server with mock API (prism on port 3000)
npm run start:prod         # Production build served locally
```

### Build & Test
```bash
npx nx build finance-fe                    # Build the app
npx nx test <project-name>                 # Run tests for a specific library (e.g. accounts-data)
npx nx test <project-name> --testFile=<path>  # Run a single test file
npx nx lint <project-name>                 # Lint a specific project
npm test                                   # Run all tests (Jest)
npm run e2e                                # Cypress e2e tests
```

### API Client Generation
```bash
npm run api:finance:build     # Clean + regenerate TypeScript client from OpenAPI spec
npm run api:finance:mock      # Start mock API server on port 3000
npm run api:finance:ui        # Serve API spec UI on port 8001
```

The API client in `libs/finance-api/` is auto-generated from `apis/finance-api.json` using OpenAPI Generator. Do not edit files in `libs/finance-api/` manually.

## Architecture

### Monorepo Structure
```
apps/finance-fe/          # Main Angular app (standalone components, lazy-loaded routes)
libs/
  core/                   # Base models, generic API error handling (GenericApiEffects)
  shared/                 # Services (DateService, SumUpService), pipes, environment configs
  layout/                 # App shell/layout component
  finance-api/            # Auto-generated OpenAPI client (DO NOT EDIT)
  accounts/               # Feature: bank accounts
    data/                 # NgRx state (actions, reducer, effects, selectors, facade)
    views/                # Smart/presentational components
  summary/                # Feature: financial summary/dashboard
    data/
    views/
  fixed-costs/            # Feature: recurring expenses
    data/
    views/
```

### Path Aliases
All imports use `@finance-fe-nx/` prefix (e.g., `@finance-fe-nx/accounts/data`, `@finance-fe-nx/shared`). Defined in `tsconfig.base.json`.

### Data Flow Pattern (per feature)
1. **Component** calls method on **Facade** (e.g., `accountsFacade.load()`)
2. **Facade** dispatches an **NgRx Action**
3. **Effect** intercepts the action, calls the auto-generated **API service**
4. Success/failure action updates the **Reducer** (uses `@ngrx/entity`)
5. **Selectors** provide computed state back to components via Facade observables

Each feature library's `data/` folder contains: `*.actions.ts`, `*.reducer.ts`, `*.effects.ts`, `*.selectors.ts`, `*.facade.ts`, `*.models.ts`.

### Routing
Routes defined in `apps/finance-fe/src/app/app.module.ts`. Three lazy-loaded feature routes (`/summary`, `/accounts`, `/fixed-costs`) guarded by `MsalGuard`.

### Module Boundaries
Nx enforces strict dependency rules via `@nx/enforce-module-boundaries` in `.eslintrc.json`. Feature `views` depends on `data`, which depends on `core`/`shared`. Features should not depend on each other.

### Authentication
Azure AD via `@azure/msal-angular`. Configured in `apps/finance-fe/src/app/app.module.ts`. All API calls to the Azure Function backend are protected.

### Environment Configs
Located in `libs/shared/src/environments/`. Two variants: `environment.ts` (dev), `environment.prod.ts`.

## Code Style
- Prettier with single quotes (`"singleQuote": true`)
- 2-space indentation
- Stylelint for CSS
- Tailwind CSS for styling
