import React from 'react';
import { Gamepad2, Shield, Trophy, Radio, ArrowRight, Users, Zap } from 'lucide-react';

interface ModeCard {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  badgeBg: string;
  description: string;
  metric: string;
  accent: string;
  cta: string;
  icon: React.ReactNode;
}

interface EPitchFeaturedModesProps {
  onSelectMode: (modeId: string) => void;
}

export const EPitchFeaturedModes: React.FC<EPitchFeaturedModesProps> = ({ onSelectMode }) => {
  const modes: ModeCard[] = [
    {
      id: 'matchday',
      title: 'MATCHDAY CLASH',
      badge: 'LIVE EVENT',
      badgeColor: 'text-[#ff0055]',
      badgeBg: 'bg-[#ff0055]/20 border-[#ff0055]/40',
      description: 'Competitive 1v1 matchmaking with weekend double Elo rewards and crossplay lobbies.',
      metric: '12,480 Online',
      accent: '#00ff87',
      cta: 'ENTER ARENA',
      icon: <Gamepad2 className="w-5 h-5 text-[#00ff87]" />,
    },
    {
      id: 'squad',
      title: 'TACTICAL SQUAD LAB',
      badge: 'META 4-2-1-3',
      badgeColor: 'text-[#00e5ff]',
      badgeBg: 'bg-[#00e5ff]/20 border-[#00e5ff]/40',
      description: 'Interactive pitch formation, player chemistry synergy, and custom tactical setups.',
      metric: '3,140 Team OVR',
      accent: '#00e5ff',
      cta: 'EDIT TACTICS',
      icon: <Shield className="w-5 h-5 text-[#00e5ff]" />,
    },
    {
      id: 'tournaments',
      title: 'MASTERS CUP S9',
      badge: '$1,500 POOL',
      badgeColor: 'text-amber-400',
      badgeBg: 'bg-amber-950/60 border-amber-500/40',
      description: '16-player single elimination bracket with automated score screenshot OCR verification.',
      metric: 'Quarterfinals Live',
      accent: '#f59e0b',
      cta: 'VIEW BRACKETS',
      icon: <Trophy className="w-5 h-5 text-amber-400" />,
    },
    {
      id: 'spectator',
      title: 'IN-APP WEBRTC ARENA',
      badge: 'SUB-SECOND',
      badgeColor: 'text-[#ff0055]',
      badgeBg: 'bg-[#ff0055]/20 border-[#ff0055]/40',
      description: 'Native browser screen capture streaming with sub-25ms latency & live reaction bursts.',
      metric: '340+ Watching',
      accent: '#00ff87',
      cta: 'SPECTATE NOW',
      icon: <Radio className="w-5 h-5 text-[#ff0055]" />,
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-base">🎮</span>
          <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wider">
            Featured Modes
          </h2>
        </div>
        <span className="text-xs font-mono text-slate-400">Android Touch-Optimized</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className="rounded-2xl p-5 backdrop-blur-xl bg-slate-900/65 border border-white/10 hover:border-[#00ff87]/50 transition-all duration-200 group relative overflow-hidden shadow-xl flex flex-col justify-between cursor-pointer"
          >
            {/* Top glowing ambient spot */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#00ff87]/10 rounded-full blur-2xl pointer-events-none group-hover:opacity-100 opacity-40 transition-opacity" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${mode.badgeColor} ${mode.badgeBg}`}>
                  {mode.badge}
                </span>
                <span className="text-xs font-mono text-slate-400 font-semibold">
                  {mode.metric}
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {mode.icon}
                <h3 className="font-display font-black text-base text-white tracking-wide group-hover:text-[#00ff87] transition-colors">
                  {mode.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {mode.description}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-white/5 relative z-10">
              <button
                className="w-full py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-black bg-[#00ff87] hover:bg-emerald-300 transition-colors shadow-md shadow-[#00ff87]/15 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>{mode.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
