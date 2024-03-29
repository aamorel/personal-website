import { useState, useRef } from "react";
import { Square, Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

interface CustomChessboardProps {
  problem: Problem;
  afterFirstMove: (game: Chess) => boolean;
}

export default function CustomChessboard({
  problem,
  afterFirstMove,
}: CustomChessboardProps) {
  const game = useRef(problem ? new Chess(problem.problem) : new Chess());
  const [gamePosition, setGamePosition] = useState<string>(game.current.fen());

  function makeAMove(
    move:
      | string
      | {
          from: Square;
          to: Square;
          promotion?: "q" | "r" | "b" | "n";
        }
  ) {
    try {
      game.current.move(move);
      setGamePosition(game.current.fen());
      return true;
    } catch (error) {
      return false;
    }
  }

  function makeRandomMove() {
    const possibleMoves = game.current.moves();
    if (
      game.current.isGameOver() ||
      game.current.isDraw() ||
      possibleMoves.length === 0
    )
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) return false;
    const didTransition = afterFirstMove(game.current);
    if (!didTransition) {
      // Set back to initial position
      game.current.undo();
      setGamePosition(game.current.fen());
    }
    return true;
  }

  return <Chessboard position={gamePosition} onPieceDrop={onDrop} />;
}
