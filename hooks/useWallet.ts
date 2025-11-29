import { useState } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  walletType: string | null;
  connect: (type: string) => Promise<void>;
  disconnect: () => void;
}

export const useWallet = (): WalletState => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [walletType, setWalletType] = useState<string | null>(null);

  const connect = async (type: string) => {
    // Logic can be expanded here to handle different providers based on 'type'
    // e.g., if (type === 'metamask') window.ethereum.request(...)
    
    const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
    
    setWalletType(type);
    setAddress(mockAddress);
    setIsConnected(true);
    setChainId(50312); // Somnia Testnet ID
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setChainId(null);
    setWalletType(null);
  };

  return {
    isConnected,
    address,
    chainId,
    walletType,
    connect,
    disconnect
  };
};