# Sharing Test Cases

## Common preconditions

- A browser listed by the selected desktop or mobile test case is available on the test device.
- The public what3words map is available at `https://what3words.com/`.
- The optional cookie-consent prompt has been accepted when displayed.
- Select a valid location so that its what3words address and canonical URL are visible and the `Share` action is enabled.
- Record the selected what3words address and current canonical URL for comparison with each share payload.
- Allow pop-ups and external application links from what3words.

## Test classification

| Test case       | Feature area     | Test level     | Test type                     | Priority | Suite           | External dependency         |
| --------------- | ---------------- | -------------- | ----------------------------- | -------- | --------------- | --------------------------- |
| TC-SH-001       | Share panel      | End-to-end     | Functional, positive          | Critical | Smoke           | None                        |
| TC-SH-002       | Share panel      | UI integration | Functional, accessibility     | High     | Core regression | None                        |
| TC-SH-003       | Share targets    | Integration    | Security, data integrity      | Critical | Core regression | External handlers           |
| TC-SH-SMS-001   | SMS sharing      | End-to-end     | Functional, positive          | High     | Regression      | Device SMS handler          |
| TC-SH-SMS-002   | SMS length       | End-to-end     | Boundary, data integrity      | High     | Compatibility   | SMS encoding and handler    |
| TC-SH-SMS-003   | SMS link         | End-to-end     | Functional, navigation        | Critical | Smoke           | SMS handler, browser        |
| TC-SH-SMS-004   | Recipient link   | End-to-end     | Functional, delivery          | Critical | External opt-in | Carrier, recipient browser  |
| TC-SH-EMAIL-001 | Email sharing    | End-to-end     | Functional, positive          | High     | Regression      | Default email handler       |
| TC-SH-EMAIL-002 | Email content    | End-to-end     | Functional, data integrity    | Critical | Regression      | Email handler               |
| TC-SH-EMAIL-003 | Email rendering  | End-to-end     | Compatibility, localization   | High     | Compatibility   | Email clients               |
| TC-SH-EMAIL-004 | Email deep link  | End-to-end     | Functional, navigation        | Critical | Smoke           | Email client, browser       |
| TC-SH-EMAIL-005 | Email clients    | End-to-end     | Compatibility, visual         | High     | Compatibility   | Gmail, Outlook, Apple Mail  |
| TC-SH-X-001     | X composer       | End-to-end     | Functional, positive, social  | Critical | Smoke           | X                           |
| TC-SH-X-002     | X payload        | End-to-end     | Boundary, data integrity      | High     | Regression      | X character counting        |
| TC-SH-X-003     | X cancellation   | End-to-end     | Functional, negative          | High     | Regression      | Controlled X account        |
| TC-SH-X-004     | X published link | End-to-end     | Functional, navigation        | Critical | External opt-in | Controlled X account        |
| TC-SH-FB-001    | Facebook dialog  | End-to-end     | Functional, positive, social  | Critical | Smoke           | Facebook                    |
| TC-SH-FB-002    | Facebook preview | End-to-end     | Metadata, visual              | High     | Compatibility   | Facebook, Open Graph cache  |
| TC-SH-FB-003    | Facebook cancel  | End-to-end     | Functional, negative          | High     | Regression      | Controlled Facebook account |
| TC-SH-FB-004    | Facebook link    | End-to-end     | Functional, navigation        | Critical | External opt-in | Controlled Facebook account |
| TC-SH-WA-001    | WhatsApp target  | End-to-end     | Functional, positive, message | Critical | Smoke           | WhatsApp                    |
| TC-SH-WA-002    | WhatsApp payload | End-to-end     | Data integrity, localization  | High     | Regression      | WhatsApp encoding           |
| TC-SH-WA-003    | WhatsApp cancel  | End-to-end     | Functional, negative          | High     | Regression      | Controlled WhatsApp account |
| TC-SH-WA-004    | Recipient link   | End-to-end     | Functional, delivery          | Critical | External opt-in | Recipient WhatsApp, browser |
| TC-SH-WA-005    | Link preview     | End-to-end     | Metadata, visual              | Medium   | Compatibility   | WhatsApp preview service    |
| TC-SH-WA-006    | Desktop routing  | End-to-end     | Compatibility                 | High     | Compatibility   | Desktop browsers, WhatsApp  |
| TC-SH-WA-007    | Mobile routing   | End-to-end     | Compatibility                 | High     | Compatibility   | Mobile browsers, WhatsApp   |

