import React from 'react';
import { PaletteIcon, MicroscopeIcon, KnightIcon, LinkIcon } from './Icons';
import { View } from './Sidebar';

interface DashboardProps {
  setActiveView: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  
  const hubs = [
    {
      view: 'creativeStudio' as View,
      icon: <PaletteIcon className="w-12 h-12 text-purple-400 mb-4" />,
      title: 'Creative Studio',
      description: 'Generate art, video scripts, music, and more. A suite for the modern digital artist.',
      buttonText: 'Create',
    },
    {
      view: 'researchHub' as View,
      icon: <MicroscopeIcon className="w-12 h-12 text-purple-400 mb-4" />,
      title: 'Research Hub',
      description: 'Accelerate discovery with AI-powered literature reviews, data analysis, and hypothesis generation.',
      buttonText: 'Research',
    },
    {
      view: 'strategyEngine' as View,
      icon: <KnightIcon className="w-12 h-12 text-purple-400 mb-4" />,
      title: 'Strategy Engine',
      description: 'Develop robust business and project plans with tools for market analysis and risk assessment.',
      buttonText: 'Strategize',
    },
     {
      view: 'synthesisCore' as View,
      icon: <LinkIcon className="w-12 h-12 text-purple-400 mb-4" />,
      title: 'Synthesis Core',
      description: 'Discover breakthrough insights by connecting ideas from unrelated fields and domains.',
      buttonText: 'Synthesize',
    },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl text-center animate-fadeIn">
      <h1 className="text-4xl font-bold text-purple-300 mb-4">Welcome to MindWeaver</h1>
      <p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto">
        A revolutionary platform where your creativity is augmented by artificial intelligence.
        Select a hub to begin collaborating with our specialized AI agents to solve problems, create art, and innovate beyond imagination.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hubs.map(hub => (
           <div key={hub.view} className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 flex flex-col items-center hover:border-purple-500 hover:shadow-xl transition-all">
              {hub.icon}
              <h2 className="text-2xl font-semibold mb-2">{hub.title}</h2>
              <p className="text-gray-400 mb-4 flex-grow">
                {hub.description}
              </p>
              <button
                onClick={() => setActiveView(hub.view)}
                className="mt-auto bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors w-full"
              >
                {hub.buttonText}
              </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;