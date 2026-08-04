# Address Search Test Cases

## Common preconditions

- Chromium is installed for Playwright.
- The public what3words map is available at `https://what3words.com/`.
- The optional cookie-consent prompt is accepted when displayed.

## Test classification

| Test case | Feature area                 | Test level     | Test type                                  | Priority | Suite             | Data concern                         |
| --------- | ---------------------------- | -------------- | ------------------------------------------ | -------- | ----------------- | ------------------------------------ |
| TC-AS-001 | Search guidance              | UI integration | Functional, positive                       | Medium   | Regression        | Static guidance content              |
| TC-AS-002 | Clear and dismiss            | UI integration | Functional, positive                       | High     | Regression        | Input and focus state                |
| TC-AS-003 | Street-address search        | End-to-end     | Functional, positive                       | Critical | Smoke, regression | Volatile external-provider result    |
| TC-AS-004 | Place search                 | End-to-end     | Functional, positive                       | High     | Smoke, regression | Normal place name                    |
| TC-AS-005 | English what3words search    | End-to-end     | Functional, positive                       | Critical | Smoke, regression | English three-word address           |
| TC-AS-006 | Vietnamese what3words search | End-to-end     | Functional, positive, internationalization | High     | Regression        | UTF-8, spaces, Vietnamese characters |
| TC-AS-007 | Invalid address search       | UI integration | Functional, negative                       | High     | Regression        | No-result warning content            |

The suite now covers positive searches and one invalid, no-result path. Network/API failures, accessibility, responsive layouts, browser compatibility, performance, and security require separate cases and are not covered by this set.

## TC-AS-001 - Display search guidance on focus

**Requirements:** REQ-AS-001

1. Open the application.
2. Click the search input.
3. Verify the guidance displays `Search for any place or what3words address` and the examples `65 Alfred Road`, `Notting Hill, London`, and `///limit.broom.flip`.
4. Verify the `X` control is visible.

## TC-AS-002 - Clear and dismiss the search input

**Requirements:** REQ-AS-002

1. Focus the search input and enter any text.
2. Select the `X` control.
3. Verify the input is empty.
4. Verify the input no longer has focus.
5. Verify the search guidance or recommendation panel is dismissed.

## TC-AS-003 - Search for a street address

**Requirements:** REQ-AS-003, REQ-AS-004

1. Enter `77 vo van kiet` in the search input.
2. Verify five recommendations are displayed.
3. Select the first recommendation without assuming provider-controlled result text.
4. Verify the selected `///` address differs from the address shown before selection.
5. Verify the URL updates to the selected three-word address.
6. Verify the `Share`, `Navigate`, and `Save` actions are visible.

## TC-AS-004 - Search for a place

**Requirements:** REQ-AS-003, REQ-AS-004

1. Enter `Ho Chi Minh City` in the search input.
2. Verify five recommendations are displayed.
3. Select the first recommendation.
4. Verify the map updates and a selected what3words address is displayed.
5. Verify the `Share`, `Navigate`, and `Save` actions are visible.

## TC-AS-005 - Search for an English what3words address

**Requirements:** REQ-AS-003, REQ-AS-004

1. Enter `///become.outlooks.rising` in the search input.
2. Verify three recommendations are displayed.
3. Select the first recommendation.
4. Verify the map updates and `///become.outlooks.rising` is displayed.
5. Verify the `Share`, `Navigate`, and `Save` actions are visible.

## TC-AS-006 - Search for a Vietnamese what3words address

**Requirements:** REQ-AS-003, REQ-AS-004

1. Enter `///viết chữ.âm nhạc.an nhàn` in the search input.
2. Verify three recommendations are displayed.
3. Select the first recommendation.
4. Verify the map updates and `///viết chữ.âm nhạc.an nhàn` is displayed.
5. Verify the `Share`, `Navigate`, and `Save` actions are visible.

## TC-AS-007 - Show a warning for an invalid address

**Requirements:** REQ-AS-005