Suite meanings:

- **Smoke:** fast validation of each channel's primary launch and payload.
- **Core regression:** product-owned behavior that should be executed regularly.
- **Compatibility:** browser, operating-system, client, rendering, and provider observations.
- **External opt-in:** creates a real message, post, or story and requires controlled accounts, authorization, and cleanup.

## TC-SH-001 - Display available sharing channels

**Requirements:** REQ-SH-001

1. Select the `Share` action for the currently selected location.
2. Verify the sharing interface is displayed.
3. Verify SMS, Email, X, Facebook, and WhatsApp options are visible and enabled.
4. Verify the sharing interface identifies the selected location using its what3words address or canonical URL.

## TC-SH-002 - Close and reopen the Share interface

**Requirements:** REQ-SH-002

1. Open the Share interface and verify focus moves into it.
2. Select its visible close control.
3. Verify the interface closes, no external target opens, and focus returns to `Share`.
4. Reopen the Share interface.
5. Press Escape.
6. Verify the interface closes, no external target opens, and focus returns to `Share`.

## TC-SH-003 - Verify safe, location-specific channel targets

**Requirements:** REQ-SH-003

1. Record the selected what3words address and canonical URL.
2. Open the Share interface and inspect each channel target before completing any external action.
3. Verify web targets use HTTPS and an expected X, Facebook, WhatsApp, or what3words host; verify SMS and Email use the registered handler expected by the device.
4. Verify every payload identifies the currently selected location and contains no stale location value.
5. Verify no target contains an authentication token, account identifier, unrelated query data, or malformed encoding.
6. Close each external target without sending or publishing.

## TC-SH-SMS-001 - Open an SMS draft for the selected location

**Requirements:** REQ-SH-SMS-001

**Case-specific precondition:** Configure an SMS-capable device or operating-system SMS handler.

1. Open the sharing interface.
2. Select the SMS option.
3. Verify the configured SMS handler opens a new message.
4. Verify the message contains the selected what3words address or canonical URL recorded in the common preconditions.
5. Cancel the message without sending it.

## TC-SH-SMS-002 - Verify SMS character count and segmentation

**Requirements:** REQ-SH-SMS-002

**Case-specific precondition:** Use an SMS-capable device or analysis tool that reports encoding, character or septet count, and segment count.

1. Generate an SMS draft for an English what3words address.
2. Record the complete body, detected encoding, character or septet count, and segment count.
3. For GSM-7 content, calculate the expected device-level segmentation using 160 septets for one segment and 153 septets per concatenated segment.
4. Verify extended GSM-7 characters are counted as two septets when present.
5. Verify the explanatory copy, selected address, and complete URL are not truncated or split into unusable text.
6. Cancel the draft and generate an SMS draft for a Vietnamese what3words address such as `///viết chữ.âm nhạc.an nhàn`.
7. Record the complete body, detected encoding, character count, and segment count.
8. For Unicode content, calculate the expected device-level segmentation using 70 characters for one segment and 67 characters per concatenated segment.
9. Verify every Vietnamese character, the complete address, and the complete URL remain present after segmentation.
10. Cancel the message without sending it.

Record a product defect when the payload is already incomplete before handler launch. Record a compatibility observation when the complete payload is changed only after the operating-system handler or carrier processes it.

## TC-SH-SMS-003 - Verify the SMS location-link format

**Requirements:** REQ-SH-SMS-003

1. Generate an SMS draft for the location recorded in the common preconditions.
2. Verify the body contains exactly one complete what3words URL.
3. Verify the URL uses HTTPS and the expected what3words host.
4. Verify the URL contains no whitespace, broken line insertion, malformed percent sequences, or double percent-encoding.
5. Verify the URL's decoded address corresponds to the selected what3words address recorded in the common preconditions.
6. Activate the URL from the SMS draft.
7. Verify a browser opens what3words and displays the same selected what3words address.
8. Return to the SMS handler and cancel the message without sending it.

