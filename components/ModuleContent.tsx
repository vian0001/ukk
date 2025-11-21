import React from 'react';
import { Module } from '../types';
import { Terminal, AlertTriangle, Copy, CheckCircle } from 'lucide-react';

interface ModuleContentProps {
  module: Module;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, show a toast
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{module.title}</h2>
        <p className="text-gray-400 text-lg">{module.description}</p>
      </div>

      <div className="space-y-8">
        {module.steps.map((step) => (
          <div key={step.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-gray-700 bg-gray-800/50 flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                    <CheckCircle size={20} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-100">{step.title}</h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-4 leading-relaxed">
                {step.content}
              </p>

              {step.warning && (
                <div className="mb-6 bg-yellow-900/20 border-l-4 border-yellow-500 p-4 flex gap-3">
                  <AlertTriangle className="text-yellow-500 shrink-0" size={24} />
                  <p className="text-yellow-200 text-sm">{step.warning}</p>
                </div>
              )}

              {step.command && (
                <div className="relative group">
                  <div className="absolute top-0 left-0 bg-gray-900 px-3 py-1 text-xs text-gray-500 font-mono rounded-br border-r border-b border-gray-700">
                    MikroTik Terminal
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                        onClick={() => copyToClipboard(step.command || '')}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-gray-300"
                        title="Copy Command"
                     >
                        <Copy size={16} />
                     </button>
                  </div>
                  <pre className="bg-gray-950 p-6 pt-10 rounded-lg text-green-400 font-mono text-sm overflow-x-auto scrollbar-thin border border-gray-900 shadow-inner">
                    <code>{step.command.trim()}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleContent;