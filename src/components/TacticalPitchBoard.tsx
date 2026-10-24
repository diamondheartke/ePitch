import React, { useState } from 'react';
import { SquadFormation, TacticalPlayer } from '../types/efootball';
import { Shield, Sparkles, User, Info } from 'lucide-react';

interface TacticalPitchBoardProps {
  formation: SquadFormation;
  compact?: boolean;
}

export const TacticalPitchBoard: React.FC<TacticalPitchBoardProps> = ({ formation, compact = false }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<TacticalPlayer | null>(formation.players[10] || null);
  const [currentPlaystyle, setCurrentPlaystyle] = useState(formation.playstyle);

  const getRarityBadge = (type: TacticalPlayer['cardType']) => {
    switch (type) {
      case 'BigTime':
        return 'border-amber-400 text-amber-300 bg-amber-950/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'Epic':
        return 'border-purple-400 text-purple-300 bg-purple-950/80 shadow-[0_0_10px_rgba(168,85,247,0.5)]';
      case 'Showtime':
        return 'border-cyan-400 text-cyan-300 bg-cyan-950/80 shadow-[0_0_10px_rgba(6,182,212,0.5)]';
      case 'Highlight':
        return 'border-emerald-400 text-emerald-300 bg-emerald-950/80';
      default:
        return 'border-slate-500 text-slate-300 bg-slate-900/80';
    }
  };

  return (
    <div className="bg-[#0b121b] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Tactical Header */}
      <div className="px-4 py-3 bg-[#0d1622] border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm tracking-wide text-white">
                {formation.formationName}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00FF87]/20 text-[#00FF87] border border-[#00FF87]/40 font-mono-code font-bold">
                TEAM STRENGTH {formation.teamRating}
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span>Manager:</span> <strong className="text-slate-200">{formation.manager}</strong>
            </p>
          </div>
        </div>

        {/* Playstyle Selector */}
        <div className="flex items-center gap-1 text-xs">
          {(['Quick Counter', 'Possession', 'Long Ball Counter'] as const).map((style) => (
            <button
              key={style}
              onClick={() => setCurrentPlaystyle(style)}
              className={`px-2.5 py-1 rounded transition-colors text-xs font-medium cursor-pointer ${
                currentPlaystyle === style
                  ? 'bg-[#00FF87] text-black font-semibold shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700/80'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Football Pitch Canvas Container */}
      <div className={`relative w-full ${compact ? 'h-[360px]' : 'h-[440px]'} tactical-pitch select-none overflow-hidden`}>
        {/* Pitch Lines */}
        <div className="absolute inset-2 border-2 border-emerald-400/25 pointer-events-none rounded-sm">
          {/* Halfway line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-emerald-400/25" />
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-emerald-400/25 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-400/40 rounded-full" />
          
          {/* Top Penalty Box (Opponent) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-16 border-b border-x border-emerald-400/25" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 border-b border-x border-emerald-400/25" />
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-8 border-b border-emerald-400/25 rounded-b-full" />

          {/* Bottom Penalty Box (Home) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-16 border-t border-x border-emerald-400/25" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 border-t border-x border-emerald-400/25" />
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-8 border-t border-emerald-400/25 rounded-t-full" />

          {/* Corner arcs */}
          <div className="absolute top-0 left-0 w-4 h-4 border-b border-r border-emerald-400/25 rounded-br-full" />
          <div className="absolute top-0 right-0 w-4 h-4 border-b border-l border-emerald-400/25 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-t border-r border-emerald-400/25 rounded-tr-full" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-t border-l border-emerald-400/25 rounded-tl-full" />
        </div>

        {/* Players on Pitch */}
        {formation.players.map((player) => {
          const isSelected = selectedPlayer?.id === player.id;
          return (
            <div
              key={player.id}
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
              onClick={() => setSelectedPlayer(player)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10 transition-transform duration-150 hover:scale-110 active:scale-95"
            >
              <div
                className={`flex flex-col items-center p-1 rounded-lg border backdrop-blur-sm transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#00FF87] scale-110 shadow-lg ' + getRarityBadge(player.cardType)
                    : getRarityBadge(player.cardType)
                }`}
              >
                {/* Rating & Position Pill */}
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono-code font-extrabold bg-black/60">
                  <span className="text-emerald-400">{player.position}</span>
                  <span className="text-white font-bold">{player.rating}</span>
                </div>

                {/* Player Short Name */}
                <span className="text-[10px] font-display font-semibold tracking-tight text-white drop-shadow-md whitespace-nowrap mt-0.5">
                  {player.name}
                </span>

                {/* Card Type Tag */}
                <span className="text-[8px] uppercase tracking-wider text-slate-300/80 leading-none">
                  {player.cardType}
                </span>
              </div>
            </div>
          );
        })}

        {/* Pitch overlay badge */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 text-[11px] text-slate-300 flex items-center gap-1.5 pointer-events-none">
          <Info className="w-3.5 h-3.5 text-[#00FF87]" />
          <span>Click player card to inspect tactical stats</span>
        </div>
      </div>

      {/* Selected Player Detail Card Drawer */}
      {selectedPlayer && (
        <div className="p-3 bg-[#0a1017] border-t border-slate-800 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm border ${getRarityBadge(selectedPlayer.cardType)}`}>
              {selectedPlayer.position}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white">{selectedPlayer.name}</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#00FF87]/20 text-[#00FF87] font-mono-code font-bold">
                  OVR {selectedPlayer.rating}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {selectedPlayer.cardType} Card
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {selectedPlayer.clubOrCountry} • Primary Playstyle Affinity: <strong>{currentPlaystyle} (99)</strong>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <div className="text-right">
              <span className="text-[10px] block text-slate-500 uppercase">Condition</span>
              <span className="text-emerald-400 font-bold">A (Peak)</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] block text-slate-500 uppercase">Synergy</span>
              <span className="text-cyan-400 font-bold">Max +3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
