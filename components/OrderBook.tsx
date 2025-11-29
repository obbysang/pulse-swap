import React, { useEffect, useState } from 'react';
import { sdsClient } from '../services/mockSdsService';
import { StreamEventType, OrderBookState } from '../types';
import { ArrowDown, ArrowUp } from 'lucide-react';

export const OrderBook: React.FC = () => {
  const [book, setBook] = useState<OrderBookState | null>(null);
  const [prevMidPrice, setPrevMidPrice] = useState<number>(0);

  useEffect(() => {
    const unsub = sdsClient.subscribe(StreamEventType.ORDER_BOOK_UPDATE, (data: OrderBookState) => {
      setBook(prev => {
        if (prev) {
            // Calculate approximate mid price for direction
            const mid = (data.bids[0].price + data.asks[0].price) / 2;
            const prevMid = (prev.bids[0].price + prev.asks[0].price) / 2;
            setPrevMidPrice(prevMid);
        }
        return data;
      });
    });
    return unsub;
  }, []);

  if (!book) return (
    <div className="glass-panel h-[400px] flex items-center justify-center text-slate-500 animate-pulse">
        Connecting to Order Stream...
    </div>
  );

  const maxTotal = Math.max(
    book.bids[book.bids.length - 1]?.total || 0,
    book.asks[book.asks.length - 1]?.total || 0
  );

  const currentMid = (book.bids[0].price + book.asks[0].price) / 2;
  const priceDirection = currentMid >= prevMidPrice ? 'up' : 'down';

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[400px]">
      <div className="p-4 border-b border-white/5 bg-slate-900/40">
        <h3 className="text-white font-semibold text-sm flex justify-between items-center">
            <span>Order Book <span className="text-xs text-slate-500 ml-1">(ETH/USDC)</span></span>
            <span className="flex items-center gap-1.5 text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Live
            </span>
        </h3>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col text-xs font-mono">
        {/* Asks (Sells) - Red */}
        <div className="flex-1 flex flex-col-reverse overflow-hidden">
            {book.asks.slice(0, 8).reverse().map((ask, i) => (
                <div key={i} className="flex justify-between items-center px-4 py-1 relative hover:bg-white/5 group">
                    <div 
                        className="absolute right-0 top-0 bottom-0 bg-red-500/10 transition-all duration-300"
                        style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                    />
                    <span className="text-red-400 relative z-10">{ask.price.toFixed(2)}</span>
                    <span className="text-slate-300 relative z-10">{ask.amount.toFixed(4)}</span>
                    <span className="text-slate-500 relative z-10">{ask.total.toFixed(2)}</span>
                </div>
            ))}
        </div>

        {/* Spread / Mid Price */}
        <div className="py-2 px-4 border-y border-white/5 bg-slate-900/30 flex justify-between items-center">
            <span className={`text-base font-bold flex items-center gap-1 ${priceDirection === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                {currentMid.toFixed(2)}
                {priceDirection === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            </span>
            <span className="text-xs text-slate-500">Spread: {book.spread.toFixed(2)}</span>
        </div>

        {/* Bids (Buys) - Green */}
        <div className="flex-1 overflow-hidden">
             {book.bids.slice(0, 8).map((bid, i) => (
                <div key={i} className="flex justify-between items-center px-4 py-1 relative hover:bg-white/5 group">
                     <div 
                        className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 transition-all duration-300"
                        style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                    />
                    <span className="text-emerald-400 relative z-10">{bid.price.toFixed(2)}</span>
                    <span className="text-slate-300 relative z-10">{bid.amount.toFixed(4)}</span>
                    <span className="text-slate-500 relative z-10">{bid.total.toFixed(2)}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};