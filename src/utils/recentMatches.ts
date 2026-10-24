import { RecentMatch } from '../types/recentMatches';

export function getMatchOutcome(userScore: number, opponentScore: number): 'win' | 'draw' | 'loss' {
  if (userScore > opponentScore) return 'win';
  if (userScore < opponentScore) return 'loss';
  return 'draw';
}

export function formatResultBadge(result: 'win' | 'draw' | 'loss'): {
  label: string;
  badgeClass: string;
  textClass: string;
  scoreColor: string;
} {
  switch (result) {
    case 'win':
      return {
        label: 'VICTORY',
        badgeClass: 'bg-emerald-950/80 border-emerald-500/50 text-[#00ff87]',
        textClass: 'text-[#00ff87]',
        scoreColor: 'text-[#00ff87]',
      };
    case 'loss':
      return {
        label: 'DEFEAT',
        badgeClass: 'bg-rose-950/80 border-rose-500/50 text-rose-400',
        textClass: 'text-rose-400',
        scoreColor: 'text-rose-400',
      };
    case 'draw':
    default:
      return {
        label: 'DRAW',
        badgeClass: 'bg-amber-950/80 border-amber-500/50 text-amber-400',
        textClass: 'text-amber-400',
        scoreColor: 'text-amber-300',
      };
  }
}

export function calculateRecentRecord(matches: RecentMatch[]): {
  wins: number;
  draws: number;
  losses: number;
  winRate: string;
  streak: string[];
} {
  if (!matches || matches.length === 0) {
    return { wins: 0, draws: 0, losses: 0, winRate: '0%', streak: [] };
  }

  const wins = matches.filter((m) => m.result === 'win').length;
  const draws = matches.filter((m) => m.result === 'draw').length;
  const losses = matches.filter((m) => m.result === 'loss').length;
  const winRate = `${Math.round((wins / matches.length) * 100)}%`;
  const streak = matches.map((m) => (m.result === 'win' ? 'W' : m.result === 'draw' ? 'D' : 'L'));

  return { wins, draws, losses, winRate, streak };
}
