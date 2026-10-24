import test from 'node:test';
import assert from 'node:assert/strict';
import { getMatchOutcome, formatResultBadge, calculateRecentRecord } from './recentMatches';
import { RecentMatch } from '../types/recentMatches';

test('getMatchOutcome accurately determines win, loss, and draw', () => {
  assert.equal(getMatchOutcome(3, 1), 'win');
  assert.equal(getMatchOutcome(1, 2), 'loss');
  assert.equal(getMatchOutcome(2, 2), 'draw');
});

test('formatResultBadge returns appropriate labels and classes', () => {
  const win = formatResultBadge('win');
  assert.equal(win.label, 'VICTORY');
  assert.ok(win.textClass.includes('00ff87'));

  const loss = formatResultBadge('loss');
  assert.equal(loss.label, 'DEFEAT');
  assert.ok(loss.textClass.includes('rose'));

  const draw = formatResultBadge('draw');
  assert.equal(draw.label, 'DRAW');
  assert.ok(draw.textClass.includes('amber'));
});

test('calculateRecentRecord aggregates win rate and streak accurately', () => {
  const mockMatches: Partial<RecentMatch>[] = [
    { result: 'win' },
    { result: 'win' },
    { result: 'draw' },
    { result: 'win' },
    { result: 'loss' },
  ];

  const record = calculateRecentRecord(mockMatches as RecentMatch[]);
  assert.equal(record.wins, 3);
  assert.equal(record.draws, 1);
  assert.equal(record.losses, 1);
  assert.equal(record.winRate, '60%');
  assert.deepEqual(record.streak, ['W', 'W', 'D', 'W', 'L']);
});
