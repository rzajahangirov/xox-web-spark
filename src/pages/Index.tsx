import { GameBoard } from '@/components/GameBoard';
import { GameStatus } from '@/components/GameStatus';
import { useGameWebSocket } from '@/hooks/useGameWebSocket';

const Index = () => {
  const { gameState, isConnected, error, sendMove } = useGameWebSocket();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
            Tic Tac Toe
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Multiplayer Game
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <GameStatus 
            currentPlayer={gameState.currentPlayer}
            isConnected={isConnected}
            error={error}
          />
          
          <GameBoard
            gameState={gameState}
            onCellClick={sendMove}
            isConnected={isConnected}
          />

          {!isConnected && (
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Make sure the backend server is running on <code className="bg-muted px-2 py-1 rounded">localhost:8080</code>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
