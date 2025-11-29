import { StreamEventType, Transaction, PairPrice, OrderBookState, OrderBookEntry } from '../types';
import { INITIAL_POOLS, TOKENS } from '../constants';
import { SomniaDataStreams } from '../lib/somnia-sdk-simulation';

// Initialize the "Real" SDK wrapper
const sdsSdk = new SomniaDataStreams({
  network: 'testnet'
});

class SDSClientService {
  private intervals: number[] = [];

  constructor() {
    this.startDataSimulation();
  }

  // Wrapper for SDK subscribe method
  public subscribe(eventType: StreamEventType, callback: (data: any) => void) {
    return sdsSdk.subscribe(eventType, callback);
  }

  private startDataSimulation() {
    // 1. Price Updates (High Frequency)
    const priceInterval = window.setInterval(() => {
      const pools = ['ETH/USDC', 'SOM/USDC', 'WBTC/ETH'];
      const randomPool = pools[Math.floor(Math.random() * pools.length)];
      
      const update: PairPrice = {
        pair: randomPool,
        price: this.generateRandomPrice(randomPool),
        change24h: (Math.random() * 10) - 5,
        lastUpdated: Date.now()
      };
      
      sdsSdk.emit(StreamEventType.PRICE_UPDATE, update);
    }, 2000);

    // 2. Transactions (Medium Frequency)
    const txInterval = window.setInterval(() => {
      const tx = this.generateRandomTransaction();
      sdsSdk.emit(StreamEventType.NEW_TRANSACTION, tx);
    }, 3500);

    // 3. Order Book Updates (Ultra High Frequency - Streaming Structured Data)
    // This demonstrates the capacity of SDS to handle complex object streams
    const bookInterval = window.setInterval(() => {
      const bookUpdate = this.generateOrderBookUpdate('ETH/USDC');
      sdsSdk.emit(StreamEventType.ORDER_BOOK_UPDATE, bookUpdate);
    }, 800); // Updates every 800ms

    // 4. Pool Stats Updates (Structured Data Stream)
    const poolInterval = window.setInterval(() => {
        const pools = INITIAL_POOLS;
        const randomPool = pools[Math.floor(Math.random() * pools.length)];
        
        // Simulate trading activity changing reserves and stats
        const volatility = (Math.random() * 0.02) - 0.01; // +/- 1%
        
        const update = {
            id: randomPool.id,
            tvl: randomPool.tvl * (1 + volatility),
            volume24h: randomPool.volume24h + (Math.random() * 5000),
            apy: Math.max(0.5, randomPool.apy + (Math.random() * 2 - 1)),
            timestamp: Date.now()
        };
        
        sdsSdk.emit(StreamEventType.POOL_UPDATE, update);
    }, 3000);

    this.intervals.push(priceInterval, txInterval, bookInterval, poolInterval);
  }

  public destroy() {
    this.intervals.forEach(i => clearInterval(i));
  }

  // --- Helper Generators ---

  private generateRandomPrice(pair: string): number {
    const basePrices: Record<string, number> = {
      'ETH/USDC': 3326.16,
      'SOM/USDC': 0.45,
      'WBTC/ETH': 19.5,
    };
    const volatility = basePrices[pair] * 0.002; 
    const change = (Math.random() * volatility * 2) - volatility;
    return basePrices[pair] + change;
  }

  private generateRandomTransaction(): Transaction {
    const types: Transaction['type'][] = ['SWAP', 'SWAP', 'SWAP', 'ADD_LIQUIDITY'];
    const type = types[Math.floor(Math.random() * types.length)];
    const symbols = Object.keys(TOKENS);
    const inIdx = Math.floor(Math.random() * symbols.length);
    let outIdx = Math.floor(Math.random() * symbols.length);
    while(outIdx === inIdx) outIdx = Math.floor(Math.random() * symbols.length);

    return {
      id: Math.random().toString(36).substr(2, 9),
      type,
      tokenIn: symbols[inIdx],
      amountIn: parseFloat((Math.random() * 5).toFixed(4)),
      tokenOut: symbols[outIdx],
      amountOut: parseFloat((Math.random() * 500).toFixed(2)),
      sender: `0x${Math.floor(Math.random() * 16777215).toString(16)}...${Math.floor(Math.random() * 1000)}`,
      timestamp: Date.now(),
      hash: `0x${Math.random().toString(36).substr(2, 16)}`
    };
  }

  private generateOrderBookUpdate(pair: string): OrderBookState {
    const basePrice = 3326.16;
    const spread = Math.random() * 2;
    const midPrice = basePrice + (Math.random() * 10 - 5);
    
    const generateSide = (startPrice: number, isBid: boolean): OrderBookEntry[] => {
      const entries: OrderBookEntry[] = [];
      let currentPrice = startPrice;
      let cumulative = 0;

      for (let i = 0; i < 8; i++) {
        const amount = Math.random() * 5 + 0.1;
        cumulative += amount;
        entries.push({
          price: currentPrice,
          amount: amount,
          total: cumulative
        });
        // Decrement for bids, Increment for asks
        currentPrice = isBid ? currentPrice - (Math.random() * 2) : currentPrice + (Math.random() * 2);
      }
      return entries;
    };

    return {
      pair,
      timestamp: Date.now(),
      spread: spread,
      bids: generateSide(midPrice - spread/2, true),
      asks: generateSide(midPrice + spread/2, false)
    };
  }
}

export const sdsClient = new SDSClientService();