1. Enter `fdasfdsa` in the search input.
2. Press Enter to submit the query.
3. Verify the warning title `No address found.` is displayed.
4. Verify the supporting message `Please try searching for the town or nearby place and zoom in to find the what3words address.` is displayed.
5. Verify the invalid query is not presented as a selected location.

## Page Object Model analysis

All seven cases exercise one browser page, so they should use the existing `MapPage` supplied by the typed `mapPage` fixture. A separate page object is not needed until a test opens another page or a feature such as the Share panel develops substantial behavior of its own.

Locators must remain private inside `MapPage`. Test specs should call behavior-level actions and assertions instead of accessing selectors or Playwright `Locator` objects directly.

### Recommended `MapPage` interface

| Method                                        | Responsibility                                                    | Status   |
| --------------------------------------------- | ----------------------------------------------------------------- | -------- |
| `open()`                                      | Navigate to the configured base URL.                              | Existing |
| `handleOptionalConsent()`                     | Dismiss the consent prompt when it is present.                    | Existing |
| `focusSearch()`                               | Focus the search input and display its guidance.                  | Existing |
| `fillSearch(query)`                           | Enter a query without selecting a recommendation.                 | Existing |
| `clearSearch()`                               | Select the `X` control.                                           | Existing |
| `selectRecommendation(index)`                 | Select a recommendation by zero-based position.                   | Existing |
| `submitSearch()`                              | Submit the current query with the Enter key.                      | Existing |
| `assertSearchGuidanceVisible()`               | Verify the heading and all documented guidance examples.          | Existing |
| `assertClearControlVisible()`                 | Verify the `X` control is available.                              | Existing |
| `assertSearchClearedAndBlurred()`             | Verify the input is empty, unfocused, and its panel is dismissed. | Existing |
| `assertRecommendationCount(count)`            | Verify the exact number of displayed recommendations.             | Existing |
| `assertRecommendationAddress(index, address)` | Verify the expected what3words address in a recommendation.       | Existing |
| `assertSelectedLocationChanged()`             | Verify a provider-controlled result and URL navigation.           | Existing |
| `assertSelectedAddress(address)`              | Verify an exact selected what3words address and canonical URL.    | Existing |
| `assertLocationActionsVisible()`              | Verify `Share`, `Navigate`, and `Save` are visible.               | Existing |
| `assertNoAddressFound(title, message)`        | Verify the invalid-search warning title and supporting message.   | Existing |

### Fixture and spec responsibilities

- The `page.fixture.ts` fixture constructs `MapPage`; it must not contain test steps or assertions.
- The spec selects the appropriate typed data row and orchestrates the scenario using the methods above.
- `MapPage` owns UI synchronization and accessible selectors. Specs must not add sleeps, CSS selectors, or direct locator assertions.
- The POM must not hide acceptance criteria inside one oversized workflow method. Granular methods keep recommendation counts, first-result content, focus state, and result actions independently verifiable.

## Automation status

All seven documented cases are implemented in `tests/address-search.spec.ts` using the shared `MapPage` fixture and semantic test data.

## Latest execution result

| Field       | Value                                      |
| ----------- | ------------------------------------------ |
| Executed on | 2026-08-04                                 |
| Environment | Public what3words website                  |
| Browser     | Chromium, headed mode                      |
| Workers     | 1                                          |
| Command     | `npx playwright test --headed --workers=1` |
| Result      | 7 passed, 0 failed                         |
| Total time  | 30.9 seconds                               |

| Test case | Status | Duration |
| --------- | ------ | -------- |
| TC-AS-001 | Passed | 4.0 s    |
| TC-AS-002 | Passed | 3.5 s    |
| TC-AS-003 | Passed | 5.2 s    |
| TC-AS-004 | Passed | 4.3 s    |
| TC-AS-005 | Passed | 4.7 s    |
| TC-AS-006 | Passed | 4.9 s    |
| TC-AS-007 | Passed | 3.2 s    |

Durations are observations from this execution, not performance acceptance criteria. Network conditions and the public search provider can affect later runs, so this table should be replaced with the latest verified result before a release or assessment submission.
