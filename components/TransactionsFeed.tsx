import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import { sdsClient } from '../services/mockSdsService';
import { StreamEventType, Transaction } from '../types';

export const TransactionsFeed: React.FC = () => {
  const [txs, setTxs] = useState<Transaction[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = sdsClient.subscribe(StreamEventType.NEW_TRANSACTION, (newTx: Transaction) => {
      setTxs(prev => [newTx, ...prev].slice(0, 15)); // Keep last 15
    });
    return unsub;
  }, []);

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full max-h-[400px]">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          Live Transactions
        </h3>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      </div>

      <div className="overflow-y-auto p-0 flex-1 custom-scrollbar" ref={scrollRef}>
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-900/50 text-xs uppercase text-slate-500 sticky top-0 backdrop-blur-md">
            <tr>
              <th className="py-3 px-4 font-medium">Type</th>
              <th className="py-3 px-4 font-medium">In</th>
              <th className="py-3 px-4 font-medium">Out</th>
              <th className="py-3 px-4 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {txs.length === 0 ? (
                <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 text-sm italic">
                        Waiting for Somnia Data Stream...
                    </td>
                </tr>
            ) : (
                txs.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors animate-fade-in group cursor-pointer">
                    <td className="py-3 px-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                        tx.type === 'SWAP' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                        {tx.type}
                    </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-300">
                    {tx.amountIn} {tx.tokenIn}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-300">
                    {tx.amountOut} {tx.tokenOut}
                    </td>
                    <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-xs text-slate-500">
                        <span>now</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};