import { useState } from "react";
import { Chess } from "chess.js";
import "./App.css";
import CustomChessboard from "./components/Chessboard";

const problems: string[] = ["1k6/8/1K6/8/8/8/8/7Q w - - 0 1"];

enum NavigationState {
  Problem,
  Home,
}

function App() {
  // States
  const [navigationState, setNavigationState] = useState<NavigationState>(
    NavigationState.Problem
  );
  const [firstProblemKey, setFirstProblemKey] = useState<number>(0);
  const [problemIndex, setProblemIndex] = useState<number>(0);

  const afterFirstMove = (game: Chess) => {
    // White should have won
    if (game.isCheckmate()) {
      setNavigationState(NavigationState.Home);
    } else {
      setFirstProblemKey((prev) => prev + 1);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center">
      {navigationState === NavigationState.Problem && (
        <div className="w-1/2 flex flex-col items-center">
          <p>Mate me in one move to enter</p>
          <CustomChessboard
            initialPosition={problems[problemIndex]}
            afterFirstMove={afterFirstMove}
            key={firstProblemKey}
          />
        </div>
      )}
      {navigationState === NavigationState.Home && (
        <div className="w-1/2">
          <h1 className="text-3xl font-bold">You solved the first problem!</h1>
        </div>
      )}
    </main>
  );
}

export default App;
