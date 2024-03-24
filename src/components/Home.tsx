import { NavigationState } from "../App";
import Button from "./Button";
import { motion } from "framer-motion";

interface HomeProps {
  onSectionClick: (section: NavigationState) => void;
}

export default function Home({ onSectionClick }: HomeProps) {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p>
        I am a generalist AI researcher and software engineer. I believe in
        curiosity, learning and adaptation.
      </p>
      <p>
        Previously, I cofounded{" "}
        <a href="https://typeless.ch" className="text-primary">
          Typeless
        </a>
        , a company that optimizes clinical documentation with speech and
        natural language processing.
      </p>
      <div className="self-center w-full flex flex-col items-center space-y-8 pt-16">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={() => onSectionClick(NavigationState.SideProjects)}
            text="Check out my side projects"
          />
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => onSectionClick(NavigationState.Research)}
            text="Check out my research"
          />
        </motion.div>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => onSectionClick(NavigationState.Home)}
            text="Give me more problems"
          />
        </motion.div>
      </div>
    </div>
  );
}
