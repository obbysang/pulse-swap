import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PriceTicker } from './components/PriceTicker';
import { SwapInterface } from './components/SwapInterface';
import { TransactionsFeed } from './components/TransactionsFeed';
import { ChartWidget } from './components/ChartWidget';
import { LiquidityPools } from './components/LiquidityPools';
import { LiquidityView } from './components/LiquidityView';
import { DiscoverView } from './components/DiscoverView';
import { AnalyticsView } from './components/AnalyticsView';
import { OrderBook } from './components/OrderBook';
import { SettingsModal } from './components/SettingsModal';
import { WalletModal } from './components/WalletModal';
import { ScrollReveal } from './components/ScrollReveal';
import { useWallet } from './hooks/useWallet';
import { useSound } from './hooks/useSound';

function App() {
  const [currentView, setCurrentView] = useState('swap');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  
  // Settings State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const wallet = useWallet();
  const { playClick, playSuccess } = useSound(isSoundEnabled);

  // Apply theme to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  // Handler wrapper to play sound on actions
  const handleAction = () => {
    playClick();
  };

  const handleWalletConnect = (type: string) => {
    wallet.connect(type);
    playSuccess(); // Sound effect on successful connection initiation
  };

  // Render content based on current view
  const renderContent = () => {
    switch (currentView) {
      case 'liquidity':
        return <LiquidityView />;
      case 'discover':
        return <DiscoverView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'swap':
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Column: Swap Interface */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="sticky top-24">
                <ScrollReveal delay={0}>
                  <SwapInterface />
                </ScrollReveal>
                
                <ScrollReveal delay={100}>
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/10">
                    <h4 className="text-emerald-400 font-bold text-sm mb-2">Powered by Somnia Data Streams</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Experience zero-latency trading with SDS. Prices, liquidity, and transactions update instantly without page refreshes.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Column: Charts & Data */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <ScrollReveal delay={200}>
                <ChartWidget />
              </ScrollReveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScrollReveal delay={300}>
                  <OrderBook />
                </ScrollReveal>
                <ScrollReveal delay={350}>
                  <TransactionsFeed />
                </ScrollReveal>
              </div>

              <ScrollReveal delay={400}>
                <LiquidityPools />
              </ScrollReveal>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#050505] text-slate-200' : 'bg-slate-50 text-slate-800'} selection:bg-emerald-500/30 font-sans transition-colors duration-300`}>
      <Header 
        activeView={currentView} 
        setView={setCurrentView}
        toggleSettings={() => setIsSettingsOpen(true)}
        wallet={wallet}
        onAction={handleAction}
        onConnectWallet={() => setIsWalletModalOpen(true)}
      />
      
      <PriceTicker />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="border-t border-white/5 mt-20 py-12 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-600 text-sm">© 2024 PulseSwap. Built on Somnia Testnet.</p>
        </div>
      </footer>

      {/* Global Modals */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => { handleAction(); setIsDarkMode(!isDarkMode); }}
        isSoundEnabled={isSoundEnabled}
        toggleSound={() => { handleAction(); setIsSoundEnabled(!isSoundEnabled); }}
      />

      <WalletModal 
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />
    </div>
  );
}

export default App;