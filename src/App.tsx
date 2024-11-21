import React, { useState } from 'react';
import { GameHeader } from './components/GameHeader';
import { ChallengeCard } from './components/ChallengeCard';
import { Terminal } from './components/Terminal';
import { AnswerHistory } from './components/AnswerHistory';
import { GameStats } from './components/GameStats';
import { initialChallenges } from './data/challenges';
import type { Challenge, GameState } from './types';
import { History } from 'lucide-react';

interface AnswerHistoryEntry {
  challengeId: number;
  challengeTitle: string;
  answer: string;
  correct: boolean;
  timestamp: Date;
  feedback?: string;
}

const initialGameState: GameState = {
  score: 0,
  currentLevel: 1,
  attempts: 0,
  gameOver: false,
  challenges: [...initialChallenges] as Challenge[],
  showHint: false,
  currentHint: '',
  streak: 0,
  totalCorrect: 0,
  totalWrong: 0,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [terminalContent, setTerminalContent] = useState(
    "🔒 Welcome to Advanced Cyber Defense Training! 🔒\n\nAs a Year 10 student, you're ready to tackle real cybersecurity challenges.\nComplete missions to learn about encryption, network security, and more!\n\nYour first mission awaits, Agent! 🚀"
  );

  const [answerHistory, setAnswerHistory] = useState<AnswerHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSolveChallenge = (id: number, answer: string) => {
    const challenge = gameState.challenges.find(c => c.id === id);
    if (!challenge || challenge.solved) return;

    const isCorrect = answer.toUpperCase() === challenge.solution;
    
    // Log the attempt to history
    setAnswerHistory(prev => [{
      challengeId: id,
      challengeTitle: challenge.title,
      answer: answer,
      correct: isCorrect,
      timestamp: new Date(),
      feedback: isCorrect ? challenge.feedback : undefined
    }, ...prev]);

    if (isCorrect) {
      const newStreak = gameState.streak + 1;
      const streakBonus = Math.floor(newStreak / 3) * 50;
      const totalPoints = challenge.points + streakBonus;

      setTerminalContent(
        `🎯 Mission Accomplished!\n${challenge.feedback}\n` +
        `+${challenge.points} base points\n` +
        (streakBonus > 0 ? `+${streakBonus} streak bonus!\n` : '') +
        `Current streak: ${newStreak} 🔥`
      );

      setGameState(prev => ({
        ...prev,
        score: prev.score + totalPoints,
        currentLevel: Math.floor((prev.score + totalPoints) / 500) + 1,
        streak: newStreak,
        totalCorrect: prev.totalCorrect + 1,
        challenges: prev.challenges.map(c =>
          c.id === id ? { ...c, solved: true } : c
        ),
      }));
    } else {
      setTerminalContent("⚠️ Security breach detected! Review your solution and try again. Remember: attention to detail is crucial in cybersecurity!");
      setGameState(prev => ({
        ...prev,
        attempts: prev.attempts + 1,
        streak: 0,
        totalWrong: prev.totalWrong + 1,
      }));
    }
  };

  const handleShowHint = (hint: string) => {
    setTerminalContent(`💡 Intelligence Report: ${hint}`);
  };

  const handleRestart = () => {
    setGameState({
      ...initialGameState,
      challenges: [...initialChallenges] as Challenge[],
    });
    setAnswerHistory([]);
    setTerminalContent(
      "🔄 System Rebooted! Welcome back to Cyber Defense Training!\n\nAll challenges have been reset. Good luck, Agent! 🚀"
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center space-x-2 bg-indigo-900/50 px-4 py-2 rounded-lg hover:bg-indigo-800/50 transition-colors"
          >
            <History className="w-5 h-5" />
            <span>View History</span>
          </button>
        </div>

        <GameHeader 
          score={gameState.score} 
          level={gameState.currentLevel} 
          streak={gameState.streak}
        />

        <GameStats
          totalCorrect={gameState.totalCorrect}
          totalWrong={gameState.totalWrong}
          onRestart={handleRestart}
        />
        
        <div className="mb-8">
          <Terminal content={terminalContent} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {gameState.challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onSolve={handleSolveChallenge}
              onShowHint={handleShowHint}
            />
          ))}
        </div>

        {gameState.challenges.every(c => c.solved) && (
          <div className="mt-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-xl animate-pulse">
            <h2 className="text-4xl font-bold text-white mb-4">
              🏆 Congratulations, Master of Cybersecurity! 🏆
            </h2>
            <p className="text-2xl text-blue-100">
              Score: {gameState.score} | Level: {gameState.currentLevel}
            </p>
            <p className="text-xl text-blue-200 mt-4">
              You've proven yourself as a capable cybersecurity expert!
            </p>
            <div className="text-6xl mt-6">🔐</div>
          </div>
        )}

        <AnswerHistory
          entries={answerHistory}
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
        />
      </div>
    </div>
  );
}

export default App;