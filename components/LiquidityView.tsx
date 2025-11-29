import React, { useState, useEffect } from 'react';
import { Plus, Wallet, Search, SlidersHorizontal, ChevronDown, Activity } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { INITIAL_POOLS } from '../constants';
import { PoolData, StreamEventType } from '../types';
import { sdsClient } from '../services/mockSdsService';

export const LiquidityView: React.FC = () => {
  const [pools, setPools] = useState<PoolData[]>(INITIAL_POOLS);
  const [highlightId, setHighlightId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = sdsClient.subscribe(StreamEventType.POOL_UPDATE, (update: any) => {
      setHighlightId(update.id);
      setPools(prev => prev.map(p => 
        p.id === update.id 
          ? { ...p, tvl: update.tvl, volume24h: update.volume24h, apy: update.apy }
          : p
      ));
      setTimeout(() => setHighlightId(null), 800);
    });
    return unsub;
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                Liquidity
                <span className="text-xs font-normal bg-slate-800 border border-slate-700 text-emerald-400 px-2 py-1 rounded-full flex items-center gap-1">
                    <Activity className="w-3 h-3" /> SDS Live
                </span>
            </h1>
            <p className="text-slate-400 text-sm">Add liquidity to receive LP tokens and earn trading fees.</p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/20 transition-all">
            <Plus className="w-5 h-5" />
            New Position
          </button>
        </div>
      </ScrollReveal>

      {/* User Positions (Empty State) */}
      <ScrollReveal delay={100}>
        <div className="glass-panel rounded-2xl p-12 text-center mb-12 border border-white/10 bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No active positions</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
            Connect your wallet to view your liquidity positions or create a new one to start earning.
          </p>
        </div>
      </ScrollReveal>

      {/* All Pools List */}
      <ScrollReveal delay={200}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Top Pools</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search pools" 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 w-64"
              />
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900/50 text-xs uppercase text-slate-500">
              <tr>
                <th className="py-4 px-6 font-medium">Pool</th>
                <th className="py-4 px-6 font-medium text-right">TVL</th>
                <th className="py-4 px-6 font-medium text-right">Volume 24h</th>
                <th className="py-4 px-6 font-medium text-right">APY</th>
                <th className="py-4 px-6 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pools.map((pool) => (
                <tr key={pool.id} className={`hover:bg-white/5 transition-colors group ${highlightId === pool.id ? 'bg-emerald-500/5' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                         <img src={pool.token0.logo} className="w-8 h-8 rounded-full border-2 border-[#0B0E11]" alt="" />
                         <img src={pool.token1.logo} className="w-8 h-8 rounded-full border-2 border-[#0B0E11]" alt="" />
                      </div>
                      <span className="font-bold text-white group-hover:text-emerald-400 transition-colors">{pool.pair}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">0.3%</span>
                    </div>
                  </td>
                  <td className={`py-4 px-6 text-right font-mono transition-colors duration-300 ${highlightId === pool.id ? 'text-emerald-400' : 'text-slate-300'}`}>
                    ${(pool.tvl / 1000000).toFixed(3)}M
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-slate-300">
                    ${(pool.volume24h / 1000).toFixed(0)}k
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className={`font-bold transition-colors duration-300 ${highlightId === pool.id ? 'text-emerald-400' : 'text-emerald-500'}`}>
                        {pool.apy.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                     <button className="text-xs font-medium text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg transition-colors">
                       Manage
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>
    </div>
  );
};