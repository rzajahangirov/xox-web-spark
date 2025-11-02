interface GameStatusProps {
  currentPlayer: string;
  isConnected: boolean;
  error: string | null;
}

export const GameStatus = ({ currentPlayer, isConnected, error }: GameStatusProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-3">
        <div 
          className={`
            h-3 w-3 rounded-full transition-all duration-300
            ${isConnected ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-destructive shadow-lg shadow-destructive/50'}
          `}
        />
        <span className="text-sm font-medium text-muted-foreground">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Current Player</p>
        <div className="flex items-center justify-center gap-2">
          <span 
            className={`
              text-4xl font-bold transition-all duration-300
              ${currentPlayer === 'X' ? 'text-game-x scale-110' : 'text-game-o scale-110'}
            `}
          >
            {currentPlayer}
          </span>
        </div>
      </div>
    </div>
  );
};
