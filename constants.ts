import { Token, PoolData } from './types';

export const TOKENS: Record<string, Token> = {
  ETH: {
    symbol: 'ETH',
    name: 'Ethereum',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026',
    decimals: 18,
    address: '0x...ETH'
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=026',
    decimals: 6,
    address: '0x...USDC'
  },
  WBTC: {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    logo: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png?v=026',
    decimals: 8,
    address: '0x...WBTC'
  },
  SOM: {
    symbol: 'SOM',
    name: 'Somnia',
    logo: 'https://picsum.photos/200', // Placeholder for Somnia
    decimals: 18,
    address: '0x...SOM'
  }
};

export const INITIAL_POOLS: PoolData[] = [
  {
    id: 'pool-1',
    pair: 'ETH/USDC',
    token0: TOKENS.ETH,
    token1: TOKENS.USDC,
    tvl: 4500000,
    volume24h: 1200000,
    apy: 12.5,
    reserves0: 1500,
    reserves1: 4500000
  },
  {
    id: 'pool-2',
    pair: 'SOM/USDC',
    token0: TOKENS.SOM,
    token1: TOKENS.USDC,
    tvl: 2100000,
    volume24h: 850000,
    apy: 24.2,
    reserves0: 5000000,
    reserves1: 2500000
  },
  {
    id: 'pool-3',
    pair: 'WBTC/ETH',
    token0: TOKENS.WBTC,
    token1: TOKENS.ETH,
    tvl: 8900000,
    volume24h: 340000,
    apy: 5.8,
    reserves0: 120,
    reserves1: 2400
  }
];