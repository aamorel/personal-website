import { motion } from "framer-motion";
import { works } from "../constants";

interface SideProjectsProps {
  goBackHome: () => void;
}

export default function SideProjects({ goBackHome }: SideProjectsProps) {
  return (
    <div className="w-2/3">
      <button onClick={goBackHome} className="text-blue-500">
        Go back home
      </button>
      <h2 className="text-2xl font-bold mb-4">Side projects</h2>
      <ul>
        {works.map((work, index) => (
          <motion.li
            key={index}
            className="mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-bold">{work.title}</h3>
            <p>{work.description}</p>
            <a href={work.url} className="text-blue-500">
              {work.url}
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
