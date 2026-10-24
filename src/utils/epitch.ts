export interface EPitchUserSession {
  isGuest: boolean;
  username: string;
  efootballId: string;
  division: string;
  rating: number;
  winRate: string;
  gpCurrency: number;
  epPoints: number;
  energy: number;
  maxEnergy: number;
  avatarUrl: string;
}

export const defaultGuestSession: EPitchUserSession = {
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
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
};

export const defaultAuthenticatedSession: EPitchUserSession = {
  isGuest: false,
  username: 'Apex_Viper',
  efootballId: 'EP-9028-1144',
  division: 'Division 1 (Top 100)',
  rating: 1940,
  winRate: '68%',
  gpCurrency: 420000,
  epPoints: 1850,
  energy: 100,
  maxEnergy: 100,
  avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100',
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US').format(amount);
}

export function deductEnergy(currentEnergy: number, cost: number): { success: boolean; newEnergy: number } {
  if (currentEnergy >= cost) {
    return { success: true, newEnergy: currentEnergy - cost };
  }
  return { success: false, newEnergy: currentEnergy };
}
