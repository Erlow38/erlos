import React, { useState } from 'react';
import './minesweeper.css';
import Draggable from 'react-draggable';

interface MinesweeperDialogProps {
    isMinesweeperDialogVisible: boolean;
    setIsMinesweeperDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SIZE = 10; 
const MINES_COUNT = 10; 

const generateEmptyGrid = () => {
    return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => ({ isMine: false, isRevealed: false, isMarked: false, count: 0 })));
};  

const placeMines = (grid) => {
    let minesPlaced = 0;
    while (minesPlaced < MINES_COUNT) {
        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);
        if (!grid[x][y].isMine) {
            grid[x][y].isMine = true;
            minesPlaced++;
        }
    }
};

const revealCell = (grid, x, y) => {
    if (x < 0 || y < 0 || x >= SIZE || y >= SIZE || grid[x][y].isRevealed) return;
    grid[x][y].isRevealed = true;
    if (!grid[x][y].isMine) {
        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                count += (x + dx >= 0 && y + dy >= 0 && x + dx < SIZE && y + dy < SIZE && grid[x + dx][y + dy].isMine) ? 1 : 0;
            }
        }
        grid[x][y].count = count;
        if (count === 0) {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    revealCell(grid, x + dx, y + dy);
                }
            }
        }
    }
};

const Minesweeper: React.FC<MinesweeperDialogProps> = ({ isMinesweeperDialogVisible, setIsMinesweeperDialogVisible }) => {
    const setDialogVisible = () => {
        setIsMinesweeperDialogVisible(!isMinesweeperDialogVisible);
    }

    const [grid, setGrid] = useState(() => {
        const initialGrid = generateEmptyGrid();
        placeMines(initialGrid);
        return initialGrid;
    });
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false); 

    const resetGame = () => {
        setGrid(() => {
            const newGrid = generateEmptyGrid();
            placeMines(newGrid);
            return newGrid;
        });
        setTimeout(() => {
            setGameOver(false);
        }, 3000);
    };

    const handleCellClick = (x, y) => {
        if (grid[x][y].isMine) {
            grid[x][y].isRevealed = true; 
            setGameOver(true);
            resetGame();
        } else if (gameOver || gameWon) {
            return;
        }
        else {
            revealCell(grid, x, y);
            setGrid([...grid]);
            checkGameWon(); 
        }
    };    

    const handleCellRightClick = (event, x, y) => {
        event.preventDefault(); 
        if (!gameOver && !gameWon) {
            grid[x][y].isMarked = !grid[x][y].isMarked;
            setGrid([...grid]);
        }
    };

    const checkGameWon = () => {
        let nonMineCellsRevealed = 0;
        let unrevealedMines = 0;
    
        grid.forEach(row => {
            row.forEach(cell => {
                if (!cell.isMine && cell.isRevealed) {
                    nonMineCellsRevealed++;
                } else if (cell.isMine && !cell.isRevealed) {
                    unrevealedMines++;
                }
            });
        });
    
        if (nonMineCellsRevealed === SIZE * SIZE - MINES_COUNT || unrevealedMines === 0) {
            setGameWon(true);
            setTimeout(() => {
                setGameWon(false);
                resetGame();
            }, 3000);
        }
    };
    

    const renderCell = (x, y) => {
        const cell = grid[x][y];
        if (cell.isRevealed) {
            return cell.isMine ? <div className="mine" onClick={resetGame}>💣</div> : <div className="count">{cell.count > 0 ? cell.count : ''}</div>;
        } else {
            return <div className={`cell ${gameOver ? 'revealed' : ''}`} onClick={() => handleCellClick(x, y)} onContextMenu={(event) => handleCellRightClick(event, x, y)}>
                {cell.isMarked && <div className="mine-flag">🚩</div>}
            </div>;
        }
    };

    return (
        <Draggable handle=".minesweeper-dialog-header">
            <div className="minesweeper-dialog-container">
                <div className="minesweeper-dialog">
                    <div className="minesweeper-dialog-content">
                        <div className="minesweeper-dialog-header">
                            <div className="minesweeper-dialog-title">Minesweeper</div>
                            <div className="minesweeper-dialog-close pointer" onClick={setDialogVisible}>
                                <span className="pi pi-times">&times;</span>
                            </div>
                        </div>
                        <div className="minesweeper-dialog-body">
                            <div className="p-grid-minesweeper">
                                <div className="minesweeper">
                                    {grid.map((row, x) => (
                                        <div className="row" key={x}>
                                            {row.map((_, y) => (
                                                <div className="cell-container" key={y}>
                                                    {renderCell(x, y)}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                    <div className='game-over'>
                                        {gameOver ? 'Game Over!' : gameWon ? 'You won!' : '10 mines to find'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    )
};

export default Minesweeper;
