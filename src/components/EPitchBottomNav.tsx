import React from 'react';
import { Home, Swords, Shield, Trophy, Radio } from 'lucide-react';

export type EPitchTab = 'home' | 'arena' | 'tactics' | 'tournaments' | 'spectator';

interface EPitchBottomNavProps {
  activeTab: EPitchTab;
  onTabChange: (tab: EPitchTab) => void;
}

export const EPitchBottomNav: React.FC<EPitchBottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 py-2 backdrop-blur-2xl bg-[#070a10]/95 border-t border-white/10 safe-area-bottom">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1 text-center">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-[#00ff87] bg-white/5 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-display uppercase tracking-wider mt-0.5">Home</span>
        </button>

        {/* Arena */}
        <button
          onClick={() => onTabChange('arena')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'arena'
              ? 'text-[#00ff87] bg-white/5 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Swords className="w-5 h-5" />
          <span className="text-[10px] font-display uppercase tracking-wider mt-0.5">Arena</span>
        </button>

        {/* Center Tactics Hero Action */}
        <button
          onClick={() => onTabChange('tactics')}
          className="flex flex-col items-center justify-center -translate-y-2 py-1.5 px-1 rounded-2xl bg-gradient-to-tr from-[#00ff87] to-[#00e5ff] text-black shadow-lg shadow-[#00ff87]/30 transition-transform active:scale-95 cursor-pointer"
        >
          <Shield className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[9px] font-display font-black uppercase tracking-tighter mt-0.5">Tactics</span>
        </button>

        {/* Tournaments */}
        <button
          onClick={() => onTabChange('tournaments')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
            activeTab === 'tournaments'
              ? 'text-[#00ff87] bg-white/5 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px] font-display uppercase tracking-wider mt-0.5">Cups</span>
        </button>

        {/* Spectator Live */}
        <button
          onClick={() => onTabChange('spectator')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer relative ${
            activeTab === 'spectator'
              ? 'text-[#00ff87] bg-white/5 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span className="text-[10px] font-display uppercase tracking-wider mt-0.5">Live</span>
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
        </button>
      </div>
    </nav>
  );
};
