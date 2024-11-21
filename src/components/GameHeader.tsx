import React from 'react';
import { Shield, Award, Star, Zap } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  level: number;
  streak: number;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ score, level, streak }) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl shadow-xl mb-8 border-2 border-purple-500/30">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Shield className="w-10 h-10 text-purple-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Cyber Hero Academy</h1>
            <p className="text-purple-100">Learn to be safe online!</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="text-center bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
              <p className="text-2xl font-bold text-white">{score}</p>
            </div>
            <p className="text-purple-100">POINTS</p>
          </div>
          <div className="text-center bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-green-300" />
              <p className="text-2xl font-bold text-white">{level}</p>
            </div>
            <p className="text-purple-100">LEVEL</p>
          </div>
          <div className="text-center bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-orange-300" />
              <p className="text-2xl font-bold text-white">{streak}</p>
            </div>
            <p className="text-purple-100">STREAK</p>
          </div>
        </div>
      </div>
    </div>
  );
};