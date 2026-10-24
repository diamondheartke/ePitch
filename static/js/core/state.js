/**
 * ePitch Client State Manager (static/js/core/state.js)
 * Manages guest status, currency balances, and future Auth module synchronization.
 */

window.ePitchState = {
  isGuest: true,
  username: 'Guest Tactical Manager',
  efootballId: 'EP-GUEST-001',
  division: 'Trial Division',
  rating: 1200,
  winRate: '50%',
  gpCurrency: 50000,
  epPoints: 250,
  energy: 100,
  maxEnergy: 100,

  // Future-proof Auth hook to toggle between guest and logged-in states
  setUserSession(sessionData) {
    this.isGuest = !sessionData;
    if (sessionData) {
      this.username = sessionData.username || 'Apex_Viper';
      this.efootballId = sessionData.efootballId || 'EP-9028-1144';
      this.division = sessionData.division || 'Division 1';
      this.rating = sessionData.rating || 1940;
      this.winRate = sessionData.winRate || '68%';
      this.gpCurrency = sessionData.gpCurrency || 420000;
      this.epPoints = sessionData.epPoints || 1850;
    }
    window.dispatchEvent(new CustomEvent('epitch:state-updated', { detail: this }));
  },

  // Spend or add energy
  consumeEnergy(amount = 20) {
    if (this.energy >= amount) {
      this.energy -= amount;
      window.dispatchEvent(new CustomEvent('epitch:state-updated', { detail: this }));
      return true;
    }
    return false;
  }
};