## TC-SH-SMS-004 - Open the SMS link on the recipient device

**Requirements:** REQ-SH-SMS-004

**Case-specific preconditions:**

- Use separate sender and recipient devices with valid phone numbers and SMS service.
- Ensure the recipient device has a supported browser and internet connection.
- Obtain permission to send the test message and account for any carrier charge.
- Record the what3words address and canonical URL selected on the sender device.

1. On the sender device, open the sharing interface and select SMS.
2. Enter the controlled recipient's phone number without changing the generated message body.
3. Send the SMS.
4. Verify the recipient device receives the message and reassembles all segments into complete, readable content.
5. Verify the received address and URL match the values recorded on the sender device.
6. Verify the received URL is displayed as one actionable link without truncation or inserted whitespace.
7. On the recipient device, activate the URL.
8. Verify the recipient's browser opens what3words using HTTPS.
9. Verify the displayed what3words address matches the address selected on the sender device.

## TC-SH-EMAIL-001 - Open an email draft for the selected location

**Requirements:** REQ-SH-EMAIL-001

**Case-specific precondition:** Configure a default email handler.

1. Open the sharing interface.
2. Select the Email option.
3. Verify the configured email handler opens a new draft.
4. Verify the draft has not been sent and no recipient is selected automatically.
5. Discard the draft without sending it.

## TC-SH-EMAIL-002 - Verify static and dynamic email content

**Requirements:** REQ-SH-EMAIL-002

**Case-specific precondition:** Configure a default email handler and retain the address and URL recorded in the common preconditions.

1. Open the sharing interface and select the Email option.
2. Record the generated subject and body.
3. Verify the subject is not empty and identifies the message as a shared what3words location.
4. Verify the body contains the selected what3words address and canonical URL recorded in the common preconditions.
5. Close the draft and return to what3words without sending it.
6. Select a different valid location and record its what3words address and canonical URL.
7. Open a new email draft from the Share interface.
8. Verify the explanatory copy is unchanged from the first draft.
9. Verify the new draft contains the second location's address and URL.
10. Verify the new draft does not contain the first location's address or URL.
11. Discard the draft without sending it.

## TC-SH-EMAIL-003 - Verify email encoding, fonts, and appearance modes

**Requirements:** REQ-SH-EMAIL-003

**Case-specific precondition:** Configure an email client that supports light and dark appearance modes. Select a Vietnamese what3words address, such as `///viết chữ.âm nhạc.an nhàn`, to exercise Unicode rendering.

1. Generate an email draft from the selected Vietnamese what3words location.
2. Verify the subject and body display readable text without replacement characters, missing-glyph boxes, mojibake, raw HTML, or visible percent-encoding.
3. Verify the Vietnamese address matches the selected address character for character, including spaces and diacritics.
4. In light mode, verify the subject, body, address, and link are readable with no clipped, overlapping, or invisible content.
5. Change the email client to dark mode.
6. Verify the same content remains readable with no clipped, overlapping, or invisible content.
7. Verify any font substitution preserves every character and does not change the meaning of the content.
8. Discard the draft without sending it.

## TC-SH-EMAIL-004 - Verify the email deep link

**Requirements:** REQ-SH-EMAIL-004

**Case-specific precondition:** Configure an email client that renders actionable links.

1. Generate an email draft for the location recorded in the common preconditions.
2. Verify the body contains one canonical what3words URL for the selected location.
3. Verify the link uses HTTPS and its encoded address corresponds to the selected what3words address.
4. Activate the link from the draft.
5. Verify a browser opens what3words using the link target.
6. Verify the displayed what3words address matches the address recorded before the draft was created.
7. Return to the email client and discard the draft without sending it.

## TC-SH-EMAIL-005 - Verify rendering across supported email clients

**Requirements:** REQ-SH-EMAIL-005

Execute the following matrix and record the application version, operating system, appearance mode, result, and evidence for every row:

| Client     | Variant                          | Appearance modes |
| ---------- | -------------------------------- | ---------------- |
| Gmail      | Web and supported mobile app     | Light, dark      |
| Outlook    | Web and supported desktop client | Light, dark      |
| Apple Mail | macOS and supported iOS client   | Light, dark      |

