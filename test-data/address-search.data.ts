export type SearchInputType = 'street-address' | 'place' | 'what3words-en' | 'what3words-vi';

export interface AddressSearchData {
  readonly inputType: SearchInputType;
  readonly address: string;
  readonly expectedAddress: string;
  readonly expectedRecommendationCount: number;
  readonly expectedFirstRecommendation?: string;
}

export interface InvalidAddressSearchData {
  readonly address: string;
  readonly expectedWarningTitle: string;
  readonly expectedWarningMessage: string;
}

export const addressSearchData = {
  streetAddress: {
    inputType: 'street-address',
    address: '77 vo van kiet',
    expectedAddress: 'mãng cầu.bờm tóc.hè phố',
    expectedRecommendationCount: 5,
    expectedFirstRecommendation: 'mãng cầu.bờm tóc.hè phố',
  },
  place: {
    inputType: 'place',
    address: 'Ho Chi Minh City',
    expectedAddress: 'Ho Chi Minh City',
    expectedRecommendationCount: 5,
  },
  englishThreeWord: {
    inputType: 'what3words-en',
    address: '///become.outlooks.rising',
    expectedAddress: 'become.outlooks.rising',
    expectedRecommendationCount: 3,
  },
  vietnameseThreeWord: {
    inputType: 'what3words-vi',
    address: '///viết chữ.âm nhạc.an nhàn',
    expectedAddress: 'viết chữ.âm nhạc.an nhàn',
    expectedRecommendationCount: 3,
  },
} as const satisfies Record<string, AddressSearchData>;

export const invalidAddressSearchData: InvalidAddressSearchData = {
  address: 'fdasfdsa',
  expectedWarningTitle: 'No address found.',
  expectedWarningMessage:
    'Please try searching for the town or nearby place and zoom in to find the what3words address.',
};
