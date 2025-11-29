import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { sdsClient } from '../services/mockSdsService';
import { StreamEventType } from '../types';

const generateInitialData = () => {
  const data = [];
  let price = 3200;
  const now = Date.now();
  for (let i = 24; i >= 0; i--) {
    price = price * (1 + (Math.random() * 0.04 - 0.02));
    data.push({
      time: new Date(now - i * 3600 * 1000).getHours() + ':00',
      value: price
    });
  }
  return data;
};

export const ChartWidget: React.FC = () => {
  const [data, setData] = useState(generateInitialData());
  const [currentPrice, setCurrentPrice] = useState(data[data.length - 1].value);

  useEffect(() => {
    // Listen to real-time SDS updates to append to chart
    const unsub = sdsClient.subscribe(StreamEventType.PRICE_UPDATE, (update: any) => {
      if (update.pair === 'ETH/USDC') {
        setCurrentPrice(update.price);
        setData(prev => {
          const newData = [...prev];
          // Update the last data point for "live" feel, or push new if time gap large
          const lastIndex = newData.length - 1;
          
          // FIX: Create a shallow copy of the object to avoid mutating read-only state
          newData[lastIndex] = { 
            ...newData[lastIndex], 
            value: update.price 
          };
          
          return newData;
        });
      }
    });
    return unsub;
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-6 border border-white/10 h-[400px] flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=026" className="w-6 h-6" alt="ETH" />
            <h3 className="text-white text-lg font-bold">ETH / USDC</h3>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-white">${currentPrice.toFixed(2)}</span>
            <span className="text-emerald-400 font-medium text-sm">+3.42%</span>
          </div>
        </div>
        
        <div className="flex bg-slate-800 rounded-lg p-1">
            {['1H', '1D', '1W', '1M'].map(t => (
                <button key={t} className={`px-3 py-1 rounded text-xs font-medium ${t === '1D' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}>
                    {t}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 12}} 
                minTickGap={30}
            />
            <YAxis 
                domain={['auto', 'auto']} 
                hide 
            />
            <Tooltip 
                contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc'}}
                itemStyle={{color: '#10b981'}}
            />
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
                isAnimationActive={false} // Disable animation for smoother streaming updates
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};