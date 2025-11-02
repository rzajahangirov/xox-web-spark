import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface GameState {
  board: (string | null)[][];
  currentPlayer: string;
}

export const useGameWebSocket = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(3).fill(null).map(() => Array(3).fill(null)),
    currentPlayer: 'X'
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    console.log('Initializing WebSocket connection...');
    
    const client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log('Connected to WebSocket');
        setIsConnected(true);
        setError(null);
        
        client.subscribe('/topic/game', (message) => {
          console.log('Received game state:', message.body);
          try {
            const newGameState: GameState = JSON.parse(message.body);
            setGameState(newGameState);
          } catch (err) {
            console.error('Error parsing game state:', err);
            setError('Failed to parse game state');
          }
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        setError('Connection error');
        setIsConnected(false);
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
        setIsConnected(false);
      },
      onWebSocketError: (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection failed. Make sure the server is running on localhost:8080');
      }
    });

    clientRef.current = client;
    client.activate();

    return () => {
      console.log('Cleaning up WebSocket connection');
      client.deactivate();
    };
  }, []);

  const sendMove = (row: number, col: number) => {
    if (clientRef.current && isConnected) {
      const move = { row, col };
      console.log('Sending move:', move);
      
      try {
        clientRef.current.publish({
          destination: '/app/move',
          body: JSON.stringify(move)
        });
      } catch (err) {
        console.error('Error sending move:', err);
        setError('Failed to send move');
      }
    } else {
      console.warn('Cannot send move: not connected');
      setError('Not connected to server');
    }
  };

  return {
    gameState,
    isConnected,
    error,
    sendMove
  };
};
