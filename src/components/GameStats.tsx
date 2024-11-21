import React from 'react';
import { BarChart2, Award } from 'lucide-react';

interface GameStatsProps {
  totalCorrect: number;
  totalWrong: number;
  onRestart: () => void;
}

export const GameStats: React.FC<GameStatsProps> = ({ totalCorrect, totalWrong, onRestart }) => {
  const total = totalCorrect + totalWrong;
  const correctPercentage = total > 0 ? Math.round((totalCorrect / total) * 100) : 0;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 mb-8 border-2 border-purple-500/30">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-3">
          <BarChart2 className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">Game Statistics</h2>
        </div>
        
        <div className="flex space-x-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{totalCorrect}</p>
            <p className="text-sm text-gray-300">Correct</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">{totalWrong}</p>
            <p className="text-sm text-gray-300">Wrong</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">{correctPercentage}%</p>
            <p className="text-sm text-gray-300">Success Rate</p>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors text-white font-semibold shadow-lg"
        >
          <Award className="w-5 h-5" />
          <span>Restart Game</span>
        </button>
      </div>
    </div>
  );
};