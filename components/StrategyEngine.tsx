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
    id: 'marketAnalysis',
    icon: <Icons.BullseyeIcon className="w-10 h-10" />,
    title: 'Market Analyst',
    description: 'Analyze market trends, competitors, and audience for a product.',
    promptGenerator: (input) => `You are an expert market analyst. Provide a concise market analysis for a product or service related to the following concept. Include target audience, potential competitors, market size, and key trends.\n\nConcept: "${input}"`,
    placeholder: 'e.g., A subscription box for eco-friendly cleaning supplies.',
  },
  {
    id: 'businessModelCanvas',
    icon: <Icons.ViewGridIcon className="w-10 h-10" />,
    title: 'Business Model Canvas',
    description: 'Generate a Business Model Canvas from a business idea.',
    promptGenerator: (input) => `Based on the following business idea, generate a simple Business Model Canvas. Fill in the key sections: Key Partners, Key Activities, Value Propositions, Customer Relationships, Customer Segments, Key Resources, Channels, Cost Structure, and Revenue Streams.\n\nBusiness Idea: "${input}"`,
    placeholder: 'e.g., A mobile app that connects local artists with buyers.',
  },
  {
    id: 'stakeholderMapper',
    icon: <Icons.UsersIcon className="w-10 h-10" />,
    title: 'Stakeholder Mapper',
    description: 'Identify key stakeholders and their interests for a project.',
    promptGenerator: (input) => `For the following project, identify the key stakeholders. For each stakeholder, describe their likely interests, influence, and potential impact on the project.\n\nProject: "${input}"`,
    placeholder: 'e.g., Building a new public park in a residential neighborhood.',
  },
  {
    id: 'riskAssessor',
    icon: <Icons.ShieldCheckIcon className="w-10 h-10" />,
    title: 'Risk Assessor',
    description: 'Identify potential risks and mitigation strategies for a plan.',
    promptGenerator: (input) => `Analyze the following plan and identify five potential risks. For each risk, categorize it (e.g., financial, operational, market) and suggest a possible mitigation strategy.\n\nPlan: "${input}"`,
    placeholder: 'e.g., Launching a new software product in a competitive market.',
  },
  {
    id: 'implementationPlanner',
    icon: <Icons.MapIcon className="w-10 h-10" />,
    title: 'Implementation Planner',
    description: 'Create a high-level implementation plan with key milestones.',
    promptGenerator: (input) => `Create a high-level implementation plan for the following project. Break it down into four major phases and list 2-3 key milestones for each phase.\n\nProject: "${input}"`,
    placeholder: 'e.g., Developing and launching a new e-commerce website.',
  },
  {
    id: 'strategyChatbot',
    icon: <Icons.ChatAlt2Icon className="w-10 h-10" />,
    title: 'Strategy Chatbot',
    description: 'Ask questions about business frameworks and strategic concepts.',
    promptGenerator: (input) => `Provide a clear and concise explanation of the following business strategy or framework. Include its purpose and key components.\n\nConcept: "${input}"`,
    placeholder: 'e.g., Explain SWOT Analysis, What are Porter\'s Five Forces?',
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

const StrategyEngine: React.FC = () => {
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

export default StrategyEngine;
