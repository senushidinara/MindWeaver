import React, { useState } from 'react';
import { SparklesIcon, InformationCircleIcon } from './components/Icons';
import Sidebar, { View } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CreativeStudio from './components/CreativeStudio';
import ResearchHub from './components/ResearchHub';
import StrategyEngine from './components/StrategyEngine';
import SynthesisCore from './components/SynthesisCore';


const App: React.FC = () => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<View>('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'creativeStudio':
        return <CreativeStudio />;
      case 'researchHub':
        return <ResearchHub />;
      case 'strategyEngine':
        return <StrategyEngine />;
      case 'synthesisCore':
        return <SynthesisCore />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };
  
  const getHeaderTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard';
      case 'creativeStudio': return 'Creative Studio';
      case 'researchHub': return 'Research Hub';
      case 'strategyEngine': return 'Strategy Engine';
      case 'synthesisCore': return 'Synthesis Core';
      default: return 'MindWeaver';
    }
  }

  const AboutModal = () => (
    <div 
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={() => setIsAboutModalOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
    >
        <div 
            className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative border border-gray-700"
            onClick={(e) => e.stopPropagation()}
        >
             <button 
                onClick={() => setIsAboutModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
             <div className="prose prose-invert prose-headings:text-purple-300 prose-a:text-purple-400">
                <h2 id="about-modal-title">MindWeaver - Collaborative Human-AI Creativity Platform</h2>

                <h3>🎯 Core Concept</h3>
                <p>A revolutionary platform where humans and AI collaborate in real-time to solve complex problems, create art, and innovate beyond what either could achieve alone.</p>

                <h3>🚀 Technical Implementation</h3>
                <pre><code className="text-sm">{`class MindWeaver:
    def __init__(self):
        self.idea_generator = CreativeAIEngine()
        self.collaboration_orchestrator = HumanAICoordination()
        self.innovation_validator = ImpactAssessmentAI()
        self.knowledge_synthesizer = CrossDomainConnector()
    
    def facilitate_breakthrough(self, ...):
        # AI generates initial creative concepts
        raw_ideas = self.idea_generator.brainstorm(...)
        
        # Human-AI collaboration session
        collaboration_session = self.collaboration_orchestrator.facilitate(...)
        
        # Refine and validate innovations
        validated_solutions = self.innovation_validator.assess(...)
        
        # Synthesize cross-domain insights
        breakthrough_insights = self.knowledge_synthesizer.connect_domains(...)
        
        return InnovationBreakthrough(...)`}</code></pre>

                <h3>💡 Key Features</h3>
                <ul>
                    <li><strong>Augmented Creativity:</strong> AI enhances human creative capabilities</li>
                    <li><strong>Cross-Domain Innovation:</strong> Connects unrelated fields for breakthrough ideas</li>
                    <li><strong>Real-Time Collaboration:</strong> Seamless human-AI teamwork sessions</li>
                    <li><strong>Idea Evolution Tracking:</strong> Maps how ideas transform through collaboration</li>
                </ul>

                <h3>🎨 Real-Life Scenarios</h3>
                <p>From accelerating scientific discovery by generating novel hypotheses to creating new art movements by blending human emotion with AI precision, MindWeaver is a catalyst for innovation.</p>

                 <h3>🏗️ Technology Stack</h3>
                <ul>
                    <li><strong>Creative AI:</strong> Gemini, DALL-E, and custom generative models</li>
                    <li><strong>Collaboration Tools:</strong> Real-time multi-user interface with version control</li>
                    <li><strong>Knowledge Graph:</strong> Semantic connections across domains</li>
                </ul>
             </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex">
      {isAboutModalOpen && <AboutModal />}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col h-screen">
          <header className="py-4 px-6 border-b border-gray-700 shadow-lg bg-gray-900/80 backdrop-blur-sm sticky top-0 z-30 flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <SparklesIcon className="w-7 h-7 text-purple-400" />
              <span>MindWeaver<span className="text-gray-400 font-normal text-xl ml-2">| {getHeaderTitle()}</span></span>
            </h1>
            <button 
                onClick={() => setIsAboutModalOpen(true)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                title="Learn about MindWeaver"
            >
                <InformationCircleIcon className="w-5 h-5" />
                About
            </button>
          </header>
          <main className="flex-grow overflow-y-auto p-4 md:p-8 bg-gray-900">
            {renderActiveView()}
          </main>
      </div>
    </div>
  );
};

export default App;