For each matrix row:

1. Generate or open the same what3words share draft in the target client.
2. Verify the complete subject and body are displayed.
3. Verify the selected what3words address and canonical URL match the source location.
4. Verify all characters are readable and no raw HTML, CSS, encoding sequences, or missing glyphs are displayed.
5. Verify the layout has no clipped, overlapping, unexpectedly hidden, or illegible content.
6. Verify the canonical URL is visually identifiable and actionable.
7. Repeat the rendering checks in light and dark modes.
8. Capture evidence and discard the draft without sending it.

## TC-SH-X-001 - Open the X composer with the selected location

**Requirements:** REQ-SH-X-001

1. Open the sharing interface and select X.
2. Verify an X-owned composer opens in a new tab, window, or supported X application.
3. When using a signed-out session, verify X requests authentication and does not lose the intended share destination after successful login.
4. Verify an editable post composer is displayed.
5. Verify the composer contains the selected location's canonical what3words URL recorded in the common preconditions.
6. Verify the location has not been posted automatically.
7. Close the composer without posting.

## TC-SH-X-002 - Verify the X payload and character count

**Requirements:** REQ-SH-X-002

1. Open the X composer for the location recorded in the common preconditions.
2. Record the pre-populated explanatory text and URL.
3. Verify the payload contains exactly one complete canonical what3words URL and no address or URL from a previously selected location.
4. Verify the text is readable and contains no truncation, mojibake, malformed percent-encoding, or unexpected raw HTML.
5. Verify the composer reports the payload within the standard 280-character limit.
6. Record X's URL character count; the current platform behavior counts a processed URL as 23 characters, but a future platform-policy change is a compatibility observation unless what3words supplies an invalid payload.
7. Verify the visitor can edit the text without corrupting the URL.
8. Close the composer without posting.

## TC-SH-X-003 - Cancel X sharing without creating a post

**Requirements:** REQ-SH-X-003

**Case-specific precondition:** Sign in with a controlled X test account and record the account's latest post.

1. Open the X composer for the selected location.
2. Close or cancel the composer without selecting `Post`.
3. Return to the controlled account's profile and refresh its posts.
4. Verify no new post contains the selected what3words address or canonical URL.

## TC-SH-X-004 - Publish and open the X location link

**Requirements:** REQ-SH-X-004

**Case-specific precondition:** Use a controlled X test account authorized for temporary test content.

1. Open the X composer for the selected location and verify its payload.
2. Publish the post.
3. Verify the new post appears on the controlled account's profile and contains an actionable link.
4. Activate the link from the published post.
5. Verify X's `t.co` redirect resolves to an HTTPS what3words URL.
6. Verify what3words displays the same address recorded before publishing.
7. Delete the temporary test post and verify it no longer appears on the profile.

## TC-SH-FB-001 - Open the Facebook Share Dialog

**Requirements:** REQ-SH-FB-001

1. Open the sharing interface and select Facebook.
2. Verify a Facebook-owned Share Dialog opens as a popup, page, or touch interface appropriate to the device.
3. When using a signed-out session, verify Facebook requests authentication and retains the intended share destination after successful login.
4. Verify the dialog is prepared to share the canonical what3words URL recorded in the common preconditions.
5. Verify the location has not been shared automatically.
6. Close the dialog without publishing.

## TC-SH-FB-002 - Verify Facebook link-preview metadata

**Requirements:** REQ-SH-FB-002

1. Open the Facebook Share Dialog for the selected location.
2. Verify the shared `href` resolves to the selected location's canonical HTTPS what3words URL.
3. Inspect the shared page metadata and record `og:title`, `og:type`, `og:image`, `og:url`, and optional description values.
4. Compare the source metadata with the product-approved metadata contract; do not assume the preview is location-specific when the approved contract is generic.
5. Verify the preview displays complete, readable fields from that approved contract without a broken required image.
6. Verify the shared `href` still identifies the selected canonical location even when preview text or imagery is intentionally generic.
7. Record whether any mismatch originates in the what3words source metadata or only in Facebook's cached preview.
8. Close the dialog without publishing.

## TC-SH-FB-003 - Cancel Facebook sharing without creating a story

