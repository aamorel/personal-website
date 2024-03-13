import React from "react";
import { motion } from "framer-motion";

interface WaveTextProps {
  text: string;
}

const WaveText: React.FC<WaveTextProps> = ({ text }) => {
  // Split the text into words
  const words = text.split(" ");

  // Animation variants for the motion component
  const wordAnimation = {
    initial: { y: 0 },
    hover: { y: -20 }, // Adjust the y value to control the height of the wave
  };

  return (
    <div style={{ display: "inline-block" }}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordAnimation}
          initial="initial"
          whileHover="hover"
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ display: "inline-block", margin: "0 4px" }} // Adjusted margin for word spacing
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default WaveText;
