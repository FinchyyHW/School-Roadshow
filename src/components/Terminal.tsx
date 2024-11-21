import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TerminalProps {
  content: string;
}

export const Terminal: React.FC<TerminalProps> = ({ content }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 font-mono text-lg text-green-400 shadow-xl border-2 border-purple-500/30">
      <div className="flex space-x-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse delay-75"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse delay-150"></div>
      </div>
      <TypeAnimation
        sequence={[content]}
        wrapper="div"
        cursor={true}
        speed={70}
        className="min-h-[100px] text-xl"
        style={{ whiteSpace: 'pre-line' }}
      />
    </div>
  );
};