import React, { useState, useCallback } from 'react';
import { generateText } from '../services/geminiService';
import { SparklesIcon, XIcon } from './Icons';

interface ToolModalProps {
  tool: {
    title: string;
    description: string;
    promptGenerator: (input: string) => string;
    placeholder: string;
  };
  onClose: () => void;
}

const ToolModal: React.FC<ToolModalProps> = ({ tool, onClose }) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) {
      setError(`Please provide input for: ${tool.title}`);
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const prompt = tool.promptGenerator(input);
      const generatedResult = await generateText(prompt);
      setResult(generatedResult);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [input, tool]);

  const isGenerateDisabled = isLoading || !input.trim();

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-gray-800 rounded-2xl max-w-4xl w-full h-[90vh] flex flex-col p-6 shadow-2xl relative border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">{tool.title}</h2>
        <p className="text-gray-400 mb-4">{tool.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow min-h-0">
            {/* Input Panel */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Input</h3>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tool.placeholder}
                    className="w-full flex-grow p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors resize-none"
                    aria-label={`${tool.title} input`}
                />
                 <button
                    onClick={handleGenerate}
                    disabled={isGenerateDisabled}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 text-lg font-bold rounded-lg transition-all transform hover:scale-105 ${
                        isGenerateDisabled
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30'
                    }`}
                    aria-live="polite"
                >
                    <SparklesIcon className="w-6 h-6" />
                    {isLoading ? 'Generating...' : 'Generate'}
                </button>
            </div>

            {/* Output Panel */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-semibold">Output</h3>
                <div className="w-full flex-grow bg-gray-900/50 rounded-xl border border-gray-700 p-4 relative overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400 bg-gray-900/50" role="status">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                            <p>MindWeaving in progress...</p>
                        </div>
                    )}
                     {error && !isLoading && (
                        <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-lg h-full flex flex-col justify-center items-center" role="alert">
                            <p className="font-bold">Generation Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                    {!isLoading && !error && result && (
                        <div className="prose prose-invert prose-p:text-gray-300 prose-li:text-gray-300 w-full max-w-none whitespace-pre-wrap p-2 h-full overflow-y-auto">
                           {result}
                        </div>
                    )}
                    {!isLoading && !error && !result && (
                        <div className="text-center text-gray-500 h-full flex items-center justify-center">
                            <p>AI-generated output will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ToolModal;
