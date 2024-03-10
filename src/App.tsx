import { useState } from "react";
import { Chess } from "chess.js";
import "./App.css";
import CustomChessboard from "./components/Chessboard";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "./lottie/lockAnimation.json";
import Home from "./components/Home";
import { Tooltip } from "react-tooltip";
import { SocialIcon } from "react-social-icons";

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
  const [problemIndex, setProblemIndex] = useState<number>(0);

  const [scope, animate] = useAnimate();

  const afterFirstMove = (game: Chess) => {
    // White should have won
    if (game.isCheckmate()) {
      setNavigationState(NavigationState.ProblemTransition);
      return true;
    } else {
      // Pulse red the boxshadow
      animate(
        scope.current,
        {
          boxShadow: "rgba(255, 0, 0, 0.5) 0px 24px 24px 24px",
        },
        {
          duration: 0.3,
          repeat: 1,
          repeatType: "reverse",
        }
      );
      return false;
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white font-body">
      <header className="absolute top-0 left-0 w-full mt-4 text-xl font-bold flex justify-between items-start">
        <div className="flex flex-col items-start ml-8">
          <p>Aurélien</p>
          <p>Morel</p>
        </div>
        <div className="flex items-center mr-8 bg-white rounded-full p-1 space-x-2">
          <SocialIcon url="https://x.com/aurelien_morel" />
          <SocialIcon url="https://github.com/aamorel" />
          <SocialIcon url="https://www.linkedin.com/in/aur%C3%A9lien-morel-382705107/" />
        </div>
      </header>
      <AnimatePresence>
        {navigationState === NavigationState.Problem && (
          <div className="w-1/3 flex flex-col items-center">
            <motion.img
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-xl font-bold mb-4"
              data-tooltip-id="my-tooltip-inline"
              data-tooltip-content="Mate black in one move!"
              src="./help.svg"
              width={36}
              height={36}
            />
            <Tooltip
              id="my-tooltip-inline"
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "10px",
              }}
            />
            <motion.div
              ref={scope}
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
