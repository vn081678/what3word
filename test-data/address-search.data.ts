export interface AddressSearchData {
  readonly address: string;
  readonly expectedRecommendationCount: number;
  readonly expectedThreeWordAddress?: string;
}

export interface InvalidAddressSearchData {
  readonly address: string;
  readonly expectedWarningTitle: string;
  readonly expectedWarningMessage: string;
}

export const addressSearchData = {
  streetAddress: {
    address: '77 vo van kiet',
    expectedRecommendationCount: 5,
  },
  place: {
    address: 'Ho Chi Minh City',
    expectedRecommendationCount: 5,
  },
  englishThreeWord: {
    address: '///become.outlooks.rising',
    expectedRecommendationCount: 3,
    expectedThreeWordAddress: 'become.outlooks.rising',
  },
  vietnameseThreeWord: {
    address: '///viết chữ.âm nhạc.an nhàn',
    expectedRecommendationCount: 3,
    expectedThreeWordAddress: 'viết chữ.âm nhạc.an nhàn',
  },
} as const satisfies Record<string, AddressSearchData>;

export const invalidAddressSearchData: InvalidAddressSearchData = {
  address: 'fdasfdsa',
  expectedWarningTitle: 'No address found.',
  expectedWarningMessage:
    'Please try searching for the town or nearby place and zoom in to find the what3words address.',
};
