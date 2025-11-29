import React, { useState, useEffect } from 'react';
import { INITIAL_POOLS } from '../constants';
import { TrendingUp, Users, Droplets, Activity } from 'lucide-react';
import { PoolData, StreamEventType } from '../types';
import { sdsClient } from '../services/mockSdsService';

export const LiquidityPools: React.FC = () => {
  const [pools, setPools] = useState<PoolData[]>(INITIAL_POOLS);
  const [lastUpdatedId, setLastUpdatedId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = sdsClient.subscribe(StreamEventType.POOL_UPDATE, (update: any) => {
      setLastUpdatedId(update.id);
      setPools(prev => prev.map(p => 
        p.id === update.id 
          ? { ...p, tvl: update.tvl, volume24h: update.volume24h, apy: update.apy }
          : p
      ));
      
      // Reset highlight after short delay
      setTimeout(() => setLastUpdatedId(null), 1000);
    });
    return unsub;
  }, []);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Droplets className="w-5 h-5 text-emerald-400" />
        Active Pools
        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1 animate-pulse">
             <Activity className="w-3 h-3" /> Live Updates
        </span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pools.map((pool) => (
          <div 
            key={pool.id} 
            className={`glass-panel p-5 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                lastUpdatedId === pool.id 
                    ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                    : 'border-white/5 hover:border-emerald-500/30'
            }`}
          >
            {/* Flash Overlay */}
            <div className={`absolute inset-0 bg-emerald-500/5 pointer-events-none transition-opacity duration-500 ${lastUpdatedId === pool.id ? 'opacity-100' : 'opacity-0'}`} />

            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex -space-x-2">
                <img src={pool.token0.logo} className="w-8 h-8 rounded-full border-2 border-[#0B0E11]" alt={pool.token0.symbol} />
                <img src={pool.token1.logo} className="w-8 h-8 rounded-full border-2 border-[#0B0E11]" alt={pool.token1.symbol} />
              </div>
              <span className={`text-xs px-2 py-1 rounded font-mono transition-colors duration-500 ${
                  lastUpdatedId === pool.id ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-emerald-400'
              }`}>
                {pool.apy.toFixed(2)}% APY
              </span>
            </div>

            <h4 className="text-white font-bold text-lg mb-1 relative z-10">{pool.pair}</h4>
            
            <div className="grid grid-cols-2 gap-4 mt-4 relative z-10">
              <div>
                <p className="text-xs text-slate-500 mb-1">TVL</p>
                <p className={`text-sm font-mono transition-colors duration-300 ${lastUpdatedId === pool.id ? 'text-emerald-400' : 'text-slate-200'}`}>
                    ${(pool.tvl / 1000000).toFixed(3)}M
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">24h Vol</p>
                <p className="text-sm font-mono text-slate-200">${(pool.volume24h / 1000).toFixed(0)}k</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3 h-3" /> 1.2k stakers
                </span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};