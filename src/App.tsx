import { useState } from "react";
import { Chess } from "chess.js";
import "./App.css";
import CustomChessboard from "./components/Chessboard";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "./lottie/lockAnimation.json";
import Home from "./components/Home";

const problems: string[] = ["1k6/8/1K6/8/8/8/8/7Q w - - 0 1"];

enum NavigationState {
  Problem,
  ProblemTransition,
  Home,
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

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
      setNavigationState(NavigationState.ProblemTransition);
    } else {
      setFirstProblemKey((prev) => prev + 1);
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <AnimatePresence>
        {navigationState === NavigationState.Problem && (
          <div className="w-1/3 flex flex-col items-center">
            <motion.p
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-xl font-bold mb-4"
            >
              Mate black in one move to enter
            </motion.p>
            <motion.div
              exit={{
                opacity: 0,
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 48px 48px 48px",
                scale: 1.2,
              }}
              transition={{
                opacity: { duration: 0.5, delay: 4 },
                boxShadow: { duration: 4 },
                scale: { duration: 4 },
              }}
              onAnimationComplete={() =>
                setNavigationState(NavigationState.Home)
              }
              className="w-full"
              style={{
                borderRadius: "4px",
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 24px 24px 24px",
              }}
            >
              <CustomChessboard
                initialPosition={problems[problemIndex]}
                afterFirstMove={afterFirstMove}
                key={firstProblemKey}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {navigationState === NavigationState.ProblemTransition && (
        <div className="absolute">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
      {navigationState === NavigationState.Home && <Home />}
    </main>
  );
}

export default App;
