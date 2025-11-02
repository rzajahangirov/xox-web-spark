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
          aspect-square w-full rounded-xl 
          bg-game-cell border-2 border-game-grid/40
          transition-all duration-300 shadow-md
          ${!value && isConnected ? 'hover:bg-game-cell-hover hover:scale-110 hover:shadow-lg cursor-pointer hover:border-primary/40' : 'cursor-not-allowed'}
          ${!isConnected && 'opacity-50'}
          flex items-center justify-center
          text-7xl font-bold
          ${value === 'X' ? 'text-game-x animate-in zoom-in-50 duration-300 drop-shadow-lg' : ''}
          ${value === 'O' ? 'text-game-o animate-in zoom-in-50 duration-300 drop-shadow-lg' : ''}
        `}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-8 bg-game-board/80 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md border-2 border-game-grid/30">
      {gameState.board.map((row, rowIndex) => (
        row.map((_, colIndex) => renderCell(rowIndex, colIndex))
      ))}
    </div>
  );
};
