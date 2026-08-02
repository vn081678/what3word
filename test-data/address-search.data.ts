export interface AddressSearchCase {
  readonly id: string;
  readonly address: string;
  readonly expectedAddress: string;
}

export const validAddressSearch: AddressSearchCase = {
  id: 'TC-AS-001',
  address: '///filled.count.soap',
  expectedAddress: 'filled.count.soap',
};
