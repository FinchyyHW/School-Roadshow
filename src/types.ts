export interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  type: 'password' | 'firewall' | 'encryption';
  solved: boolean;
  solution: string;
  hint: string;
  feedback: string;
  image: string;
}

export interface GameState {
  score: number;
  currentLevel: number;
  attempts: number;
  gameOver: boolean;
  challenges: Challenge[];
  showHint: boolean;
  currentHint: string;
  streak: number;
  totalCorrect: number;
  totalWrong: number;
}

export interface AnswerHistoryEntry {
  challengeId: number;
  challengeTitle: string;
  answer: string;
  correct: boolean;
  timestamp: Date;
  feedback?: string;
}