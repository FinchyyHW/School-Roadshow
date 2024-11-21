import React from 'react';
import { X } from 'lucide-react';

interface HintPopupProps {
  hint: string;
  isOpen: boolean;
  onClose: () => void;
}

export const HintPopup: React.FC<HintPopupProps> = ({ hint, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl shadow-2xl relative z-10 max-w-md w-full border-2 border-purple-500/30 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="text-xl font-bold text-center text-white mb-2">Need a hint?</h3>
        </div>
        
        <p className="text-gray-300 text-center mb-6">{hint}</p>
        
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transform transition-transform active:scale-95 shadow-lg"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};