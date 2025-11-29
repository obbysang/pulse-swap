import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { sdsClient } from '../services/mockSdsService';
import { StreamEventType, PairPrice } from '../types';

export const PriceTicker: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, PairPrice>>({
    'ETH/USDC': { pair: 'ETH/USDC', price: 3326.16, change24h: 1.2, lastUpdated: Date.now() },
    'SOM/USDC': { pair: 'SOM/USDC', price: 0.45, change24h: 5.4, lastUpdated: Date.now() },
    'WBTC/ETH': { pair: 'WBTC/ETH', price: 19.5, change24h: -0.8, lastUpdated: Date.now() },
    'LINK/ETH': { pair: 'LINK/ETH', price: 0.045, change24h: 2.1, lastUpdated: Date.now() }
  });

  useEffect(() => {
    // Subscribe to streaming updates
    const unsubscribe = sdsClient.subscribe(StreamEventType.PRICE_UPDATE, (data: PairPrice) => {
      setPrices(prev => ({ ...prev, [data.pair]: data }));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="w-full bg-[#0B0E11] border-b border-white/5 overflow-hidden py-2">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-8 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
          <Activity className="w-3 h-3" />
          Live Prices
        </div>
        
        {Object.values(prices).map((p) => (
          <div key={p.pair} className="flex items-center gap-3 shrink-0 animate-fade-in">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-300 font-medium text-sm">{p.pair.split('/')[0]}</span>
              <span className="text-slate-500 text-xs">/ {p.pair.split('/')[1]}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white font-mono text-sm">{p.price.toFixed(p.price < 1 ? 4 : 2)}</span>
              <span className={`flex items-center text-xs ${p.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {p.change24h >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(p.change24h).toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};