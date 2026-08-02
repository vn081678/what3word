import { test as base, expect } from '@playwright/test';
import { MapPage } from '../pageobject/map.page';

interface PageFixtures {
  mapPage: MapPage;
}

export const test = base.extend<PageFixtures>({
  mapPage: async ({ page }, use) => {
    await use(new MapPage(page));
  },
});

export { expect };
