const works: Array<Work> = [
  {
    title: "Random Humans Lab",
    description:
      "Collecting empirical evidence regarding the deterministic nature of what seems to be randomness.",
    url: "https://randomhumanslab.com",
  },
  {
    title: "PanoramAI",
    description: "Create and explore your own world.",
    url: "https://panoramai.xyz",
  },
];

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

interface HomeProps {}

export default function Home({}: HomeProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p>
        I am a generalist AI researcher and software engineer. I believe in
        curiosity, learning and adaptation.
      </p>
      <h2 className="text-2xl font-bold mb-4 mt-8">Companies</h2>
      <ul>
        {companies.map((company, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-xl font-bold">{company.title}</h3>
            <p>{company.description}</p>
            <a href={company.url} className="text-blue-500">
              {company.url}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Side projects</h2>
      <ul>
        {works.map((work, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-xl font-bold">{work.title}</h3>
            <p>{work.description}</p>
            <a href={work.url} className="text-blue-500">
              {work.url}
            </a>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4 mt-8">Research</h2>
      <ul>
        {research.map((research, index) => (
          <li key={index} className="mb-4">
            <h3 className="text-xl font-bold">{research.title}</h3>
            <a href={research.url} className="text-blue-500">
              {research.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
