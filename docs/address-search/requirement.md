# Address Search Requirements

## Document information

| Field          | Value          |
| -------------- | -------------- |
| Feature        | Address search |
| Requirement ID | REQ-AS-001     |
| Status         | Active         |

## Requirement

A visitor must be able to enter a valid three-word address on the what3words map and navigate to the matching location.

## Preconditions

- The public what3words map is available.
- The visitor has a working internet connection.
- No authenticated account or API key is required.

## Acceptance criteria

1. The map provides a visible address-search control.
2. Entering `///filled.count.soap` produces a matching suggestion or direct result.
3. Selecting or submitting the address updates the application to identify `filled.count.soap`.
4. An optional cookie-consent dialog does not prevent the search.

## Traceability

| Requirement | Test case | Automated spec                 |
| ----------- | --------- | ------------------------------ |
| REQ-AS-001  | TC-AS-001 | `tests/address-search.spec.ts` |
