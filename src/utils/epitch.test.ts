import test from 'node:test';
import assert from 'node:assert/strict';
import { formatCurrency, deductEnergy, defaultGuestSession, defaultAuthenticatedSession } from './epitch';

test('formatCurrency formats numbers with commas', () => {
  assert.equal(formatCurrency(420000), '420,000');
  assert.equal(formatCurrency(1850), '1,850');
  assert.equal(formatCurrency(0), '0');
});

test('deductEnergy correctly reduces energy when sufficient and refuses when insufficient', () => {
  const success = deductEnergy(100, 20);
  assert.equal(success.success, true);
  assert.equal(success.newEnergy, 80);

  const fail = deductEnergy(15, 20);
  assert.equal(fail.success, false);
  assert.equal(fail.newEnergy, 15);
});

test('default guest and authenticated sessions have valid structures', () => {
  assert.equal(defaultGuestSession.isGuest, true);
  assert.equal(defaultAuthenticatedSession.isGuest, false);
  assert.equal(defaultAuthenticatedSession.rating > defaultGuestSession.rating, true);
});
