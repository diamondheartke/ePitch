import React, { useState } from 'react';
import { EPitchUserSession, formatCurrency } from '../utils/epitch';
import { Zap, Shield, User, Volume2, VolumeX, Code, Sparkles, Check } from 'lucide-react';

interface EPitchTopBarProps {
  session: EPitchUserSession;
  onToggleAuth: () => void;
  onOpenDjangoModal: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const EPitchTopBar: React.FC<EPitchTopBarProps> = ({
  session,
  onToggleAuth,
  onOpenDjangoModal,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 py-2.5 backdrop-blur-2xl bg-[#070a10]/85 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#00ff87] to-[#00e5ff] p-0.5 shadow-lg shadow-[#00ff87]/20">
              <div className="w-full h-full bg-[#080e18] rounded-[10px] flex items-center justify-center font-display font-extrabold text-sm sm:text-base text-[#00ff87]">
                eP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-xl italic text-white tracking-wider">
                  e<span className="text-[#00ff87]">PITCH</span>
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30 uppercase">
                  HOME APP
                </span>
              </div>
              <span className="hidden md:block text-[9px] font-mono text-slate-400 -mt-1 tracking-widest uppercase">
                Tactical Arena // Django Powered
              </span>
            </div>
          </div>
        </div>

        {/* Currency Deck (Android Touch Scaled) */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs">
          {/* Energy Meter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-sm" title="Matchday Energy">
            <Zap className="w-3.5 h-3.5 text-[#00e5ff] fill-[#00e5ff]" />
            <span className="text-white font-bold text-xs">
              {session.energy}/{session.maxEnergy}
            </span>
          </div>

          {/* GP Coins */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-sm" title="GP Coins">
            <div className="w-4 h-4 rounded-full bg-amber-400 text-black text-[10px] font-black flex items-center justify-center leading-none">
              G
            </div>
            <span className="text-amber-300 font-bold text-xs">
              {formatCurrency(session.gpCurrency)}
            </span>
          </div>

          {/* ePitch Points */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-sm" title="ePitch Points">
            <span className="text-[#00ff87] font-extrabold text-sm leading-none">◈</span>
            <span className="text-[#00ff87] font-bold text-xs">
              {formatCurrency(session.epPoints)} EP
            </span>
          </div>
        </div>

        {/* Right Section: Sound, Django Code Explorer, and Auth Hook */}
        <div className="flex items-center gap-2">
          {/* Sound Effect Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle stadium audio"
            className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-[#00ff87]/40 transition-colors cursor-pointer"
            title={soundEnabled ? 'Stadium Sound FX Active' : 'Sound FX Muted'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#00ff87]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Django Template & Code Modal Trigger */}
          <button
            onClick={onOpenDjangoModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs font-mono hover:border-[#00e5ff]/50 hover:text-[#00e5ff] transition-all cursor-pointer"
            title="Inspect Django home/views.py and static templates"
          >
            <Code className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>Django Source</span>
          </button>

          {/* Future-Proof Auth State Switcher */}
          {session.isGuest ? (
            <div className="flex items-center gap-2">
              <span className="hidden xl:inline-block text-[11px] text-slate-400 font-mono">
                Guest Mode
              </span>
              <button
                onClick={onToggleAuth}
                className="px-3.5 py-1.5 rounded-xl bg-[#00ff87] hover:bg-emerald-300 text-black font-display font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#00ff87]/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                title="Simulate Auth login for testing guest vs authenticated states"
              >
                <User className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Join / Sign In</span>
              </button>
            </div>
          ) : (
            <div
              onClick={onToggleAuth}
              className="flex items-center gap-2.5 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-[#00ff87]/40 hover:border-[#00ff87] cursor-pointer transition-colors group"
              title="Click to toggle back to Guest Mode"
            >
              <div className="relative">
                <img
                  src={session.avatarUrl}
                  alt={session.username}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover border border-[#00ff87]"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00ff87] border-2 border-[#070a10]" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-display font-bold text-white leading-tight group-hover:text-[#00ff87] transition-colors">
                  {session.username}
                </div>
                <div className="text-[10px] font-mono text-[#00ff87] leading-none">
                  {session.division}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
