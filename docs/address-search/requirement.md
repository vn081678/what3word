# Address Search Requirements

## Document information

| Field           | Value                    |
| --------------- | ------------------------ |
| Feature         | Address search           |
| Requirement IDs | REQ-AS-001 to REQ-AS-005 |
| Status          | Active                   |

## Preconditions

- The public what3words map is available.
- The visitor has a working internet connection.
- No authenticated account or API key is required.
- An optional cookie-consent dialog has been dismissed when displayed.

## Functional requirements

### REQ-AS-001 - Search guidance

When the visitor clicks or focuses the search input, the application must display search guidance and a clear (`X`) control.

The guidance must communicate the following examples:

> Search for any place or what3words address  
> e.g. 65 Alfred Road  
> Notting Hill, London  
> ///limit.broom.flip

### REQ-AS-002 - Clear and dismiss search

When the visitor selects the `X` control, the application must:

1. Clear all existing text from the search input.
2. Remove focus from the search input.
3. Dismiss the active search guidance or recommendation panel.

### REQ-AS-003 - Search and recommendations

1. The visitor must be able to search using either:
   - A normal place or street address.
   - A valid English what3words address.
   - A valid Vietnamese what3words address containing spaces and Vietnamese characters.
2. After the visitor enters a valid normal place or street address, the application must display five recommendations.
3. After the visitor enters a valid English or Vietnamese what3words address, the application must display three recommendations.
4. The visitor must be able to select the first recommendation.
5. Recommendation content for normal place and street searches is supplied by an external provider and may change; automation must select the first visible recommendation without hard-coding its text.

### REQ-AS-004 - Selected-location result

After the visitor selects the first recommendation:

1. The map must update to show the selected location.
2. A what3words address beginning with `///` must be visible below the search bar.
3. The `Share`, `Navigate`, and `Save` actions must be visible.
4. For a normal place or street search, the selected address must differ from the previously displayed address and the URL must update to the selected three-word address.

### REQ-AS-005 - Invalid address handling

When the visitor searches for an address that cannot be found, the application must display the following warning and must not present the query as a valid location:

> **No address found.**  
> Please try searching for the town or nearby place and zoom in to find the what3words address.

Submitting the invalid query `fdasfdsa` with the Enter key must produce this warning.

## Search examples

- `77 vo van kiet`
- `Ho Chi Minh City`
- `///become.outlooks.rising`
- `///viết chữ.âm nhạc.an nhàn`
- `fdasfdsa` (invalid)

## Traceability

| Requirement | Test cases             | Automated spec                              |
| ----------- | ---------------------- | ------------------------------------------- |
| REQ-AS-001  | TC-AS-001              | Automated in `tests/address-search.spec.ts` |
| REQ-AS-002  | TC-AS-002              | Automated in `tests/address-search.spec.ts` |
| REQ-AS-003  | TC-AS-003 to TC-AS-006 | Automated in `tests/address-search.spec.ts` |
| REQ-AS-004  | TC-AS-003 to TC-AS-006 | Automated in `tests/address-search.spec.ts` |
| REQ-AS-005  | TC-AS-007              | Automated in `tests/address-search.spec.ts` |
