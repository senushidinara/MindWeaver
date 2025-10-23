import React, { useState } from 'react';
import * as Icons from './Icons';
import ToolModal from './ToolModal';
import ImageEditorTool from './ImageEditorTool';

type Tool = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  promptGenerator?: (input: string) => string;
  placeholder?: string;
};

const tools: Tool[] = [
  {
    id: 'imageEditor',
    icon: <Icons.PhotographIcon className="w-10 h-10" />,
    title: 'Image Editor',
    description: 'Edit images with text prompts, powered by AI.',
  },
  {
    id: 'videoScript',
    icon: <Icons.FilmIcon className="w-10 h-10" />,
    title: 'Video Script Generator',
    description: 'Generate a script for a short video based on a topic.',
    promptGenerator: (input) => `Write a short, engaging video script (approx. 1 minute) about the following topic. Include scene descriptions and dialogue or voiceover text.\n\nTopic: "${input}"`,
    placeholder: 'e.g., The history of coffee, a tutorial on changing a tire...',
  },
  {
    id: 'musicComposer',
    icon: <Icons.MusicNoteIcon className="w-10 h-10" />,
    title: 'Music Composer',
    description: 'Get ideas for a musical piece based on a mood or theme.',
    promptGenerator: (input) => `Describe a musical composition that would fit the following mood or theme. Include suggestions for instrumentation, tempo, and melody.\n\nMood/Theme: "${input}"`,
    placeholder: 'e.g., A heroic battle, a peaceful morning, a cyberpunk city at night...',
  },
  {
    id: 'storyWriter',
    icon: <Icons.BookOpenIcon className="w-10 h-10" />,
    title: 'Story Writer',
    description: 'Brainstorm a short story plot from a simple premise.',
    promptGenerator: (input) => `Write a short story plot outline based on the following premise. Include a beginning, rising action, climax, and resolution.\n\nPremise: "${input}"`,
    placeholder: 'e.g., A detective who can read minds, a baker who discovers a magical recipe...',
  },
  {
    id: 'uiMockup',
    icon: <Icons.TemplateIcon className="w-10 h-10" />,
    title: 'UI/UX Mockup Ideas',
    description: 'Describe the UI/UX for an app concept.',
    promptGenerator: (input) => `Provide a detailed description of the UI/UX for the following app concept. Describe the main screens, key components, and user flow.\n\nApp Concept: "${input}"`,
    placeholder: 'e.g., A language learning app that uses AR, a social media app for gardeners...',
  },
  {
    id: '3dModel',
    icon: <Icons.CubeIcon className="w-10 h-10" />,
    title: '3D Model Concepts',
    description: 'Generate a detailed description for a 3D model.',
    promptGenerator: (input) => `Create a detailed text description for a 3D model based on the following idea. Include details about its shape, texture, color, and key features to help a 3D artist create it.\n\nModel Idea: "${input}"`,
    placeholder: 'e.g., A futuristic sci-fi helmet, a fantasy enchanted sword...',
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

const CreativeStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const handleCloseModal = () => setActiveTool(null);

  return (
    <div className="animate-fadeIn">
      {activeTool && activeTool.id === 'imageEditor' && <ImageEditorTool onClose={handleCloseModal} />}
      {activeTool && activeTool.id !== 'imageEditor' && activeTool.promptGenerator && activeTool.placeholder && (
         <ToolModal 
            tool={{
                title: activeTool.title,
                description: activeTool.description,
                promptGenerator: activeTool.promptGenerator,
                placeholder: activeTool.placeholder,
            }} 
            onClose={handleCloseModal} 
         />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onClick={() => setActiveTool(tool)} />
        ))}
      </div>
    </div>
  );
};

export default CreativeStudio;
