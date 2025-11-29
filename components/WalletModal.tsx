import React, { useState } from 'react';
import { X, Wallet, ArrowRight, Loader2, Shield } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);

  if (!isOpen) return null;

  const wallets = [
    { id: 'metamask', name: 'MetaMask', color: '#F6851B', icon: '🦊' },
    { id: 'walletconnect', name: 'WalletConnect', color: '#3B99FC', icon: '📡' },
    { id: 'coinbase', name: 'Coinbase Wallet', color: '#0052FF', icon: '🔵' },
    { id: 'somnia', name: 'Somnia Wallet', color: '#10B981', icon: '🟢' },
  ];

  const handleConnect = (walletId: string) => {
    setConnectingWallet(walletId);
    // Simulate connection delay managed by the modal for UX
    setTimeout(() => {
      onConnect(walletId);
      setConnectingWallet(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-[#0B0E11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in glass-panel">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-500" />
            Connect Wallet
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-400 text-sm mb-4">
            Choose a wallet to connect to Somnia Testnet.
          </p>

          <div className="space-y-3">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                disabled={!!connectingWallet}
                onClick={() => handleConnect(wallet.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all group ${
                  connectingWallet === wallet.id 
                    ? 'bg-emerald-500/10 border-emerald-500/50' 
                    : 'bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-lg">
                    {wallet.icon}
                  </div>
                  <span className={`font-semibold ${connectingWallet === wallet.id ? 'text-emerald-400' : 'text-white'}`}>
                    {wallet.name}
                  </span>
                </div>
                
                {connectingWallet === wallet.id ? (
                  <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Shield className="w-3 h-3" />
              <span>By connecting, you agree to our Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};