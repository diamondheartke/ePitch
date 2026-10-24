import { GamingPlatform, PostCategory, Post, TournamentMatch, TacticalPlayer } from '../types/efootball';

/**
 * Filter posts by platform tag, category, and optional search term
 */
export function filterPosts(
  posts: Post[],
  platformFilter: GamingPlatform | 'all',
  categoryFilter: PostCategory | 'all',
  searchQuery: string = ''
): Post[] {
  const query = searchQuery.toLowerCase().trim();

  return posts.filter((post) => {
    // Platform match: 'all' matches everything, otherwise exact match or post tagged for 'all'
    const platformMatch =
      platformFilter === 'all' ||
      post.platformTag === 'all' ||
      post.platformTag === platformFilter ||
      post.author.platform === platformFilter;

    // Category match
    const categoryMatch =
      categoryFilter === 'all' || post.category === categoryFilter;

    // Search query match
    const searchMatch =
      !query ||
      post.content.toLowerCase().includes(query) ||
      post.author.username.toLowerCase().includes(query) ||
      post.author.efootballId.toLowerCase().includes(query) ||
      (post.squadData && post.squadData.formationName.toLowerCase().includes(query));

    return platformMatch && categoryMatch && searchMatch;
  });
}

/**
 * Calculate team rating and collective strength from squad players
 */
export function calculateTeamRating(players: TacticalPlayer[]): {
  averageRating: number;
  totalTeamStrength: number;
  chemistryBonus: number;
} {
  if (!players || players.length === 0) {
    return { averageRating: 0, totalTeamStrength: 0, chemistryBonus: 0 };
  }

  const sumRatings = players.reduce((sum, p) => sum + (p.rating || 75), 0);
  const average = Math.round(sumRatings / players.length);

  // Bonus for High-tier cards (Epic, BigTime, Showtime)
  const specialCardCount = players.filter(
    (p) => p.cardType === 'Epic' || p.cardType === 'BigTime' || p.cardType === 'Showtime'
  ).length;

  const chemistryBonus = Math.min(10, Math.floor(specialCardCount * 1.5));
  const totalTeamStrength = Math.round(sumRatings * 2.85 + chemistryBonus * 25);

  return {
    averageRating: average,
    totalTeamStrength,
    chemistryBonus,
  };
}

/**
 * Determine winner and handle dispute flags in a tournament match
 */
export function resolveMatchScore(
  match: TournamentMatch,
  p1Score: number,
  p2Score: number,
  screenshotProvided: boolean = false
): TournamentMatch {
  // If scores are equal in a knockout tournament, it requires extra time/penalties
  const isDraw = p1Score === p2Score;
  let winnerId: string | undefined = undefined;

  if (p1Score > p2Score) {
    winnerId = match.player1.id;
  } else if (p2Score > p1Score) {
    winnerId = match.player2.id;
  }

  return {
    ...match,
    player1Score: p1Score,
    player2Score: p2Score,
    isCompleted: !isDraw,
    winnerId,
    disputeFlagged: isDraw, // knockout matches cannot end in an unresolved draw
    screenshotProof: screenshotProvided ? 'verified_proof.png' : undefined,
  };
}

/**
 * Format platform display label
 */
export function getPlatformBadge(platform: GamingPlatform | 'all'): {
  label: string;
  tag: string;
  colorClass: string;
  bgClass: string;
} {
  switch (platform) {
    case 'mobile':
      return {
        label: 'Mobile (iOS/Android)',
        tag: '#Mobile',
        colorClass: 'text-emerald-400',
        bgClass: 'bg-emerald-950/40 border-emerald-500/40',
      };
    case 'psn':
      return {
        label: 'PlayStation 5 / PS4',
        tag: '#PlayStation',
        colorClass: 'text-sky-400',
        bgClass: 'bg-sky-950/40 border-sky-500/40',
      };
    case 'xbox':
      return {
        label: 'Xbox Series X/S / One',
        tag: '#Xbox',
        colorClass: 'text-green-400',
        bgClass: 'bg-green-950/40 border-green-500/40',
      };
    case 'pc':
      return {
        label: 'Steam PC',
        tag: '#PC',
        colorClass: 'text-cyan-400',
        bgClass: 'bg-cyan-950/40 border-cyan-500/40',
      };
    case 'all':
    default:
      return {
        label: 'All Platforms',
        tag: '#Crossplay',
        colorClass: 'text-yellow-400',
        bgClass: 'bg-yellow-950/30 border-yellow-500/30',
      };
  }
}

/**
 * Generate standard 8-character eFootball match room code
 */
export function generateMatchRoomCode(platform: GamingPlatform): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const prefix = platform.toUpperCase().slice(0, 3);
  return `${prefix}-${randomNum}-PES`;
}
