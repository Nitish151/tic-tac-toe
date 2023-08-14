import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { ScoreBoard } from "./components/ScoreBoard";
import { ResetButton } from "./components/ResetButton";
import ReactModal from "react-modal";
import { Header } from "./components/Header";

ReactModal.setAppElement("#root");

const customStyles = {
  content: {
    width: "50%",
    height: "50%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "Center",
    background: "white",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
    outline: "none",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [win, setWin] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = (boxId) => {
    const updatedBoard = board.map((value, index) => {
      if (boxId === index) return xPlaying ? "X" : "O";
      else return value;
    });

    const winner = checkWinner(updatedBoard);
    
    
    if (updatedBoard.every((value) => value !== null)) {
      console.log("It's a Tie!");
      setxPlaying(true);
      setWin("Tie");
      openModal(); // Open modal for tie condition
    }
    
    else if (winner) {
      console.log("Winner detected:", winner);
      setxPlaying(true);
      setTimeout(function () {
        openModal();
      }, 500);

      if (winner === "O") {
        setWin("O");
        let { oScore } = scores;
        oScore++;
        setScores({ ...scores, oScore });
      } else {
        setWin("X");
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
        closeModal();
        return board[x];
      }
    }
    return "";
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ReactModal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <h1
          className={win === "X" ? "x" : (win === "O" ? "o" : "tie")}
        >
            {win === "Tie" ? "It's a Tie" : `${win} won`}
        </h1>
        <ScoreBoard scores={scores} xPlaying={xPlaying} style />
        <button className="reset-btn" onClick={closeModal}>
          OK
        </button>
      </ReactModal>
      <Header />
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
