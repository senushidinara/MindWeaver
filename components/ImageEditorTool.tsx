import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ImageFile } from '../types';
import { SparklesIcon, UploadIcon, DownloadIcon, XIcon, LightBulbIcon } from './Icons';
import { editImageWithPrompt } from '../services/geminiService';

const inspirationalPrompts = [
    "Add a dreamy, watercolor painting effect.",
    "Make this look like a still from a Wes Anderson film.",
    "Turn the landscape into a futuristic cyberpunk city with neon lights.",
    "Add a majestic dragon flying in the sky.",
    "Change the season to a snowy winter landscape.",
];

interface ImageEditorToolProps {
  onClose: () => void;
}

const ImageEditorTool: React.FC<ImageEditorToolProps> = ({ onClose }) => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [prompt, setPrompt] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imageFile) URL.revokeObjectURL(imageFile.previewUrl);
    };
  }, [imageFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (imageFile) URL.revokeObjectURL(imageFile.previewUrl);
      setImageFile({ file, previewUrl: URL.createObjectURL(file) });
      setEditedImageUrl(null);
      setError(null);
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!imageFile || !prompt.trim()) {
      setError('Please upload an image and enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImageUrl(null);
    try {
      const resultUrl = await editImageWithPrompt(imageFile.file, prompt);
      setEditedImageUrl(resultUrl);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? `An error occurred: ${e.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleDownload = () => {
    if (!editedImageUrl) return;
    const link = document.createElement('a');
    link.href = editedImageUrl;
    const originalFilename = imageFile?.file.name.split('.').slice(0, -1).join('.') || 'image';
    link.download = `${originalFilename}-edited.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const suggestPrompt = () => {
    const randomPrompt = inspirationalPrompts[Math.floor(Math.random() * inspirationalPrompts.length)];
    setPrompt(randomPrompt);
  };

  const isGenerateDisabled = isLoading || !imageFile || !prompt.trim();

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-gray-800 rounded-2xl max-w-6xl w-full h-[90vh] flex flex-col p-6 shadow-2xl relative border border-gray-700" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10" aria-label="Close">
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-purple-300 mb-2">Image Editor</h2>
        <p className="text-gray-400 mb-4">Upload an image, describe your desired edit, and let the AI bring your vision to life.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">
          {/* Control Panel */}
          <div className="bg-gray-800 rounded-lg flex flex-col gap-4">
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-gray-700/50 transition-colors h-48 flex items-center justify-center" onClick={triggerFileSelect}>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              {imageFile ? <img src={imageFile.previewUrl} alt="Preview" className="max-h-full mx-auto rounded-lg shadow-md" /> : <div className="flex flex-col items-center gap-2 text-gray-400"><UploadIcon className="w-10 h-10" /><p>Click to upload image</p></div>}
            </div>
            {imageFile && <button onClick={triggerFileSelect} className="w-full text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 px-4 rounded-lg transition-colors">Change Image</button>}

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Describe Your Edit</h3>
                <button onClick={suggestPrompt} disabled={!imageFile} className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"><LightBulbIcon className="w-5 h-5" /> Inspire Me</button>
            </div>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., Add a retro filter..." className="w-full flex-grow p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors resize-none" disabled={!imageFile} />
            
            <button onClick={handleGenerateClick} disabled={isGenerateDisabled} className={`w-full flex items-center justify-center gap-2 py-3 px-6 text-lg font-bold rounded-lg transition-all transform hover:scale-105 ${isGenerateDisabled ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30'}`}>
              <SparklesIcon className="w-6 h-6" />
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>

          {/* Display Area */}
          <div className="bg-gray-900/50 rounded-xl border border-gray-700 flex flex-col items-center justify-center p-4">
            {isLoading && <div className="flex flex-col items-center gap-4 text-gray-400"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div><p>MindWeaving in progress...</p></div>}
            {error && !isLoading && <div className="text-center text-red-400 p-4 bg-red-900/20 rounded-lg"><p className="font-bold">Generation Failed</p><p className="text-sm">{error}</p></div>}
            {!isLoading && !error && editedImageUrl && (
                <div className="flex flex-col items-center gap-4 h-full">
                    <img src={editedImageUrl} alt="Edited result" className="max-w-full max-h-[80%] object-contain rounded-lg shadow-2xl" />
                    <div className="flex items-center gap-4 mt-auto">
                        <button onClick={handleDownload} className="flex items-center justify-center gap-2 py-2 px-5 font-semibold rounded-lg transition-colors bg-green-600 hover:bg-green-500"><DownloadIcon className="w-5 h-5"/>Download</button>
                    </div>
                </div>
            )}
            {!isLoading && !error && !editedImageUrl && <div className="text-center text-gray-500 p-4"><p className="text-lg">Your generated image will appear here.</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorTool;
