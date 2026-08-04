import { expect, type Locator, type Page } from '@playwright/test';
import { dismissConsentIfPresent } from '../utils/consent';

export class MapPage {
  // Prefer accessible roles and names. Use stable product test IDs only when an element
  // has no useful accessible name, such as the icon-only clear button.
  private readonly searchInput: Locator;
  private readonly clearSearchButton: Locator;
  private readonly searchGuidance: Locator;
  private readonly resultsHeading: Locator;
  private readonly recommendations: Locator;
  private readonly selectedAddress: Locator;
  private readonly shareButton: Locator;
  private readonly navigateButton: Locator;
  private readonly saveButton: Locator;
  private readonly noAddressFoundAlert: Locator;

  // Captures navigation state before selecting a volatile provider result.
  private urlBeforeSelection?: string;

  public constructor(private readonly page: Page) {
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.clearSearchButton = page.getByTestId('search-cancel-button');
    this.searchGuidance = page.getByTestId('search-empty-state');
    this.resultsHeading = page.getByRole('heading', { name: 'Results' });
    this.recommendations = page.locator('[data-search-result-index]');
    this.selectedAddress = page.getByTestId('resizable-text-container');
    this.shareButton = page.getByTestId('share-button');
    this.navigateButton = page.getByTestId('navigate-button');
    this.saveButton = page.getByTestId('save-button');
    this.noAddressFoundAlert = page.getByRole('alert').filter({ hasText: 'No address found.' });
  }

  public async open(): Promise<void> {
    await this.page.goto('/');
    // DOM readiness is sufficient; map tiles and advertisements may continue loading.
    await this.page.waitForLoadState('domcontentloaded');
  }

  public async handleOptionalConsent(): Promise<void> {
    // Consent is region/session dependent and should not block feature assertions.
    await dismissConsentIfPresent(this.page);
  }

  public async focusSearch(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.click();
  }

  public async fillSearch(query: string): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await this.searchInput.fill(query);
  }

  public async clearSearch(): Promise<void> {
    await this.clearSearchButton.click();
  }

  public async selectRecommendation(index: number): Promise<void> {
    const recommendation = this.recommendations.nth(index);

    // Save the original URL so resilient place searches can prove navigation occurred
    // without hard-coding external provider content.
    this.urlBeforeSelection = this.page.url();
    await expect(recommendation).toBeVisible();
    await recommendation.click();
  }

  public async submitSearch(): Promise<void> {
    await this.searchInput.press('Enter');
  }

  public async assertSearchGuidanceVisible(): Promise<void> {
    await expect(this.searchGuidance).toBeVisible();

    // A scoped ARIA snapshot validates human-visible guidance without comparing
    // dynamic map pixels or full-page advertisements.
    await expect(this.searchGuidance).toMatchAriaSnapshot(`
      - paragraph: Search for any place or what3words address
      - paragraph: e.g. 65 Alfred Road Notting Hill, London ///limit.broom.flip
    `);
  }

  public async assertClearControlVisible(): Promise<void> {
    await expect(this.clearSearchButton).toBeVisible();
  }

  public async assertSearchClearedAndBlurred(): Promise<void> {
    await expect(this.searchInput).toHaveValue('');
    await expect(this.searchInput).not.toBeFocused();
    await expect(this.searchGuidance).toBeHidden();
    await expect(this.resultsHeading).toBeHidden();
  }

  public async assertRecommendationCount(expectedCount: number): Promise<void> {
    await expect(this.resultsHeading).toBeVisible();
    await expect(this.recommendations).toHaveCount(expectedCount);
  }

  public async assertRecommendationAddress(index: number, expectedText: string): Promise<void> {
    await expect(this.recommendations.nth(index)).toContainText(expectedText);
  }

  public async assertSelectedLocationChanged(): Promise<void> {
    await expect(this.selectedAddress).toBeVisible();
    await expect(this.selectedAddress).toHaveText(/^\/\/\/.+\..+\..+$/);

    // Normal address/place recommendations are provider controlled. Verify navigation
    // occurred without hard-coding a result that can change over time.
    if (!this.urlBeforeSelection) {
      throw new Error('Select a recommendation before asserting the location change.');
    }
    await expect(this.page).not.toHaveURL(this.urlBeforeSelection);
  }

  public async assertSelectedAddress(expectedAddress: string): Promise<void> {
    // Exact what3words queries are deterministic, so verify both displayed text and URL.
    const normalizedAddress = expectedAddress.replace(/^\/{3}/, '');

    // Vietnamese addresses retain spaces in the UI but remove them in the canonical URL.
    const urlAddress = normalizedAddress.replaceAll(' ', '');
    await expect(this.selectedAddress).toContainText(`///${normalizedAddress}`);
    await expect.poll(() => decodeURIComponent(this.page.url())).toContain(`/${urlAddress}`);
  }

  public async assertLocationActionsVisible(): Promise<void> {
    await expect(this.shareButton).toBeVisible();
    await expect(this.navigateButton).toBeVisible();
    await expect(this.saveButton).toBeVisible();
  }

  public async assertNoAddressFound(title: string, message: string): Promise<void> {
    // Filtered alert locator excludes the framework's empty route-announcer alert.
    await expect(this.noAddressFoundAlert).toBeVisible();
    await expect(this.noAddressFoundAlert).toContainText(title);
    await expect(this.noAddressFoundAlert).toContainText(message);
    await expect(this.resultsHeading).toBeHidden();
  }
}
