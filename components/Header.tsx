import React from 'react';
import { Hexagon, Wallet, Bell, Settings, LogOut, ChevronDown } from 'lucide-react';
import { WalletState } from '../hooks/useWallet';

interface HeaderProps {
  activeView: string;
  setView: (view: string) => void;
  toggleSettings: () => void;
  wallet: WalletState;
  onAction?: () => void; // For sound effects
  onConnectWallet: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, setView, toggleSettings, wallet, onAction, onConnectWallet }) => {
  const navItems = [
    { id: 'swap', label: 'Swap' },
    { id: 'liquidity', label: 'Liquidity' },
    { id: 'discover', label: 'Discover' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const handleNavClick = (id: string) => {
    onAction?.();
    setView(id);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => handleNavClick('swap')}
        >
          <div className="p-1.5 bg-emerald-500 rounded-lg">
            <Hexagon className="w-6 h-6 text-white fill-emerald-500" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Pulse<span className="text-emerald-400">Swap</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeView === item.id 
                  ? 'text-emerald-400 bg-emerald-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Somnia Testnet
          </div>

          <div className="flex items-center gap-2">
             <button 
               onClick={onAction}
               className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
             >
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => { onAction?.(); toggleSettings(); }}
              className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
             >
              <Settings className="w-5 h-5" />
            </button>
            
            {wallet.isConnected && wallet.address ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-all border border-slate-700">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-500"></div>
                  {formatAddress(wallet.address)}
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {/* Dropdown for disconnect */}
                <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-[#0B0E11] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                   <div className="px-4 py-2 border-b border-white/5 mb-1">
                     <p className="text-xs text-slate-500">Connected with</p>
                     <p className="text-xs font-bold text-emerald-400 capitalize">{wallet.walletType || 'Wallet'}</p>
                   </div>
                   <button 
                     onClick={() => { onAction?.(); wallet.disconnect(); }}
                     className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
                   >
                     <LogOut className="w-4 h-4" /> Disconnect
                   </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => { onAction?.(); onConnectWallet(); }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};