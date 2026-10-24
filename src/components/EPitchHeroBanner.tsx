import React, { useState } from 'react';
import { Play, Shield, Swords, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface EPitchHeroBannerProps {
  onEnterMatchday: () => void;
  onOpenTactics: () => void;
  energy: number;
}

export const EPitchHeroBanner: React.FC<EPitchHeroBannerProps> = ({
  onEnterMatchday,
  onOpenTactics,
  energy,
}) => {
  const [matchFinding, setMatchFinding] = useState<boolean>(false);
  const [matchFound, setMatchFound] = useState<boolean>(false);

  const handleMatchSearch = () => {
    if (energy < 20) return;
    setMatchFinding(true);
    setMatchFound(false);
    onEnterMatchday();

    setTimeout(() => {
      setMatchFinding(false);
      setMatchFound(true);
      setTimeout(() => setMatchFound(false), 5000);
    }, 2200);
  };

  return (
    <section className="relative rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-r from-[#0b1522]/95 via-[#08111a]/90 to-[#050a10]/95 border border-[#00ff87]/30 shadow-2xl p-6 sm:p-8">
      {/* Stadium Light Cone Background Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#00ff87]/15 via-[#00e5ff]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[#00e5ff]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl space-y-4">
        {/* Matchday Alert Badge */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase bg-[#ff0055]/20 text-[#ff0055] border border-[#ff0055]/40 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
            WEEKEND MATCHDAY CLASH
          </span>
          <span className="text-xs font-mono text-[#00e5ff] font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            2X ELO REWARDS • LIVE
          </span>
        </div>

        {/* Hero Sports Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white italic tracking-wide uppercase leading-tight">
          ENTER THE <span className="text-[#00ff87]">TACTICAL ARENA</span>
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
          High-performance football management and tactical simulation platform built for Android, Console & PC. Deploy fluid 4-2-1-3 tactics, stream live through WebRTC spectator lobbies, and climb Division 1.
        </p>

        {/* Quick Match Action State */}
        {matchFinding ? (
          <div className="p-3.5 rounded-2xl bg-black/60 border border-[#00e5ff]/40 flex items-center gap-3 text-xs font-mono text-cyan-300 max-w-md">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span>Searching Division 1 Opponent across Android & Console...</span>
          </div>
        ) : matchFound ? (
          <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center gap-3 text-xs font-mono text-emerald-300 max-w-md shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-4 h-4 text-[#00ff87]" />
            <span>Match Found! Opponent: ShadowStriker (PC) • Ping: 18ms</span>
          </div>
        ) : null}

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleMatchSearch}
            disabled={energy < 20 || matchFinding}
            className={`px-6 py-3 rounded-2xl font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer ${
              energy >= 20
                ? 'bg-[#00ff87] text-black hover:bg-emerald-300 shadow-[#00ff87]/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Enter Arena // Quick Match (-20⚡)</span>
          </button>

          <button
            onClick={onOpenTactics}
            className="px-5 py-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/10 hover:border-[#00e5ff]/50 transition-all cursor-pointer flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-[#00e5ff]" />
            <span>Tactical Lab</span>
          </button>
        </div>
      </div>
    </section>
  );
};