**Requirements:** REQ-SH-FB-003

**Case-specific precondition:** Sign in with a controlled Facebook test account and record its latest timeline story.

1. Open the Facebook Share Dialog for the selected location.
2. Close or cancel the dialog without confirming the share.
3. Return to the controlled account's timeline and refresh it.
4. Verify no new story contains the selected what3words address or canonical URL.

## TC-SH-FB-004 - Publish and open the Facebook location link

**Requirements:** REQ-SH-FB-004

**Case-specific precondition:** Use a controlled Facebook test account authorized for temporary test content and select an audience that permits verification.

1. Open the Facebook Share Dialog and verify the selected location preview.
2. Publish the temporary story.
3. Verify the story appears on the controlled account's timeline with the selected audience.
4. Activate the location link from the published story.
5. Verify the link resolves to an HTTPS what3words URL.
6. Verify what3words displays the same address recorded before publishing.
7. Delete the temporary story and verify it no longer appears on the timeline.

## TC-SH-WA-001 - Open WhatsApp with a prefilled location message

**Requirements:** REQ-SH-WA-001

**Case-specific precondition:** Make an installed WhatsApp client or WhatsApp Web available on the test device.

1. Open the sharing interface and select WhatsApp.
2. Verify a WhatsApp-owned application, web page, or supported chooser opens.
3. Verify WhatsApp presents recipient selection or a chat composer.
4. Verify an editable message is prefilled before a recipient is selected or the message is sent.
5. Verify selecting WhatsApp does not send the message automatically.
6. Close the WhatsApp flow without sending.

## TC-SH-WA-002 - Verify the WhatsApp payload and encoding

**Requirements:** REQ-SH-WA-002

1. Generate a WhatsApp share message for the location recorded in the common preconditions.
2. Verify the prefilled message contains the selected what3words address and exactly one complete canonical HTTPS URL.
3. Verify the message contains no address or URL retained from a previously selected location.
4. Verify spaces, punctuation, and line breaks render as message content rather than visible URL-encoding sequences.
5. Verify the URL contains no whitespace, malformed percent sequences, or double percent-encoding.
6. Repeat with `///viết chữ.âm nhạc.an nhàn`.
7. Verify every Vietnamese character and diacritic is preserved without truncation, replacement characters, missing glyphs, or mojibake.
8. Close the WhatsApp flow without sending.

## TC-SH-WA-003 - Cancel WhatsApp sharing without sending a message

**Requirements:** REQ-SH-WA-003

**Case-specific precondition:** Use a controlled WhatsApp account and record its most recent conversations and messages.

1. Open the WhatsApp share flow for the selected location.
2. Select a controlled recipient to display the prefilled composer.
3. Close or cancel the composer without selecting `Send`.
4. Reopen the controlled conversation.
5. Verify no new message contains the selected what3words address or canonical URL.

## TC-SH-WA-004 - Open the WhatsApp link on the recipient device

**Requirements:** REQ-SH-WA-004

**Case-specific preconditions:**

- Use separate controlled sender and recipient WhatsApp accounts on separate devices.
- Ensure the recipient device has a supported browser and internet connection.
- Record the what3words address and canonical URL selected on the sender device.

1. On the sender device, open the WhatsApp share flow.
2. Select the controlled recipient and send the unmodified prefilled message.
3. Verify WhatsApp shows the message as sent and the recipient receives it.
4. Verify the received address and URL match the values recorded on the sender device.
5. Verify the URL is displayed as one actionable link without truncation or inserted whitespace.
6. On the recipient device, activate the URL.
7. Verify the recipient's browser opens what3words using HTTPS.
8. Verify the displayed what3words address matches the address selected on the sender device.
9. Delete the temporary message from the controlled conversation where test policy permits.

## TC-SH-WA-005 - Verify the WhatsApp link preview

**Requirements:** REQ-SH-WA-005

**Case-specific precondition:** Enable link previews in a controlled WhatsApp client and use a network that permits preview retrieval.

1. Prepare the WhatsApp share message for the selected location.
2. Wait for the client to finish generating the link preview before sending.
3. Verify the preview does not display a loading error or broken image.
4. Verify any displayed title, description, image, and destination identify what3words and do not identify another previously selected location.
5. Verify the underlying canonical URL remains complete even when WhatsApp does not generate a preview.
6. Close the WhatsApp flow without sending.

