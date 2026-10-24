import React, { useState } from 'react';
import { Tournament, TournamentMatch } from '../types/efootball';
import { getPlatformBadge, resolveMatchScore } from '../utils/efootball';
import { Trophy, CheckCircle, AlertTriangle, ShieldCheck, Upload, Swords, FileCheck } from 'lucide-react';

interface TournamentTreePanelProps {
  tournament: Tournament;
  onMatchSelect?: (match: TournamentMatch) => void;
}

export const TournamentTreePanel: React.FC<TournamentTreePanelProps> = ({ tournament, onMatchSelect }) => {
  const [matches, setMatches] = useState<TournamentMatch[]>(tournament.matches);
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch | null>(matches[matches.length - 1]);
  const [scoreP1, setScoreP1] = useState<number>(3);
  const [scoreP2, setScoreP2] = useState<number>(2);
  const [hasUploadedScreenshot, setHasUploadedScreenshot] = useState<boolean>(true);
  const [notification, setNotification] = useState<string | null>(null);

  const handleScoreReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    const updated = resolveMatchScore(selectedMatch, scoreP1, scoreP2, hasUploadedScreenshot);

    setMatches((prev) =>
      prev.map((m) => (m.id === updated.id ? updated : m))
    );
    setSelectedMatch(updated);

    if (updated.disputeFlagged) {
      setNotification('Dispute Flagged: Knockout matches cannot end in a draw. Please play Extra Time / Penalties or submit OCR screenshot.');
    } else {
      setNotification(`Score successfully recorded (${scoreP1} - ${scoreP2}). Match verified!`);
    }

    setTimeout(() => setNotification(null), 4000);
  };

  const quarterfinals = matches.filter((m) => m.round === 'Quarterfinals');
  const semifinals = matches.filter((m) => m.round === 'Semifinals');
  const grandFinal = matches.filter((m) => m.round === 'Grand Final');

  return (
    <div className="bg-[#0b1017] border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-4 sm:p-5">
      {/* Tournament Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-white text-base tracking-wide">
                {tournament.title}
              </h2>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 uppercase font-bold">
                {tournament.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Prize: <strong className="text-amber-400">{tournament.prizePool}</strong> • Format: {tournament.format}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono-code text-slate-400 block">Single Elimination</span>
          <span className="text-xs text-slate-300 font-semibold">{tournament.participantsCount} Players Bracket</span>
        </div>
      </div>

      {notification && (
        <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Bracket Tree Visualizer */}
      <div className="mt-5 overflow-x-auto pb-4">
        <div className="min-w-[560px] grid grid-cols-3 gap-4 text-xs">
          {/* Quarterfinals Column */}
          <div>
            <div className="text-center font-display font-bold text-slate-400 uppercase text-[11px] tracking-wider mb-3">
              Quarterfinals
            </div>
            <div className="space-y-3">
              {quarterfinals.map((match) => (
                <div
                  key={match.id}
                  onClick={() => {
                    setSelectedMatch(match);
                    setScoreP1(match.player1Score ?? 0);
                    setScoreP2(match.player2Score ?? 0);
                  }}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    selectedMatch?.id === match.id
                      ? 'border-[#00FF87] bg-[#121c28] shadow-md'
                      : 'border-slate-800 bg-[#0d141f] hover:border-slate-700'
                  }`}
                >
                  {/* Player 1 */}
                  <div className={`flex items-center justify-between py-1 ${match.winnerId === match.player1.id ? 'text-[#00FF87] font-bold' : 'text-slate-300'}`}>
                    <span className="truncate max-w-[120px]">{match.player1.name}</span>
                    <span className="font-mono-code font-bold">{match.player1Score ?? '-'}</span>
                  </div>
                  {/* Player 2 */}
                  <div className={`flex items-center justify-between py-1 border-t border-slate-800/80 ${match.winnerId === match.player2.id ? 'text-[#00FF87] font-bold' : 'text-slate-300'}`}>
                    <span className="truncate max-w-[120px]">{match.player2.name}</span>
                    <span className="font-mono-code font-bold">{match.player2Score ?? '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semifinals Column */}
          <div className="flex flex-col justify-around">
            <div className="text-center font-display font-bold text-slate-400 uppercase text-[11px] tracking-wider mb-3">
              Semifinals
            </div>
            <div className="space-y-6">
              {semifinals.map((match) => (
                <div
                  key={match.id}
                  onClick={() => {
                    setSelectedMatch(match);
                    setScoreP1(match.player1Score ?? 0);
                    setScoreP2(match.player2Score ?? 0);
                  }}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                    selectedMatch?.id === match.id
                      ? 'border-[#00FF87] bg-[#121c28] shadow-md'
                      : 'border-slate-800 bg-[#0d141f] hover:border-slate-700'
                  }`}
                >
                  <div className={`flex items-center justify-between py-1 ${match.winnerId === match.player1.id ? 'text-[#00FF87] font-bold' : 'text-slate-300'}`}>
                    <span className="truncate max-w-[120px]">{match.player1.name}</span>
                    <span className="font-mono-code font-bold">{match.player1Score ?? '-'}</span>
                  </div>
                  <div className={`flex items-center justify-between py-1 border-t border-slate-800/80 ${match.winnerId === match.player2.id ? 'text-[#00FF87] font-bold' : 'text-slate-300'}`}>
                    <span className="truncate max-w-[120px]">{match.player2.name}</span>
                    <span className="font-mono-code font-bold">{match.player2Score ?? '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grand Final Column */}
          <div className="flex flex-col justify-center">
            <div className="text-center font-display font-bold text-amber-400 uppercase text-[11px] tracking-wider mb-3 flex items-center justify-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>Grand Final (LIVE)</span>
            </div>
            {grandFinal.map((match) => (
              <div
                key={match.id}
                onClick={() => {
                  setSelectedMatch(match);
                  setScoreP1(match.player1Score ?? 2);
                  setScoreP2(match.player2Score ?? 2);
                }}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all relative ${
                  selectedMatch?.id === match.id
                    ? 'border-amber-400 bg-amber-950/20 shadow-lg'
                    : 'border-amber-500/40 bg-[#0d141f] hover:border-amber-400'
                }`}
              >
                <div className="absolute -top-2.5 right-3 bg-amber-400 text-black text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded uppercase">
                  Championship
                </div>
                <div className={`flex items-center justify-between py-1.5 ${match.winnerId === match.player1.id ? 'text-amber-400 font-bold' : 'text-white'}`}>
                  <span className="font-bold">{match.player1.name}</span>
                  <span className="font-mono-code font-bold text-base">{match.player1Score ?? '-'}</span>
                </div>
                <div className={`flex items-center justify-between py-1.5 border-t border-slate-800 ${match.winnerId === match.player2.id ? 'text-amber-400 font-bold' : 'text-white'}`}>
                  <span className="font-bold">{match.player2.name}</span>
                  <span className="font-mono-code font-bold text-base">{match.player2Score ?? '-'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dispute & Score Reporting Workbench */}
      {selectedMatch && (
        <div className="mt-4 p-4 rounded-xl bg-[#090e16] border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="font-display font-bold text-sm text-white flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-[#00FF87]" />
              Match Report: {selectedMatch.round}
            </span>
            {selectedMatch.disputeFlagged ? (
              <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-rose-950/80 text-rose-400 border border-rose-500/40 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Score Discrepancy / Draw Flagged
              </span>
            ) : selectedMatch.screenshotProof ? (
              <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-emerald-950/80 text-[#00FF87] border border-emerald-500/40 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                OCR Screenshot Verified
              </span>
            ) : null}
          </div>

          <form onSubmit={handleScoreReport} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="text-[11px] font-mono-code text-slate-400 block mb-1">
                {selectedMatch.player1.name} (Goals)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={scoreP1}
                onChange={(e) => setScoreP1(parseInt(e.target.value) || 0)}
                className="w-full bg-black/60 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono-code text-center font-bold focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono-code text-slate-400 block mb-1">
                {selectedMatch.player2.name} (Goals)
              </label>
              <input
                type="number"
                min="0"
                max="20"
                value={scoreP2}
                onChange={(e) => setScoreP2(parseInt(e.target.value) || 0)}
                className="w-full bg-black/60 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono-code text-center font-bold focus:outline-none focus:border-[#00FF87]"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 bg-[#00FF87] text-black font-display font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FileCheck className="w-4 h-4" />
                <span>Verify & Advance</span>
              </button>
            </div>
          </form>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hasUploadedScreenshot}
                onChange={(e) => setHasUploadedScreenshot(e.target.checked)}
                className="rounded border-slate-700 text-[#00FF87] accent-[#00FF87]"
              />
              <span className="text-[11px]">Match Summary Screenshot Attached (OCR Auto-Validation)</span>
            </label>
            <span className="text-[10px] font-mono-code text-slate-500">Django ORM Match ID: {selectedMatch.id}</span>
          </div>
        </div>
      )}
    </div>
  );
};
