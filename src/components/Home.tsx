const works: Array<Work> = [
  {
    title: "Random Humans Lab",
    description:
      "Collecting empirical evidence regarding the deterministic nature of what seems to be randomness.",
    url: "https://randomhumanslab.com",
  },
  {
    title: "PanoramAI",
    description: "Create and explore your own world",
    url: "https://panoramai.xyz",
  },
];

interface HomeProps {}

export default function Home({}: HomeProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome to ChessMate</h1>
      <p className="text-lg mb-4">
        This is a chess puzzle app. You can play against the computer and solve
        puzzles.
      </p>
      <h2 className="text-2xl font-bold mb-4">Works</h2>
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
    </div>
  );
}
