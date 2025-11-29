import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { ScrollReveal } from './ScrollReveal';

// Mock Data for Analytics
const TVL_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  value: 4000000 + Math.random() * 1000000 + (i * 100000)
}));

const VOL_DATA = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  value: Math.random() * 500000 + 200000
}));

export const AnalyticsView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <ScrollReveal>
        <h1 className="text-3xl font-bold text-white mb-8">Protocol Analytics</h1>
      </ScrollReveal>
      
      <ScrollReveal delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="text-slate-400 text-sm mb-1">Total Value Locked</div>
                <div className="text-3xl font-bold text-white font-mono">$8,245,102</div>
                <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                    <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded">+5.2%</span>
                    <span className="text-slate-500">past 24h</span>
                </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="text-slate-400 text-sm mb-1">Volume 24h</div>
                <div className="text-3xl font-bold text-white font-mono">$1,204,500</div>
                 <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                    <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded">+12.8%</span>
                    <span className="text-slate-500">past 24h</span>
                </div>
            </div>
            <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <div className="text-slate-400 text-sm mb-1">Fees 24h</div>
                <div className="text-3xl font-bold text-white font-mono">$3,613.50</div>
                 <div className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
                    <span className="bg-emerald-500/10 px-1.5 py-0.5 rounded">+12.8%</span>
                    <span className="text-slate-500">past 24h</span>
                </div>
            </div>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ScrollReveal delay={200}>
            <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[350px]">
                <h3 className="text-white font-bold mb-6">TVL Over Time</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={TVL_DATA}>
                            <defs>
                            <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                            </defs>
                            <XAxis dataKey="date" hide />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc'}}
                                itemStyle={{color: '#10b981'}}
                            />
                            <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorTvl)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
            <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[350px]">
                <h3 className="text-white font-bold mb-6">Volume 24h</h3>
                 <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={VOL_DATA}>
                            <XAxis dataKey="date" hide />
                             <Tooltip 
                                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc'}}
                            />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </ScrollReveal>
      </div>
    </div>
  );
};