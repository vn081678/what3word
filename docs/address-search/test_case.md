# Address Search Test Cases

## TC-AS-001 — Search for a valid three-word address

| Field       | Value                  |
| ----------- | ---------------------- |
| Requirement | REQ-AS-001             |
| Priority    | High                   |
| Type        | End-to-end, positive   |
| Test data   | `///filled.count.soap` |

### Preconditions

- Chromium is installed for Playwright.
- `BASE_URL` resolves to the public what3words map; otherwise the default URL is used.

### Steps and expected results

| Step | Action                                                                 | Expected result                                                 |
| ---- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| 1    | Open the application.                                                  | The map application loads.                                      |
| 2    | Accept the optional consent prompt when displayed.                     | The prompt no longer blocks the search control.                 |
| 3    | Enter `///filled.count.soap` in the search control.                    | A matching suggestion or result becomes available.              |
| 4    | Select the match, or submit the search when no suggestion is required. | The map identifies `filled.count.soap` as the selected address. |

### Automation

Implemented by `tests/address-search.spec.ts` and executed in the Chromium project.
