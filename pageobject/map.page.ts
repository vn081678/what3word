import { expect, type Locator, type Page } from '@playwright/test';
import { dismissConsentIfPresent } from '../utils/consent';

export class MapPage {
  private readonly searchInput: Locator;

  public constructor(private readonly page: Page) {
    this.searchInput = page.getByPlaceholder(/search|address|place/i).first();
  }

  public async open(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  public async handleOptionalConsent(): Promise<void> {
    await dismissConsentIfPresent(this.page);
  }

  public async searchForAddress(address: string): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(address);

    const normalizedAddress = address.replace(/^\/{3}/, '');
    const matchingSuggestion = this.page
      .getByRole('option', { name: new RegExp(normalizedAddress.replaceAll('.', '\\.')) })
      .or(this.page.getByText(normalizedAddress, { exact: false }))
      .last();

    if (await matchingSuggestion.isVisible({ timeout: 5_000 }).catch(() => false)) {
      await matchingSuggestion.click();
    } else {
      await this.searchInput.press('Enter');
    }
  }

  public async assertAddressSelected(expectedAddress: string): Promise<void> {
    await expect
      .poll(async () => {
        const inputValue = await this.searchInput.inputValue().catch(() => '');
        const pageUrl = decodeURIComponent(this.page.url());
        const visibleMatch = await this.page
          .getByText(expectedAddress, { exact: false })
          .first()
          .isVisible()
          .catch(() => false);

        return (
          inputValue.includes(expectedAddress) || pageUrl.includes(expectedAddress) || visibleMatch
        );
      })
      .toBe(true);
  }
}
