import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import { ResetButton } from "./components/ResetButton";



function App() {
  const WIN_CONDITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setxPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

   

 
  const handleClick = (boxId) => {
    const updatedBoard = board.map((value, index) => {
      if (boxId === index) return xPlaying === true ? "X" : "O";
      else return value;
    });

    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore++;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore++;
        setScores({ ...scores, xScore });
      }
    }

    setBoard(updatedBoard);
    setxPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITION.length; i++) {
      const [x, y, z] = WIN_CONDITION[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        console.log(board[x]);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
     

      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
