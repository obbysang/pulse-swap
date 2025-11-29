import React, { useState, useEffect } from 'react';
import { ArrowDown, RefreshCw, Settings2, Info, CheckCircle, ExternalLink, X } from 'lucide-react';
import { TOKENS } from '../constants';
import { sdsClient } from '../services/mockSdsService';
import { StreamEventType } from '../types';

export const SwapInterface: React.FC = () => {
  const [inAmount, setInAmount] = useState<string>('');
  const [outAmount, setOutAmount] = useState<string>('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [status, setStatus] = useState<'idle' | 'streaming' | 'confirmed'>('idle');
  const [price, setPrice] = useState(3326.16); // ETH price mock
  const [showToast, setShowToast] = useState(false);
  const [txHash, setTxHash] = useState('');

  // Simulate price streaming affecting the quote
  useEffect(() => {
    const unsub = sdsClient.subscribe(StreamEventType.PRICE_UPDATE, (data: any) => {
      if (data.pair === 'ETH/USDC') {
        setPrice(data.price);
        if (inAmount) {
          // Live update quote
          const val = parseFloat(inAmount);
          if (!isNaN(val)) {
            setOutAmount((val * data.price).toFixed(2));
          }
        }
      }
    });
    return unsub;
  }, [inAmount]);

  const handleInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInAmount(val);
    if (!val || isNaN(parseFloat(val))) {
      setOutAmount('');
      return;
    }
    setOutAmount((parseFloat(val) * price).toFixed(2));
  };

  const handleSwap = () => {
    if (!inAmount) return;
    setIsSwapping(true);
    setStatus('streaming');
    setShowToast(false);
    
    // Simulate transaction lifecycle
    setTimeout(() => {
      // Generate mock hash
      const hash = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
      setTxHash(hash);
      setStatus('confirmed');
      setShowToast(true);
      
      setTimeout(() => {
        setIsSwapping(false);
        setStatus('idle');
        setInAmount('');
        setOutAmount('');
        // Hide toast automatically after 6 seconds
        setTimeout(() => setShowToast(false), 6000);
      }, 2000);
    }, 2500);
  };

  return (
    <div className="glass-panel rounded-2xl p-4 w-full max-w-[480px] border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Success Toast Notification */}
      {showToast && (
        <div className="absolute top-4 left-4 right-4 bg-[#0B0E11] border border-emerald-500/40 rounded-xl p-4 shadow-2xl shadow-emerald-900/20 flex items-start gap-3 z-50 animate-fade-in backdrop-blur-md">
          <div className="bg-emerald-500/20 p-2 rounded-full shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-white text-sm font-bold mb-0.5">Swap Successful!</h4>
            <div className="flex flex-col gap-1">
               <span className="text-xs text-slate-400">Transaction has been confirmed.</span>
               <a 
                 href={`https://somnia-testnet.social/tx/${txHash}`} 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1 text-xs font-medium w-fit"
               >
                 View on Explorer <ExternalLink className="w-3 h-3" />
               </a>
            </div>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="text-slate-500 hover:text-white p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Swap</h2>
        <div className="flex items-center gap-3">
            <button className="text-slate-400 hover:text-white transition-colors"><RefreshCw className="w-4 h-4" /></button>
            <button className="text-slate-400 hover:text-white transition-colors"><Settings2 className="w-4 h-4" /></button>
        </div>
      </div>

      {/* From Input */}
      <div className="bg-[#0B0E11] rounded-xl p-4 mb-1 border border-transparent hover:border-slate-700 transition-colors">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400 text-xs font-medium">From</span>
          <span className="text-slate-400 text-xs">Balance: 2.45 ETH</span>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="number" 
            placeholder="0.0" 
            value={inAmount}
            onChange={handleInChange}
            className="bg-transparent text-3xl font-medium text-white placeholder-slate-600 outline-none w-full"
          />
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full transition-colors shrink-0">
            <img src={TOKENS.ETH.logo} alt="ETH" className="w-5 h-5 rounded-full" />
            <span className="font-semibold">ETH</span>
            <span className="text-slate-500 text-xs">▼</span>
          </button>
        </div>
        <div className="text-slate-500 text-xs mt-2">
          ≈ ${inAmount ? (parseFloat(inAmount) * price).toLocaleString() : '0.00'}
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center -my-3 relative z-10">
        <button className="bg-[#1e293b] p-2 rounded-lg border border-[#0B0E11] text-emerald-400 hover:scale-110 transition-transform">
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* To Input */}
      <div className="bg-[#0B0E11] rounded-xl p-4 mt-1 border border-transparent hover:border-slate-700 transition-colors">
        <div className="flex justify-between mb-2">
          <span className="text-slate-400 text-xs font-medium">To</span>
          <span className="text-slate-400 text-xs">Balance: 12,400.00 USDC</span>
        </div>
        <div className="flex items-center gap-4">
          <input 
            type="number" 
            placeholder="0.0" 
            value={outAmount}
            readOnly
            className="bg-transparent text-3xl font-medium text-white placeholder-slate-600 outline-none w-full"
          />
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-full transition-colors shrink-0">
            <img src={TOKENS.USDC.logo} alt="USDC" className="w-5 h-5 rounded-full" />
            <span className="font-semibold">USDC</span>
            <span className="text-slate-500 text-xs">▼</span>
          </button>
        </div>
        <div className="text-slate-500 text-xs mt-2">
           1 ETH = {price.toFixed(2)} USDC <span className="text-emerald-500 ml-2 text-[10px]">(Live)</span>
        </div>
      </div>

      {/* Info Accordion */}
      <div className="mt-4 p-3 rounded-lg border border-slate-800 bg-slate-900/50">
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1">Max Slippage <Info className="w-3 h-3"/></span>
            <span className="text-emerald-400 font-mono">0.5%</span>
        </div>
        <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Network Cost</span>
            <span className="text-slate-200 font-mono">~$1.24</span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleSwap}
        disabled={!inAmount || isSwapping}
        className={`w-full mt-4 py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
          !inAmount 
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : isSwapping
              ? status === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-emerald-600 text-white cursor-wait'
              : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
        }`}
      >
        {status === 'idle' && (inAmount ? 'Swap' : 'Enter Amount')}
        {status === 'streaming' && (
          <span className="flex items-center justify-center gap-2">
             <RefreshCw className="w-5 h-5 animate-spin" /> Confirming...
          </span>
        )}
        {status === 'confirmed' && 'Swap Confirmed!'}
      </button>
    </div>
  );
};