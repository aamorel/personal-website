import { motion } from "framer-motion";

const companies: Array<Company> = [
  {
    title: "Typeless",
    description:
      "Go from plain text to compliant medical notes, or organize large amounts of natural language in your clinical documents.",
    url: "https://typeless.ch",
  },
];

const research: Array<Research> = [
  {
    title:
      "Automatic Acquisition of a Repertoire of Diverse Grasping Trajectories through Behavior Shaping and Novelty Search",

    url: "https://arxiv.org/abs/2205.08189",
  },
];

interface HomeProps {
  onSideProjectsClick: () => void;
}

export default function Home({ onSideProjectsClick }: HomeProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p>
        I am a generalist AI researcher and software engineer. I believe in
        curiosity, learning and adaptation.
      </p>
      <button onClick={onSideProjectsClick} className="text-blue-500">
        Check out my side projects
      </button>
      <h2 className="text-2xl font-bold mb-4 mt-8">Companies</h2>
      <ul>
        {companies.map((company, index) => (
          <motion.li
            key={index}
            className="mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-bold">{company.title}</h3>
            <p>{company.description}</p>
            <a href={company.url} className="text-blue-500">
              {company.url}
            </a>
          </motion.li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4 mt-8">Research</h2>
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
