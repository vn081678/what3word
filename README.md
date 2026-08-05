# what3words Playwright tests

TypeScript end-to-end tests for the public [what3words map](https://what3words.com/), organized with a page-object model and traceable feature documentation.

## Assessment scope

- **Task 1 - Search automation:** The address-search requirements and test cases are documented in [`docs/address-search`](docs/address-search), with seven scenarios automated in [`tests/address-search.spec.ts`](tests/address-search.spec.ts).
- **Task 2 - Sharing test design:** The Sharing requirements and manual test cases are documented in [`docs/sharing`](docs/sharing). They cover the Share interface, SMS, Email, X, Facebook, and WhatsApp. Task 2 is documentation-only and is not implemented in the Playwright suite.

## Choice of testing framework

This project uses [Playwright Test](https://playwright.dev/) with TypeScript.

Playwright was selected because it provides browser automation, a test runner, assertions, fixtures, retries, parallel execution, reporting, and failure diagnostics in one framework. Its role-, label-, and test-ID-based locators also support readable tests that are less dependent on CSS implementation details.

TypeScript adds compile-time checking for page objects, fixtures, and test data. This helps detect incorrect method calls and incompatible data before a browser test starts.

The initial project targets Chromium to keep the assessment focused and execution time manageable. Firefox, WebKit, and mobile projects can be added later in `playwright.config.ts` without changing the test architecture.

## Prerequisites

- Git
- Node.js 20 or newer
- npm

## Repository setup

1. Clone the repository and enter its directory:

```bash
git clone https://github.com/vn081678/what3word.git
cd what3word
```

2. Install the locked Node.js dependencies:

```bash
npm ci
```

Use `npm install` instead when intentionally updating dependencies.

3. Install the Chromium browser required by Playwright:

```bash
npx playwright install chromium
```

On a fresh Linux machine, install Chromium and its operating-system dependencies with:

```bash
npx playwright install --with-deps chromium
```

The tests use `https://what3words.com/` directly. No environment variables, API key, or account are required.

## Execute tests

Run the complete Chromium suite in headless mode:

```bash
npm test
```

Run with a visible browser, which is useful when observing or troubleshooting the public website:

```bash
npm run test:headed
```

Run formatting, linting, type-checking, and tests together:

```bash
npm run check
```

After a test run, open the HTML report with:

```bash
npm run report
```

The public website may restrict automated headless traffic. If a run is blocked before the application loads, use headed mode for local verification and treat the result as an environment restriction rather than a product failure.

## Available commands

| Command                | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `npm test`             | Run all Chromium tests headlessly                 |
| `npm run test:headed`  | Run all tests with a visible browser              |
| `npm run test:debug`   | Run with Playwright Inspector and step debugging  |
| `npm run test:ui`      | Open Playwright UI mode                           |
| `npm run report`       | Open the latest HTML report                       |
| `npm run lint`         | Check ESLint rules                                |
| `npm run format`       | Format supported project files                    |
| `npm run format:check` | Verify formatting without modifying files         |
| `npm run typecheck`    | Type-check the TypeScript project                 |
| `npm run check`        | Run formatting, linting, type-checking, and tests |

## Project structure

- `docs/<feature>/` - requirements and test cases with traceability IDs
- `pageobject/` - private locators and behavior-level actions and assertions
- `fixture/` - typed Playwright fixtures that provide page objects
- `tests/` - readable scenario orchestration
- `test-data/` - typed, reusable test inputs and expected values
- `utils/` - shared helpers such as optional consent handling

Failure screenshots, videos, and traces are written to `test-results/`. The HTML report is written to `playwright-report/`.
