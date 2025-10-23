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
    id: 'literatureReview',
    icon: <Icons.BookOpenIcon className="w-10 h-10" />,
    title: 'Literature Reviewer',
    description: 'Summarize key findings and gaps in literature for a topic.',
    promptGenerator: (input) => `You are an AI research assistant. Provide a concise summary of the current state of research, key findings, and notable gaps in the academic literature regarding the following topic:\n\nTopic: "${input}"`,
    placeholder: 'e.g., The impact of microplastics on marine life, CRISPR gene editing ethics...',
  },
  {
    id: 'hypothesisGenerator',
    icon: <Icons.BeakerIcon className="w-10 h-10" />,
    title: 'Hypothesis Generator',
    description: 'Generate novel, testable hypotheses from a research question.',
    promptGenerator: (input) => `Based on the following research question, generate three distinct, novel, and testable scientific hypotheses. For each hypothesis, briefly describe a potential experimental approach.\n\nResearch Question: "${input}"`,
    placeholder: 'e.g., How does sleep deprivation affect long-term memory consolidation?',
  },
  {
    id: 'dataAnalyst',
    icon: <Icons.ChartBarIcon className="w-10 h-10" />,
    title: 'Data Analyst',
    description: 'Suggest analysis methods for a given dataset and goal.',
    promptGenerator: (input) => `I have a dataset with the following characteristics and a specific research goal. Suggest appropriate statistical or machine learning methods to analyze this data.\n\nDataset & Goal: "${input}"`,
    placeholder: 'e.g., Dataset: daily stock prices for 5 years. Goal: forecast next month\'s price trend.',
  },
  {
    id: 'codeGenerator',
    icon: <Icons.CodeIcon className="w-10 h-10" />,
    title: 'Code Generator',
    description: 'Generate code snippets for data analysis or simulation tasks.',
    promptGenerator: (input) => `Write a code snippet in Python to perform the following task. Include comments explaining the code.\n\nTask: "${input}"`,
    placeholder: 'e.g., A Python function to calculate the standard deviation of a list of numbers.',
  },
  {
    id: 'experimentDesigner',
    icon: <Icons.MicroscopeIcon className="w-10 h-10" />,
    title: 'Experiment Designer',
    description: 'Outline an experimental design to test a hypothesis.',
    promptGenerator: (input) => `Outline a basic experimental design to test the following hypothesis. Include the independent variable, dependent variable, control group, and main steps of the procedure.\n\nHypothesis: "${input}"`,
    placeholder: 'e.g., Hypothesis: Plants exposed to classical music will grow taller than those in silence.',
  },
  {
    id: 'researchChatbot',
    icon: <Icons.ChatAlt2Icon className="w-10 h-10" />,
    title: 'Research Chatbot',
    description: 'Ask complex scientific questions and get detailed explanations.',
    promptGenerator: (input) => `Provide a clear and detailed explanation for the following scientific question. Explain it as you would to a university student.\n\nQuestion: "${input}"`,
    placeholder: 'e.g., Explain the mechanism of mRNA vaccines.',
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

const ResearchHub: React.FC = () => {
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

export default ResearchHub;
