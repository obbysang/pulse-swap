// This file simulates the @somnia/data-streams SDK structure.
// In a real project, you would import { SomniaDataStreams } from '@somnia/data-streams';

import { StreamEventType } from '../types';

export interface SDSConfig {
  network: 'testnet' | 'mainnet';
  apiKey?: string;
}

export interface SubscriptionOptions {
  contractAddress?: string;
  topic?: string;
  filter?: any;
}

export class SomniaDataStreams {
  private listeners: Map<string, Function[]> = new Map();
  private isConnected: boolean = false;

  constructor(config: SDSConfig) {
    console.log(`Initializing Somnia Data Streams SDK on ${config.network}...`);
    this.connect();
  }

  private connect() {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      console.log('Somnia Data Streams: Connected');
    }, 500);
  }

  /**
   * Subscribes to a specific data stream event.
   * Returns an unsubscribe function.
   */
  public subscribe(eventType: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    
    const callbacks = this.listeners.get(eventType)!;
    callbacks.push(callback);

    console.log(`SDS: Subscribed to ${eventType}`);

    return () => {
      const currentCallbacks = this.listeners.get(eventType);
      if (currentCallbacks) {
        this.listeners.set(eventType, currentCallbacks.filter(cb => cb !== callback));
      }
    };
  }

  /**
   * Internal method to simulate incoming data from the blockchain network.
   * In the real SDK, this would be triggered by WebSocket messages.
   */
  public emit(eventType: string, data: any) {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(cb => cb(data));
    }
  }
}