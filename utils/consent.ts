import type { Page } from '@playwright/test';

const CONSENT_BUTTON_NAMES = /accept( all)?|agree|allow all/i;

/** Dismisses an optional consent dialog without delaying tests when it is absent. */
export async function dismissConsentIfPresent(page: Page): Promise<void> {
  const consentButton = page.getByRole('button', { name: CONSENT_BUTTON_NAMES }).first();

  if (await consentButton.isVisible({ timeout: 2_000 }).catch(() => false)) {
    await consentButton.click();
  }
}
