import React from 'react';
import { Search, Star, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { TOKENS } from '../constants';

export const DiscoverView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Discover <span className="text-emerald-400">Somnia</span> Assets</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Explore top tokens and pools on the fastest high-performance blockchain. Real-time data streamed instantly.</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Trending', name: 'Somnia', symbol: 'SOM', change: '+12.4%', price: '$0.45' },
            { label: 'Top Gainer', name: 'Wrapped BTC', symbol: 'WBTC', change: '+5.2%', price: '$64,230' },
            { label: 'High Volume', name: 'Ethereum', symbol: 'ETH', change: '+2.1%', price: '$3,326' },
          ].map((item, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer">
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">{item.label}</div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-white">{item.symbol}</div>
                  <div className="text-sm text-slate-500">{item.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-mono text-white">{item.price}</div>
                  <div className="text-sm text-emerald-400 font-medium">{item.change}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 text-sm font-medium">
              <button className="text-white border-b-2 border-emerald-500 pb-4 -mb-4.5">Tokens</button>
              <button className="text-slate-400 hover:text-white transition-colors pb-4">Pools</button>
              <button className="text-slate-400 hover:text-white transition-colors pb-4">Transactions</button>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search name or address" 
                className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-xs uppercase text-slate-500">
              <tr>
                <th className="py-4 px-6 font-medium">#</th>
                <th className="py-4 px-6 font-medium">Token Name</th>
                <th className="py-4 px-6 font-medium text-right">Price</th>
                <th className="py-4 px-6 font-medium text-right">Change 24h</th>
                <th className="py-4 px-6 font-medium text-right">TVL</th>
                <th className="py-4 px-6 font-medium text-right">Volume 24h</th>
                <th className="py-4 px-6 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.values(TOKENS).map((token, i) => (
                <tr key={token.symbol} className="hover:bg-white/5 transition-colors group">
                  <td className="py-4 px-6 text-slate-500 text-sm">{i + 1}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={token.logo} className="w-8 h-8 rounded-full" alt={token.symbol} />
                      <div>
                        <div className="font-bold text-white group-hover:text-emerald-400 transition-colors">{token.name}</div>
                        <div className="text-xs text-slate-500">{token.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-slate-300">$3,420.50</td>
                  <td className="py-4 px-6 text-right">
                     <span className="text-emerald-400 text-sm font-medium">+2.4%</span>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-slate-300">$120.4M</td>
                  <td className="py-4 px-6 text-right font-mono text-slate-300">$12.1M</td>
                  <td className="py-4 px-6 text-right">
                     <button className="text-slate-500 hover:text-white">
                        <Star className="w-4 h-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="p-4 border-t border-white/5 text-center">
            <button className="text-sm text-emerald-500 hover:text-emerald-400 font-medium">Load More</button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};