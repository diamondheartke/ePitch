export type GamingPlatform = 'mobile' | 'psn' | 'xbox' | 'pc';

export type PostCategory = 'goals' | 'tactics' | 'recruitment' | 'skills' | 'discussion';

export interface TacticalPlayer {
  id: string;
  name: string;
  position: 'GK' | 'CB' | 'LB' | 'RB' | 'DMF' | 'CMF' | 'AMF' | 'LWF' | 'RWF' | 'CF' | 'SS';
  rating: number;
  clubOrCountry: string;
  cardType: 'Epic' | 'Showtime' | 'Highlight' | 'Standard' | 'BigTime';
  x: number; // percentage on pitch 0-100
  y: number; // percentage on pitch 0-100
}

export interface SquadFormation {
  formationName: string; // e.g. "4-2-1-3"
  playstyle: 'Quick Counter' | 'Possession' | 'Long Ball Counter' | 'Out Wide';
  manager: string;
  teamRating: number;
  players: TacticalPlayer[];
}

export interface Post {
  id: string;
  author: {
    username: string;
    handle: string;
    avatar: string;
    platform: GamingPlatform | 'all';
    efootballId: string;
    division: string;
    clan?: string;
  };
  content: string;
  mediaType: 'video' | 'squad' | 'match_result' | 'recruitment';
  mediaUrl?: string; // video clip URL or demo clip video
  videoDurationSeconds?: number;
  squadData?: SquadFormation;
  matchData?: {
    opponent: string;
    p1Score: number;
    p2Score: number;
    competition: string;
    screenshotVerified: boolean;
  };
  platformTag: GamingPlatform | 'all';
  category: PostCategory;
  likesCount: number;
  hasLiked?: boolean;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
}

export interface TournamentMatch {
  id: string;
  round: string; // 'Round of 16' | 'Quarterfinals' | 'Semifinals' | 'Grand Final'
  roundIndex: number;
  player1: {
    id: string;
    name: string;
    platform: GamingPlatform;
    efootballId: string;
    seed: number;
    avatar: string;
  };
  player2: {
    id: string;
    name: string;
    platform: GamingPlatform;
    efootballId: string;
    seed: number;
    avatar: string;
  };
  player1Score?: number;
  player2Score?: number;
  isCompleted: boolean;
  winnerId?: string;
  liveStreamActive?: boolean;
  streamRoomId?: string;
  disputeFlagged?: boolean;
  screenshotProof?: string;
}

export interface Tournament {
  id: string;
  title: string;
  prizePool: string;
  format: 'Knockout Single Elimination' | 'Round Robin League';
  platformRestriction: 'Crossplay' | 'Mobile Only' | 'Console / PC Only';
  participantsCount: number;
  maxParticipants: number;
  startDate: string;
  status: 'Live' | 'Registration' | 'Completed';
  matches: TournamentMatch[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  platform: GamingPlatform | 'all';
  text: string;
  timestamp: string;
  isRoomCode?: boolean;
  roomCode?: string;
}
