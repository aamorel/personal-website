import { motion } from "framer-motion";

const research: Array<Research> = [
  {
    title:
      "Automatic Acquisition of a Repertoire of Diverse Grasping Trajectories through Behavior Shaping and Novelty Search",

    url: "https://arxiv.org/abs/2205.08189",
  },
];

interface ResearchProps {
  goBackHome: () => void;
}

export default function Research({ goBackHome }: ResearchProps) {
  return (
    <div>
      <button onClick={goBackHome} className="text-blue-500">
        Go back home
      </button>
      <h2 className="text-2xl font-bold mb-4">Research</h2>
      <ul>
        {research.map((research, index) => (
          <motion.li
            key={index}
            className="mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-bold">{research.title}</h3>
            <a href={research.url} className="text-blue-500">
              {research.url}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
