import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface AnswerHistoryEntry {
  challengeId: number;
  challengeTitle: string;
  answer: string;
  correct: boolean;
  timestamp: Date;
  feedback?: string;
}

interface AnswerHistoryProps {
  entries: AnswerHistoryEntry[];
  isOpen: boolean;
  onClose: () => void;
}

export const AnswerHistory: React.FC<AnswerHistoryProps> = ({ entries, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-xl shadow-2xl relative z-10 max-w-4xl w-full border-2 border-purple-500/30 animate-fadeIn max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Clock className="w-6 h-6 mr-2" />
            Answer History ({entries.length} submissions)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 pr-2">
          {entries.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No answers submitted yet. Try answering some challenges!
            </div>
          ) : (
            entries.map((entry, index) => (
              <div 
                key={index}
                className="mb-4 bg-indigo-800/30 rounded-lg p-4 border border-purple-500/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      {entry.correct ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400 mr-2" />
                      )}
                      {entry.challengeTitle}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {entry.timestamp.toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    entry.correct ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {entry.answer}
                  </span>
                </div>
                
                {entry.feedback && (
                  <div className={`mt-2 text-sm ${
                    entry.correct ? 'text-gray-300' : 'text-red-300'
                  } bg-indigo-900/30 p-3 rounded-lg`}>
                    {entry.feedback}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};