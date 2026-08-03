import { test } from '../fixture/page.fixture';
import { addressSearchData } from '../test-data/address-search.data';

test.describe('Address search', () => {
  test('TC-AS-005 | REQ-AS-003, REQ-AS-004 | finds a valid English what3words address', async ({
    mapPage,
  }) => {
    const testData = addressSearchData.englishThreeWord;

    await mapPage.open();
    await mapPage.handleOptionalConsent();
    await mapPage.searchForAddress(testData.address);
    await mapPage.assertAddressSelected(testData.expectedAddress);
  });
});
