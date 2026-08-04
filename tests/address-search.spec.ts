import { test } from '../fixture/page.fixture';
import { addressSearchData, invalidAddressSearchData } from '../test-data/address-search.data';

test.describe('Address search', () => {
  // Run sequentially to avoid rate-limiting the public search service.
  test.describe.configure({ mode: 'default' });

  test.beforeEach(async ({ mapPage }) => {
    // Shared setup: start every scenario from a clean map page and remove optional consent UI.
    await mapPage.open();
    await mapPage.handleOptionalConsent();
  });

  test('TC-AS-001 | displays search guidance on focus', async ({ mapPage }) => {
    // Arrange
    // The shared setup has opened the map without focusing the search field.

    // Act
    await mapPage.focusSearch();

    // Assert
    await mapPage.assertSearchGuidanceVisible();
    await mapPage.assertClearControlVisible();
  });

  test('TC-AS-002 | clears and dismisses the search input', async ({ mapPage }) => {
    // Arrange
    await mapPage.focusSearch();
    await mapPage.fillSearch(addressSearchData.place.address);

    // Act
    await mapPage.clearSearch();

    // Assert
    await mapPage.assertSearchClearedAndBlurred();
  });

  test('TC-AS-003 | searches for a street address', async ({ mapPage }) => {
    // Arrange
    const testData = addressSearchData.streetAddress;

    // Act
    await mapPage.fillSearch(testData.address);

    // Assert: provider-controlled text is intentionally not hard-coded.
    await mapPage.assertRecommendationCount(testData.expectedRecommendationCount);

    // Act
    await mapPage.selectRecommendation(0);

    // Assert
    await mapPage.assertSelectedLocationChanged();
    await mapPage.assertLocationActionsVisible();
  });

  test('TC-AS-004 | searches for a place', async ({ mapPage }) => {
    // Arrange
    const testData = addressSearchData.place;

    // Act
    await mapPage.fillSearch(testData.address);

    // Assert
    await mapPage.assertRecommendationCount(testData.expectedRecommendationCount);

    // Act
    await mapPage.selectRecommendation(0);

    // Assert: validate the selected-location contract without depending on volatile map data.
    await mapPage.assertSelectedLocationChanged();
    await mapPage.assertLocationActionsVisible();
  });

  test('TC-AS-005 | searches for an English what3words address', async ({ mapPage }) => {
    // Arrange
    const testData = addressSearchData.englishThreeWord;

    // Act
    await mapPage.fillSearch(testData.address);

    // Assert: an exact what3words query has a deterministic expected result.
    await mapPage.assertRecommendationCount(testData.expectedRecommendationCount);
    await mapPage.assertRecommendationAddress(0, testData.expectedThreeWordAddress);

    // Act
    await mapPage.selectRecommendation(0);

    // Assert
    await mapPage.assertSelectedAddress(testData.expectedThreeWordAddress);
    await mapPage.assertLocationActionsVisible();
  });

  test('TC-AS-006 | searches for a Vietnamese what3words address', async ({ mapPage }) => {
    // Arrange
    const testData = addressSearchData.vietnameseThreeWord;

    // Act
    await mapPage.fillSearch(testData.address);

    // Assert: preserve and validate Unicode characters and spaces in the displayed address.
    await mapPage.assertRecommendationCount(testData.expectedRecommendationCount);
    await mapPage.assertRecommendationAddress(0, testData.expectedThreeWordAddress);

    // Act
    await mapPage.selectRecommendation(0);

    // Assert
    await mapPage.assertSelectedAddress(testData.expectedThreeWordAddress);
    await mapPage.assertLocationActionsVisible();
  });

  test('TC-AS-007 | shows a warning for an invalid address', async ({ mapPage }) => {
    // Arrange
    const testData = invalidAddressSearchData;

    // Act
    await mapPage.fillSearch(testData.address);
    await mapPage.submitSearch();

    // Assert
    await mapPage.assertNoAddressFound(
      testData.expectedWarningTitle,
      testData.expectedWarningMessage,
    );
  });
});
