import React from 'react';
import { RecentMatch } from '../types/recentMatches';
import { formatResultBadge, calculateRecentRecord } from '../utils/recentMatches';
import { getPlatformBadge } from '../utils/efootball';
import { 
  Play, 
  RotateCcw, 
  History, 
  Trophy, 
  Flame, 
  Sparkles, 
  Smartphone, 
  Gamepad2, 
  Monitor, 
  ArrowUpRight 
} from 'lucide-react';

interface RecentMatchesSectionProps {
  matches: RecentMatch[];
  onSelectMatchForReplay: (match: RecentMatch) => void;
}

export const RecentMatchesSection: React.FC<RecentMatchesSectionProps> = ({
  matches,
  onSelectMatchForReplay,
}) => {
  const record = calculateRecentRecord(matches);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-400" />;
      case 'psn':
      case 'xbox':
        return <Gamepad2 className="w-3.5 h-3.5 text-sky-400" />;
      case 'pc':
      default:
        return <Monitor className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <section className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-xl bg-[#00ff87]/15 border border-[#00ff87]/30 text-[#00ff87]">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wider">
              Recent Matches
            </h2>
            <p className="text-xs text-slate-400">
              Last 5 competitive match results & instant highlight replays
            </p>
          </div>
        </div>

        {/* Form Streak Summary Bar */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-900/80 border border-white/10 px-3 py-1.5 rounded-2xl backdrop-blur-md">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
            Form:
          </span>
          <div className="flex items-center gap-1">
            {record.streak.map((letter, idx) => (
              <span
                key={idx}
                className={`w-5 h-5 rounded-md text-[10px] font-mono font-black flex items-center justify-center ${
                  letter === 'W'
                    ? 'bg-emerald-500/20 text-[#00ff87] border border-emerald-500/40'
                    : letter === 'D'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
          <span className="text-slate-600 font-mono">|</span>
          <span className="text-xs font-mono font-bold text-[#00ff87]">
            {record.winRate} Win
          </span>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-3">
        {matches.slice(0, 5).map((match) => {
          const outcome = formatResultBadge(match.result);
          const opponentPlatform = getPlatformBadge(match.opponent.platform);

          return (
            <div
              key={match.id}
              className="rounded-2xl p-4 sm:p-5 backdrop-blur-xl bg-slate-900/65 border border-white/10 hover:border-[#00ff87]/40 transition-all duration-200 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group relative overflow-hidden"
            >
              {/* Left Side: Outcome Tag, Opponent Info, Competition */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Result Pill Badge */}
                <div
                  className={`w-12 h-12 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-sm ${outcome.badgeClass}`}
                >
                  <span className="font-mono text-xs font-black leading-none">
                    {match.result === 'win' ? 'W' : match.result === 'draw' ? 'D' : 'L'}
                  </span>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider mt-0.5">
                    {outcome.label}
                  </span>
                </div>

                {/* Opponent Info */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-black text-base text-white tracking-wide truncate group-hover:text-[#00ff87] transition-colors">
                      vs {match.opponent.name}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border flex items-center gap-1 ${opponentPlatform.bgClass} ${opponentPlatform.colorClass}`}
                    >
                      {getPlatformIcon(match.opponent.platform)}
                      <span>{opponentPlatform.tag}</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {match.opponent.division}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
                    <span className="text-slate-300 font-medium">{match.competition}</span>
                    <span>•</span>
                    <span className="text-slate-500">{match.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Scoreboard & Replay Action */}
              <div className="flex items-center justify-between sm:justify-end gap-5 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                {/* Score Pill */}
                <div className="flex items-center gap-2 bg-black/60 px-3.5 py-1.5 rounded-xl border border-slate-800 font-mono">
                  <span className="text-xs text-slate-400">You</span>
                  <span className={`text-xl font-black ${outcome.scoreColor}`}>
                    {match.userScore}
                  </span>
                  <span className="text-slate-600 font-bold">-</span>
                  <span className="text-xl font-black text-slate-300">
                    {match.opponentScore}
                  </span>
                  <span className="text-xs text-slate-400">{match.opponent.name.slice(0, 4)}</span>
                </div>

                {/* Replay Button */}
                <button
                  onClick={() => onSelectMatchForReplay(match)}
                  aria-label={`Replay highlights for match against ${match.opponent.name}`}
                  className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-[#00ff87] hover:text-black text-[#00ff87] border border-[#00ff87]/30 text-xs font-display font-extrabold uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-md flex items-center gap-2 active:scale-95 whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Replay</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
