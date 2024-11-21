import React, { useState } from 'react';
import { Shield, Lock, Wifi, HelpCircle, Star } from 'lucide-react';
import { Challenge } from '../types';
import { HintPopup } from './HintPopup';

interface ChallengeCardProps {
  challenge: Challenge;
  onSolve: (id: number, answer: string) => void;
  onShowHint: (hint: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSolve, onShowHint }) => {
  const [answer, setAnswer] = useState('');
  const [isWiggling, setIsWiggling] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHintPopup, setShowHintPopup] = useState(false);

  const getIcon = () => {
    switch (challenge.type) {
      case 'password':
        return <Lock className="w-8 h-8 text-pink-400" />;
      case 'firewall':
        return <Shield className="w-8 h-8 text-blue-400" />;
      case 'encryption':
        return <Wifi className="w-8 h-8 text-green-400" />;
    }
  };

  const handleSubmit = () => {
    if (answer.trim().toUpperCase() === challenge.solution) {
      onSolve(challenge.id, answer);
      setAnswer('');
      setShowExplanation(true);
    } else {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 500);
      setShowHintPopup(true); // Show hint popup on incorrect answer
    }
  };

  return (
    <>
      <div className={`bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105 border-2 border-purple-500/30 ${
        challenge.solved ? 'opacity-75' : ''
      } ${isWiggling ? 'animate-wiggle' : ''}`}>
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <img 
            src={challenge.image} 
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-indigo-900/90" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getIcon()}
                <h3 className="text-2xl font-bold text-white">{challenge.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span className="text-yellow-300 font-bold">{challenge.points}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-lg text-gray-300 mb-4 whitespace-pre-line">{challenge.description}</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              disabled={challenge.solved}
              placeholder="Type your answer here..."
              className="flex-1 bg-indigo-800/50 text-white px-4 py-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 border border-purple-500/30"
            />
            <button
              onClick={handleSubmit}
              disabled={challenge.solved}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transform transition-transform active:scale-95 shadow-lg"
            >
              Submit
            </button>
          </div>

          <button
            onClick={() => onShowHint(challenge.hint)}
            className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 focus:outline-none group"
          >
            <HelpCircle className="w-5 h-5 group-hover:animate-bounce" />
            <span>Need a hint?</span>
          </button>

          {challenge.solved && showExplanation && (
            <div className="mt-4 p-4 bg-green-900/30 rounded-lg border border-green-500/30">
              <h4 className="text-lg font-bold text-green-400 mb-2">Mission Complete! 🎉</h4>
              <p className="text-gray-300 whitespace-pre-line">{challenge.feedback}</p>
            </div>
          )}
        </div>
      </div>

      <HintPopup
        hint={challenge.hint}
        isOpen={showHintPopup}
        onClose={() => setShowHintPopup(false)}
      />
    </>
  );
};