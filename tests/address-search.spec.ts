import { test } from '../fixture/page.fixture';
import { validAddressSearch } from '../test-data/address-search.data';

test.describe('Address search', () => {
  test(`${validAddressSearch.id} | REQ-AS-001 | finds a valid three-word address`, async ({
    mapPage,
  }) => {
    await mapPage.open();
    await mapPage.handleOptionalConsent();
    await mapPage.searchForAddress(validAddressSearch.address);
    await mapPage.assertAddressSelected(validAddressSearch.expectedAddress);
  });
});
