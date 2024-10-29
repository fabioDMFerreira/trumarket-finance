export enum TransportType {
  BY_SEA = 'sea_fright',
  BY_AIR = 'by_air',
}

export type Wallet = {
  label: string;
  address: string;
  balanceUnderlying?: number;
  balance?: number;
};
