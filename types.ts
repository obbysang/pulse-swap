export interface Token {
  symbol: string;
  name: string;
  logo: string;
  decimals: number;
  address: string;
}

export interface PairPrice {
  pair: string;
  price: number;
  change24h: number;
  lastUpdated: number;
}

export interface Transaction {
  id: string;
  type: 'SWAP' | 'ADD_LIQUIDITY' | 'REMOVE_LIQUIDITY';
  tokenIn: string;
  amountIn: number;
  tokenOut: string;
  amountOut: number;
  sender: string;
  timestamp: number;
  hash: string;
}

export interface PoolData {
  id: string;
  pair: string;
  token0: Token;
  token1: Token;
  tvl: number;
  volume24h: number;
  apy: number;
  reserves0: number;
  reserves1: number;
}

export interface OrderBookEntry {
  price: number;
  amount: number;
  total: number; // Cumulative total for depth visual
}

export interface OrderBookState {
  pair: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
  timestamp: number;
}

export enum StreamEventType {
  PRICE_UPDATE = 'PRICE_UPDATE',
  NEW_TRANSACTION = 'NEW_TRANSACTION',
  BLOCK_CONFIRMATION = 'BLOCK_CONFIRMATION',
  POOL_UPDATE = 'POOL_UPDATE',
  ORDER_BOOK_UPDATE = 'ORDER_BOOK_UPDATE'
}