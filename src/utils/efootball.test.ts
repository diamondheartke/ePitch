import test from 'node:test';
import assert from 'node:assert/strict';
import { filterPosts, calculateTeamRating, resolveMatchScore, getPlatformBadge, generateMatchRoomCode } from './efootball';
import { Post, TacticalPlayer, TournamentMatch } from '../types/efootball';

test('filterPosts correctly filters by platform tag', () => {
  const samplePosts: Post[] = [
    {
      id: '1',
      author: {
        username: 'ProStriker',
        handle: '@pro_striker',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        platform: 'psn',
        efootballId: 'PSN-1234',
        division: 'Div 1',
      },
      content: 'Insane 30 yard screamer with Roberto Carlos #PlayStation',
      mediaType: 'video',
      platformTag: 'psn',
      category: 'goals',
      likesCount: 14,
      commentsCount: 2,
      sharesCount: 1,
      createdAt: '10m ago',
    },
    {
      id: '2',
      author: {
        username: 'MobileKing',
        handle: '@mobile_king',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        platform: 'mobile',
        efootballId: 'MOB-5678',
        division: 'Div 2',
      },
      content: 'Touch & flick skill tutorial for mobile users',
      mediaType: 'video',
      platformTag: 'mobile',
      category: 'skills',
      likesCount: 35,
      commentsCount: 5,
      sharesCount: 8,
      createdAt: '1h ago',
    },
  ];

  const psnOnly = filterPosts(samplePosts, 'psn', 'all');
  assert.equal(psnOnly.length, 1);
  assert.equal(psnOnly[0].id, '1');

  const mobileOnly = filterPosts(samplePosts, 'mobile', 'all');
  assert.equal(mobileOnly.length, 1);
  assert.equal(mobileOnly[0].id, '2');

  const allPlatforms = filterPosts(samplePosts, 'all', 'all');
  assert.equal(allPlatforms.length, 2);
});

test('calculateTeamRating computes accurate average and strength bonus', () => {
  const squad: TacticalPlayer[] = [
    { id: '1', name: 'Courtois', position: 'GK', rating: 98, clubOrCountry: 'Real Madrid', cardType: 'Highlight', x: 50, y: 88 },
    { id: '2', name: 'Maldini', position: 'CB', rating: 102, clubOrCountry: 'Milan', cardType: 'Epic', x: 40, y: 72 },
    { id: '3', name: 'Nesta', position: 'CB', rating: 101, clubOrCountry: 'Milan', cardType: 'BigTime', x: 60, y: 72 },
    { id: '4', name: 'Vieira', position: 'DMF', rating: 102, clubOrCountry: 'Arsenal', cardType: 'Epic', x: 50, y: 55 },
    { id: '5', name: 'Messi', position: 'RWF', rating: 104, clubOrCountry: 'Argentina', cardType: 'BigTime', x: 80, y: 25 },
    { id: '6', name: 'Rummenigge', position: 'CF', rating: 103, clubOrCountry: 'Bayern', cardType: 'Epic', x: 50, y: 18 },
  ];

  const result = calculateTeamRating(squad);
  assert.ok(result.averageRating >= 100);
  assert.ok(result.totalTeamStrength > 1700);
  assert.ok(result.chemistryBonus > 0);
});

test('resolveMatchScore handles knockout winner and dispute detection', () => {
  const initialMatch: TournamentMatch = {
    id: 'm1',
    round: 'Quarterfinals',
    roundIndex: 2,
    player1: { id: 'p1', name: 'Flash', platform: 'pc', efootballId: 'PC-11', seed: 1, avatar: '' },
    player2: { id: 'p2', name: 'Ghost', platform: 'xbox', efootballId: 'XB-22', seed: 8, avatar: '' },
    isCompleted: false,
  };

  // Decisive score
  const finished = resolveMatchScore(initialMatch, 3, 1, true);
  assert.equal(finished.isCompleted, true);
  assert.equal(finished.winnerId, 'p1');
  assert.equal(finished.disputeFlagged, false);
  assert.equal(finished.screenshotProof, 'verified_proof.png');

  // Draw score in a knockout match triggers dispute flag
  const drawMatch = resolveMatchScore(initialMatch, 2, 2, false);
  assert.equal(drawMatch.isCompleted, false);
  assert.equal(drawMatch.disputeFlagged, true);
});

test('getPlatformBadge and generateMatchRoomCode format correctly', () => {
  const badge = getPlatformBadge('psn');
  assert.equal(badge.tag, '#PlayStation');
  assert.ok(badge.colorClass.includes('sky'));

  const roomCode = generateMatchRoomCode('mobile');
  assert.ok(roomCode.startsWith('MOB-'));
  assert.ok(roomCode.endsWith('-PES'));
});
