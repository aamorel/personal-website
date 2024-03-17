import { useState, useRef } from "react";
import { Chess } from "chess.js";
import "./App.css";
import CustomChessboard from "./components/Chessboard";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "./lottie/lockAnimation.json";
import Home from "./components/Home";
import { Tooltip } from "react-tooltip";
import { SocialIcon } from "react-social-icons";
import SideProjects from "./components/SideProjects";
import WaveText from "./components/WaveText";
import Research from "./components/Research";
import { problems } from "./constants";
import { Analytics } from "@vercel/analytics/react";

export const enum NavigationState {
  Problem,
  ProblemTransition,
  Home,
  SideProjects,
  Research,
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

  // Refs
  const nextNavigationState = useRef<NavigationState>(NavigationState.Home);

  const [scope, animate] = useAnimate();
  const [scopeWinCounter, animateWinCounter] = useAnimate();

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
  const onSectionClick = (section: NavigationState) => {
    nextNavigationState.current = section;
    setNavigationState(NavigationState.Problem);
  };

  const goBackHome = () => {
    setNavigationState(NavigationState.Home);
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900 text-white font-body px-4">
      <header className="absolute top-0 left-0 w-full mt-4 text-xl font-bold flex justify-between items-start">
        <div className="flex flex-col items-start ml-8">
          <p>Aurélien</p>
          <p>Morel</p>
        </div>
        <div className="flex items-center mr-8 bg-white rounded-full p-1 space-x-2">
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
          >
            <SocialIcon url="https://x.com/aurelien_morel" />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
          >
            <SocialIcon url="https://github.com/aamorel" />
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
          >
            <SocialIcon url="https://www.linkedin.com/in/aur%C3%A9lien-morel-382705107/" />
          </motion.div>
        </div>
      </header>
      <AnimatePresence>
        {navigationState === NavigationState.Problem && (
          <div className="w-3/4 md:w-2/5 flex flex-col items-center space-y-2">
            <motion.p
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-2xl font-bold text-center mb-8"
            >
              <WaveText text={problems[problemIndex % problems.length].text} />
            </motion.p>
            <motion.div
              ref={scope}
              exit={{
                opacity: 0,
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 48px 48px 48px",
                scale: 1.2,
              }}
              transition={{
                opacity: { duration: 0.5, delay: 2.5 },
                boxShadow: { duration: 2.5 },
                scale: { duration: 2.5 },
              }}
              onAnimationComplete={() => {
                setNavigationState(nextNavigationState.current);
                setProblemIndex(problemIndex + 1);
                animateWinCounter(
                  scopeWinCounter.current,
                  {
                    scale: 1.5,
                  },
                  {
                    duration: 0.5,
                    repeat: 1,
                    repeatType: "reverse",
                  }
                );
              }}
              className="w-full"
              style={{
                borderRadius: "4px",
                boxShadow: "rgba(0, 0, 0, 0.5) 0px 24px 24px 24px",
              }}
            >
              <CustomChessboard
                problem={problems[problemIndex % problems.length]}
                afterFirstMove={afterFirstMove}
              />
            </motion.div>
            <motion.div
              className="w-full flex justify-between items-center mb-4"
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <p>Goal: mate black in one move.</p>
              <img
                className="text-xl font-bold"
                data-tooltip-id="my-tooltip-inline"
                data-tooltip-content={
                  problems[problemIndex % problems.length].hint
                }
                src="./help.svg"
                width={36}
                height={36}
                alt="help"
              />
            </motion.div>
            <Tooltip
              id="my-tooltip-inline"
              style={{
                backgroundColor: "white",
                color: "black",
                padding: "10px",
              }}
            />
          </div>
        )}
      </AnimatePresence>
      {navigationState === NavigationState.ProblemTransition && (
        <div className="absolute">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
      {navigationState === NavigationState.Home && (
        <Home onSectionClick={onSectionClick} />
      )}
      {navigationState === NavigationState.SideProjects && (
        <SideProjects goBackHome={goBackHome} />
      )}
      {navigationState === NavigationState.Research && (
        <Research goBackHome={goBackHome} />
      )}
      <div className="absolute bottom-0 right-0 mb-8 mr-8 text-center flex flex-col items-center bg-white rounded-lg p-2">
        <motion.div
          className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center mb-2"
          ref={scopeWinCounter}
        >
          <p className="font-bold">{problemIndex}</p>
        </motion.div>
        <img src="./white-king.svg" alt="white-king" width={40} />
      </div>
      <Analytics />
    </main>
  );
}

export default App;
