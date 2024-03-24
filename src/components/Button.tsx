import { useState } from "react";
import { motion } from "framer-motion";
import {
  buttonAnim,
  highlightContainerAnim,
  highlightAnim,
} from "./Button.anim";

import S from "./Button.module.css";

interface ButtonProps {
  text: string;
  hueValue?: number;
  onClick: () => void;
}

const Button = ({ text, hueValue = 200, onClick }: ButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div style={{ position: "relative" }}>
      <motion.button
        variants={buttonAnim}
        initial="init"
        animate={hover ? "anim" : "init"}
        whileTap="tap"
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className={S.btn}
        type="button"
        style={{ filter: `hue-rotate(${hueValue}deg)` }}
        onClick={onClick}
      >
        <motion.div
          data-testid="highlight"
          variants={highlightContainerAnim}
          className={S.highlightContainer}
          animate={hover ? "anim" : "init"}
        >
          <motion.div
            variants={highlightAnim}
            className={S.highlight}
          ></motion.div>
        </motion.div>
        <motion.span>{text}</motion.span>
      </motion.button>
    </div>
  );
};

export default Button;
