# Address Search Test Cases

## Common preconditions

- Chromium is installed for Playwright.
- `BASE_URL` resolves to the public what3words map; otherwise the default URL is used.
- The optional cookie-consent prompt is accepted when displayed.

## Test classification

| Test case | Feature area                 | Test level     | Test type                                  | Priority | Suite             | Data concern                         |
| --------- | ---------------------------- | -------------- | ------------------------------------------ | -------- | ----------------- | ------------------------------------ |
| TC-AS-001 | Search guidance              | UI integration | Functional, positive                       | Medium   | Regression        | Static guidance content              |
| TC-AS-002 | Clear and dismiss            | UI integration | Functional, positive                       | High     | Regression        | Input and focus state                |
| TC-AS-003 | Street-address search        | End-to-end     | Functional, positive                       | Critical | Smoke, regression | Vietnamese result data               |
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
3. Verify the first recommendation identifies `///mãng cầu.bờm tóc.hè phố`.
4. Select the first recommendation.
5. Verify the map updates to the selected location.
6. Verify `///mãng cầu.bờm tóc.hè phố` is displayed below the search bar.
7. Verify the `Share`, `Navigate`, and `Save` actions are visible.

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
2. Submit the query if the application does not search automatically.
3. Verify the warning title `No address found.` is displayed.
4. Verify the supporting message `Please try searching for the town or nearby place and zoom in to find the what3words address.` is displayed.
5. Verify the invalid query is not presented as a selected location.

## Page Object Model analysis

All seven cases exercise one browser page, so they should use the existing `MapPage` supplied by the typed `mapPage` fixture. A separate page object is not needed until a test opens another page or a feature such as the Share panel develops substantial behavior of its own.

Locators must remain private inside `MapPage`. Test specs should call behavior-level actions and assertions instead of accessing selectors or Playwright `Locator` objects directly.

### Recommended `MapPage` interface

| Method                                        | Responsibility                                                    | Status                                        |
| --------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------- |
| `open()`                                      | Navigate to the configured base URL.                              | Existing                                      |
| `handleOptionalConsent()`                     | Dismiss the consent prompt when it is present.                    | Existing                                      |
| `focusSearch()`                               | Focus the search input and display its guidance.                  | Add                                           |
| `fillSearch(query)`                           | Enter a query without selecting a recommendation.                 | Add                                           |
| `clearSearch()`                               | Select the `X` control.                                           | Add                                           |
| `selectRecommendation(index)`                 | Select a recommendation by zero-based position.                   | Add                                           |
| `searchForAddress(query)`                     | Convenience flow that enters a query and selects or submits it.   | Existing; retain for simple smoke coverage    |
| `assertSearchGuidanceVisible()`               | Verify the heading and all documented guidance examples.          | Add                                           |
| `assertClearControlVisible()`                 | Verify the `X` control is available.                              | Add                                           |
| `assertSearchClearedAndBlurred()`             | Verify the input is empty, unfocused, and its panel is dismissed. | Add                                           |
| `assertRecommendationCount(count)`            | Verify the exact number of displayed recommendations.             | Add                                           |
| `assertRecommendationAddress(index, address)` | Verify the expected what3words address in a recommendation.       | Add                                           |
| `assertSelectedLocation(address?)`            | Verify the result state and, when supplied, the selected address. | Add; replaces the narrower existing assertion |
| `assertLocationActionsVisible()`              | Verify `Share`, `Navigate`, and `Save` are visible.               | Add                                           |
| `assertNoAddressFound(title, message)`        | Verify the invalid-search warning title and supporting message.   | Add                                           |

### Fixture and spec responsibilities

- The `page.fixture.ts` fixture constructs `MapPage`; it must not contain test steps or assertions.
- The spec selects the appropriate typed data row and orchestrates the scenario using the methods above.
- `MapPage` owns UI synchronization and accessible selectors. Specs must not add sleeps, CSS selectors, or direct locator assertions.
- The POM must not hide acceptance criteria inside one oversized workflow method. Granular methods keep recommendation counts, first-result content, focus state, and result actions independently verifiable.

## Automation status

The current `MapPage` supports navigation, optional consent handling, a composite search, and a basic selected-address assertion. The methods marked **Add** above are the required POM extensions before automating all documented cases.
