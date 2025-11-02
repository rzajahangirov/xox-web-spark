import { GameState } from '@/hooks/useGameWebSocket';

interface GameBoardProps {
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
  isConnected: boolean;
}

export const GameBoard = ({ gameState, onCellClick, isConnected }: GameBoardProps) => {
  const renderCell = (row: number, col: number) => {
    const value = gameState.board[row][col];
    
    return (
      <button
        key={`${row}-${col}`}
        onClick={() => !value && isConnected && onCellClick(row, col)}
        disabled={!isConnected || !!value}
        className={`
          aspect-square w-full rounded-lg 
          bg-game-cell border-2 border-game-grid
          transition-all duration-200
          ${!value && isConnected ? 'hover:bg-game-cell-hover hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
          ${!isConnected && 'opacity-50'}
          flex items-center justify-center
          text-6xl font-bold
          ${value === 'X' ? 'text-game-x animate-in zoom-in-50 duration-300' : ''}
          ${value === 'O' ? 'text-game-o animate-in zoom-in-50 duration-300' : ''}
        `}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-3 p-6 bg-game-board rounded-2xl shadow-xl w-full max-w-md">
      {gameState.board.map((row, rowIndex) => (
        row.map((_, colIndex) => renderCell(rowIndex, colIndex))
      ))}
    </div>
  );
};
