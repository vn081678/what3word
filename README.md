# what3words Playwright tests

TypeScript end-to-end tests for the public [what3words map](https://what3words.com/), organized with a page-object model and traceable feature documentation.

## Prerequisites

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

Optionally copy `.env.example` to `.env` and change `BASE_URL`.

## Commands

| Command               | Purpose                                |
| --------------------- | -------------------------------------- |
| `npm test`            | Run the Chromium test suite headlessly |
| `npm run test:headed` | Run with a visible browser             |
| `npm run test:debug`  | Run in Playwright debug mode           |
| `npm run test:ui`     | Open Playwright UI mode                |
| `npm run report`      | Open the latest HTML report            |
| `npm run lint`        | Check ESLint rules                     |
| `npm run format`      | Format project files                   |
| `npm run typecheck`   | Type-check without emitting files      |
| `npm run ci`          | Run all quality checks and tests       |

## Structure

- `docs/<feature>/` — requirements and manual test cases with traceability IDs
- `pageobject/` — page locators, actions, and reusable assertions
- `fixture/` — typed Playwright fixtures that provide page objects
- `tests/` — concise behavior-focused spec files
- `test-data/` — typed test inputs and expected values
- `utils/` — cross-page reusable helpers

Failure screenshots, videos, and traces are written to `test-results/`. The HTML report is written to `playwright-report/`.
