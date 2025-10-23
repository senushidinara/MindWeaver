import React, { useState } from 'react';
import * as Icons from './Icons';
import ToolModal from './ToolModal';

type Tool = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  promptGenerator: (input: string) => string;
  placeholder: string;
};

const tools: Tool[] = [
  {
    id: 'crossDomainWeaver',
    icon: <Icons.LinkIcon className="w-10 h-10" />,
    title: 'Cross-Domain Weaver',
    description: 'Connect a concept to unrelated fields to spark innovation.',
    promptGenerator: (input) => `Analyze the core principles of the following concept and find surprising, insightful, and innovative connections to three completely unrelated fields or domains. Explain the connection for each.\n\nCore Concept: "${input}"`,
    placeholder: 'e.g., Mycelial networks, quantum computing, ancient Greek philosophy...',
  },
  {
    id: 'analogyFinder',
    icon: <Icons.LightBulbIcon className="w-10 h-10" />,
    title: 'Analogy Finder',
    description: 'Find powerful analogies to explain complex ideas simply.',
    promptGenerator: (input) => `You are a creative AI specializing in analogies. Find a surprising and insightful analogy from a completely different domain to explain the core concept of the following complex idea. Explain why the analogy works.\n\nComplex Idea: "${input}"`,
    placeholder: 'e.g., Blockchain technology, general relativity, machine learning...',
  },
  {
    id: 'futureForecaster',
    icon: <Icons.TrendingUpIcon className="w-10 h-10" />,
    title: 'Future Forecaster',
    description: 'Extrapolate future trends based on a current technology or idea.',
    promptGenerator: (input) => `Based on the current state of the following technology or idea, extrapolate and describe three potential future trends or societal impacts it could have in the next 20 years.\n\nTechnology/Idea: "${input}"`,
    placeholder: 'e.g., Artificial general intelligence, ubiquitous augmented reality...',
  },
  {
    id: 'ethicalImplications',
    icon: <Icons.ScaleIcon className="w-10 h-10" />,
    title: 'Ethical Implications',
    description: 'Explore the potential ethical dilemmas of a new concept.',
    promptGenerator: (input) => `Analyze the following concept or technology and identify three potential ethical dilemmas or societal challenges it might create. For each point, briefly explain the nature of the ethical concern.\n\nConcept/Technology: "${input}"`,
    placeholder: 'e.g., AI that can perfectly mimic human voices, fully autonomous weapons...',
  },
  {
    id: 'systemMapper',
    icon: <Icons.ShareIcon className="w-10 h-10" />,
    title: 'System Mapper',
    description: 'Describe the interconnected parts of a complex system.',
    promptGenerator: (input) => `Describe the following as a complex system. Identify its key components, the relationships between them, and the overall emergent behavior of the system.\n\nSystem: "${input}"`,
    placeholder: 'e.g., A city\'s transportation network, the global food supply chain...',
  },
  {
    id: 'synthesisChatbot',
    icon: <Icons.ChatAlt2Icon className="w-10 h-10" />,
    title: 'Synthesis Chatbot',
    description: 'Discuss historical examples of innovation and synthesis.',
    promptGenerator: (input) => `Provide a historical example of a major innovation that resulted from the synthesis of ideas from different fields. Describe the fields involved and how their combination led to the breakthrough.\n\nTopic of Interest: "${input}"`,
    placeholder: 'e.g., The printing press, the invention of the GPS...',
  },
];

const ToolCard: React.FC<{ tool: Tool; onClick: () => void }> = ({ tool, onClick }) => (
  <button
    onClick={onClick}
    className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col items-center text-center hover:border-purple-500 hover:shadow-xl hover:scale-105 transition-all"
  >
    <div className="text-purple-400 mb-4">{tool.icon}</div>
    <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
    <p className="text-gray-400 text-sm flex-grow">{tool.description}</p>
  </button>
);

const SynthesisCore: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleCloseModal = () => setActiveTool(null);

  return (
    <div className="animate-fadeIn">
      {activeTool && (
        <ToolModal tool={activeTool} onClose={handleCloseModal} />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onClick={() => setActiveTool(tool)} />
        ))}
      </div>
    </div>
  );
};

export default SynthesisCore;