## TC-SH-WA-006 - Verify WhatsApp routing from desktop browsers

**Requirements:** REQ-SH-WA-006

Execute the following matrix and record the operating system, browser version, WhatsApp handler state, routing result, payload result, and evidence:

| Operating system | Browser | WhatsApp state               | Expected route                                      |
| ---------------- | ------- | ---------------------------- | --------------------------------------------------- |
| Windows          | Chrome  | Desktop installed and linked | WhatsApp Desktop or an explicit application chooser |
| Windows          | Edge    | No native handler            | WhatsApp Web login or device-linking flow           |
| macOS            | Chrome  | Desktop installed and linked | WhatsApp Desktop or an explicit application chooser |
| macOS            | Safari  | No native handler            | WhatsApp Web login or device-linking flow           |

For each matrix row:

1. Select WhatsApp from the what3words sharing interface.
2. Verify the expected WhatsApp route opens without a blank page or silent failure.
3. Verify authentication or device linking is requested when the selected client requires it.
4. Verify the what3words address and canonical URL survive routing and appear in the prefilled message.
5. Verify the message remains editable and is not sent automatically.
6. Close the flow without sending.

## TC-SH-WA-007 - Verify WhatsApp routing from mobile browsers

**Requirements:** REQ-SH-WA-007

Execute the following matrix and record the device, operating-system version, browser version, WhatsApp installation state, routing result, payload result, and evidence:

| Platform | Browser | WhatsApp state | Expected route                   |
| -------- | ------- | -------------- | -------------------------------- |
| Android  | Chrome  | Installed      | Installed WhatsApp application   |
| Android  | Chrome  | Not installed  | Usable web or installation route |
| iOS      | Safari  | Installed      | Installed WhatsApp application   |
| iOS      | Safari  | Not installed  | Usable web or installation route |

For each matrix row:

1. Select WhatsApp from the what3words Share interface.
2. Verify the expected application or fallback route opens without an empty target or silent failure.
3. Verify the selected what3words address and canonical URL survive routing.
4. When WhatsApp is installed, verify the message remains editable and is not sent automatically.
5. Return to the browser and verify the selected what3words location remains displayed.

## Coverage gaps

- Copy-link sharing and clipboard permissions.
- Full screen-reader announcements, high-contrast presentation, and zoom behavior beyond the close/focus checks in TC-SH-002.
- Pop-up blocking and missing SMS, Email, or WhatsApp handlers.
- Third-party authentication, service errors, rate limiting, and offline behavior.
- Responsive visual layout beyond the WhatsApp mobile-routing matrix.
- Carrier delivery time, duplicate delivery, and delivery failure recovery; TC-SH-SMS-004 validates the recipient journey after successful controlled delivery.
- Posting failures, moderation, reach, engagement, and long-term availability on X or Facebook; controlled publish cases validate only the immediate shared-link journey.
- WhatsApp delivery delay, read receipts, blocking, disappearing messages, and delivery-failure recovery; the controlled recipient case validates only successful immediate delivery.
- Pixel-identical rendering across clients; native fonts and client-controlled link styling may differ.
- Spam filtering, inbox placement, and rendering after delivery because the current scope validates the generated draft.

## Execution result template

Execution results must be recorded separately from the reusable test steps. Use one row per test case and environment so a desktop pass does not hide a mobile failure.

| Test case | Environment                            | Status  | Duration | Tester   | Evidence | Defect or note |
| --------- | -------------------------------------- | ------- | -------- | -------- | -------- | -------------- |
| `<ID>`    | `<device, OS, browser/client version>` | Not run | `<time>` | `<name>` | `<link>` | `<reference>`  |

Allowed statuses are `Passed`, `Failed`, `Blocked`, `Not run`, and `Not applicable`. A third-party outage or policy change must be recorded as `Blocked` or a compatibility note unless evidence shows that what3words generated an incorrect target or payload.

## Automation status

All twenty-seven cases are documented for manual execution. No Sharing test is currently implemented in the Playwright suite.
