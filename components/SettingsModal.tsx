import React from 'react';
import { X, Moon, Volume2, ShieldCheck, Zap, Sun, VolumeX } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose,
  isDarkMode,
  toggleDarkMode,
  isSoundEnabled,
  toggleSound
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0B0E11] border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-in overflow-hidden glass-panel">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slippage */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-slate-200">Slippage Tolerance</span>
          </div>
          <div className="flex gap-2">
            {['Auto', '0.1%', '0.5%', '1.0%'].map((opt, i) => (
              <button
                key={opt}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  i === 0 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-transparent hover:border-slate-600'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Deadline */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-slate-200">Transaction Deadline</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-24">
              <input 
                type="number" 
                defaultValue={20}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 px-3 text-right text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <span className="text-sm text-slate-400">minutes</span>
          </div>
        </div>

        <div className="h-px bg-white/5 my-6" />

        {/* Interface Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span className="text-sm">Dark Mode</span>
            </div>
            <div 
              onClick={toggleDarkMode}
              className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${isDarkMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-sm">Sound Effects</span>
            </div>
             <div 
               onClick={toggleSound}
               className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${isSoundEnabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
             >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isSoundEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-600">
          PulseSwap v1.0.0 • Somnia Testnet
        </div>
      </div>
    </div>
  );
};