import { GamingPlatform } from './efootball';

export interface MatchHighlightMoment {
  minute: number;
  type: 'goal' | 'save' | 'skill' | 'card';
  title: string;
  scorerOrPlayer: string;
  description: string;
}

export interface RecentMatch {
  id: string;
  opponent: {
    name: string;
    avatar: string;
    platform: GamingPlatform;
    division: string;
    efootballId: string;
  };
  userScore: number;
  opponentScore: number;
  result: 'win' | 'draw' | 'loss';
  competition: string;
  timestamp: string;
  durationMinutes: number;
  possession: { user: number; opponent: number };
  shotsOnTarget: { user: string; opponent: string };
  videoUrl: string;
  videoDurationSeconds: number;
  keyMoments: MatchHighlightMoment[];
}
