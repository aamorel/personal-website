import { NavigationState } from "../App";

interface HomeProps {
  onSectionClick: (section: NavigationState) => void;
}

export default function Home({ onSectionClick }: HomeProps) {
  return (
    <div className="flex flex-col space-y-4 items-start">
      <h1 className="text-4xl font-bold mb-4">Welcome</h1>
      <p>
        I am a generalist AI researcher and software engineer. I believe in
        curiosity, learning and adaptation.
      </p>
      <p>
        Previously, I cofounded{" "}
        <a href="https://typeless.ch" className="text-blue-500">
          Typeless
        </a>
        , a company that optimizes clinical documentation with speech and
        natural language processing.
      </p>
      <button
        onClick={() => onSectionClick(NavigationState.SideProjects)}
        className="text-blue-500"
      >
        Check out my side projects
      </button>
      <button
        onClick={() => onSectionClick(NavigationState.Research)}
        className="text-blue-500"
      >
        Check out my research
      </button>
      <button
        onClick={() => onSectionClick(NavigationState.Home)}
        className="text-blue-500"
      >
        Give me more problems.
      </button>
    </div>
  );
}
