/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EPitchUserSession, defaultGuestSession, defaultAuthenticatedSession, deductEnergy } from './utils/epitch';
import { EPitchTopBar } from './components/EPitchTopBar';
import { EPitchHeroBanner } from './components/EPitchHeroBanner';
import { EPitchFeaturedModes } from './components/EPitchFeaturedModes';
import { EPitchBottomNav, EPitchTab } from './components/EPitchBottomNav';
import { TacticalPitchBoard } from './components/TacticalPitchBoard';
import { demoSquadFormation, demoTournament, initialChatMessages } from './data/mockData';
import { LiveSpectatorPanel } from './components/LiveSpectatorPanel';
import { TournamentTreePanel } from './components/TournamentTreePanel';
import { DjangoCodeViewerModal } from './components/DjangoCodeViewerModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { RecentMatch } from './types/recentMatches';
import { initialRecentMatches } from './data/recentMatchesData';
import { RecentMatchesSection } from './components/RecentMatchesSection';
import { HighlightReelModal } from './components/HighlightReelModal';
import { Sparkles, Shield, Radio, Trophy, Swords, Zap, CheckCircle, Volume2, ArrowRight } from 'lucide-react';

export default function App() {
  const [session, setSession] = useState<EPitchUserSession>(defaultAuthenticatedSession);
  const [activeTab, setActiveTab] = useState<EPitchTab>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isDjangoModalOpen, setIsDjangoModalOpen] = useState<boolean>(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [recentMatches] = useState<RecentMatch[]>(initialRecentMatches);
  const [selectedReplayMatch, setSelectedReplayMatch] = useState<RecentMatch | null>(null);
  const [isReplayModalOpen, setIsReplayModalOpen] = useState<boolean>(false);

  const handleOpenReplay = (match: RecentMatch) => {
    playSoundEffect('click');
    setSelectedReplayMatch(match);
    setIsReplayModalOpen(true);
  };

  // Synthesize stadium whistle / audio beep via Web Audio API so it plays without missing files
  const playSoundEffect = (type: 'whistle' | 'click' | 'goal') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === 'whistle') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // AudioContext policy handled gracefully
    }
  };

  const handleToggleAuth = () => {
    playSoundEffect('click');
    if (session.isGuest) {
      setSession(defaultAuthenticatedSession);
      showToast('Switched to Authenticated User: Apex_Viper (Division 1)');
    } else {
      setSession(defaultGuestSession);
      showToast('Switched to Guest Mode (Pre-Auth Phase)');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleEnterMatchday = () => {
    const res = deductEnergy(session.energy, 20);
    if (res.success) {
      playSoundEffect('whistle');
      setSession((prev) => ({ ...prev, energy: res.newEnergy }));
      showToast('20⚡ Energy consumed. Finding competitive Division 1 opponent...');
    } else {
      showToast('Insufficient Energy! Recharging soon.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans selection:bg-[#00ff87] selection:text-black pb-24 sm:pb-12">
      {/* Tactical Stadium Dark Background with Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a121e]/85 via-[#070a10]/90 to-[#05070c] z-10" />
        <div className="absolute inset-0 epitch-tactical-grid opacity-30 z-20" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#00ff87]/15 to-transparent rounded-full blur-3xl z-10" />
      </div>

      {/* Top Bar Navigation Component */}
      <div className="relative z-40">
        <EPitchTopBar
          session={session}
          onToggleAuth={handleToggleAuth}
          onOpenDjangoModal={() => setIsDjangoModalOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-emerald-950/90 border border-[#00ff87]/50 text-[#00ff87] text-xs font-mono font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md animate-fade-in">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Layout Area */}
      <main className="relative z-30 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex-1 space-y-7">
        {activeTab === 'home' && (
          <>
            {/* Hero Banner: Matchday Clash */}
            <EPitchHeroBanner
              onEnterMatchday={handleEnterMatchday}
              onOpenTactics={() => setActiveTab('tactics')}
              energy={session.energy}
            />

            {/* Featured Mode Cards Horizontal Deck */}
            <EPitchFeaturedModes
              onSelectMode={(modeId) => {
                playSoundEffect('click');
                if (modeId === 'matchday') handleEnterMatchday();
                else if (modeId === 'squad') setActiveTab('tactics');
                else if (modeId === 'tournaments') setActiveTab('tournaments');
                else if (modeId === 'spectator') setActiveTab('spectator');
              }}
            />

            {/* Recent Matches Section (Last 5 Matches & Replay Highlight Reels) */}
            <RecentMatchesSection
              matches={recentMatches}
              onSelectMatchForReplay={handleOpenReplay}
            />

            {/* Quick Squad & Live WebRTC Arena Split Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Active Squad Tactics Preview */}
              <div className="lg:col-span-2 rounded-3xl p-5 sm:p-6 backdrop-blur-xl bg-slate-900/65 border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#00ff87] uppercase font-bold tracking-wider">
                      ACTIVE SQUAD FORMATION
                    </span>
                    <h2 className="font-display font-black text-xl text-white">
                      4-2-1-3 Quick Counter
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('tactics')}
                    className="px-3.5 py-1.5 rounded-xl bg-[#00ff87] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors cursor-pointer"
                  >
                    Open Squad Lab
                  </button>
                </div>

                {/* Tactical Pitch Board */}
                <TacticalPitchBoard formation={demoSquadFormation} compact />
              </div>

              {/* In-App Live Spectator Widget */}
              <div className="rounded-3xl p-5 sm:p-6 backdrop-blur-xl bg-slate-900/65 border border-white/10 flex flex-col justify-between space-y-4 shadow-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff0055]/20 text-[#ff0055] border border-[#ff0055]/40 uppercase flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff0055] animate-ping" />
                      WEBRTC P2P LIVE
                    </span>
                    <span className="text-xs font-mono text-slate-400">342 Spectators</span>
                  </div>

                  <h3 className="font-display font-black text-lg text-white">
                    Grand Final Stream
                  </h3>
                  <p className="text-xs text-slate-300">
                    Apex_Viper (PS5) vs ShadowStriker (PC) • Score: 2 - 2 (86&apos;)
                  </p>

                  <div className="tactical-pitch rounded-xl h-28 relative flex items-center justify-center overflow-hidden border border-emerald-500/20">
                    <div className="w-12 h-12 rounded-full border border-[#00ff87]/40 flex items-center justify-center animate-pulse">
                      <div className="w-2 h-2 rounded-full bg-[#00ff87]" />
                    </div>
                    <span className="absolute bottom-2 text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded">
                      Sub-second latency (24ms)
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('spectator')}
                    className="w-full py-2.5 rounded-xl bg-[#00e5ff] text-black font-display font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-lg shadow-[#00e5ff]/20 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Radio className="w-4 h-4" />
                    <span>Watch Spectator Lobby</span>
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Dedicated Tactical Lab Screen */}
        {activeTab === 'tactics' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-2xl text-white tracking-wide flex items-center gap-2">
                  <Shield className="w-6 h-6 text-[#00ff87]" />
                  Tactical Squad Lab & Formation Builder
                </h2>
                <p className="text-xs text-slate-400">
                  Custom playstyles, individual player ratings, and tactical instructions.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-mono text-xs hover:bg-slate-700 cursor-pointer"
              >
                &larr; Back to Home
              </button>
            </div>
            <TacticalPitchBoard formation={demoSquadFormation} />
          </div>
        )}

        {/* Dedicated Arena / Matchday Screen */}
        {activeTab === 'arena' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-2xl text-white tracking-wide flex items-center gap-2">
                  <Swords className="w-6 h-6 text-[#00ff87]" />
                  Competitive Matchday Arena
                </h2>
                <p className="text-xs text-slate-400">
                  Fast 1v1 matchmaking with crossplay support across Android, PlayStation, Xbox, and PC.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-mono text-xs hover:bg-slate-700 cursor-pointer"
              >
                &larr; Back to Home
              </button>
            </div>
            <EPitchHeroBanner
              onEnterMatchday={handleEnterMatchday}
              onOpenTactics={() => setActiveTab('tactics')}
              energy={session.energy}
            />
          </div>
        )}

        {/* Dedicated Tournaments Screen */}
        {activeTab === 'tournaments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-2xl text-white tracking-wide flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  Masters Tournament Hub
                </h2>
                <p className="text-xs text-slate-400">
                  Automated knockout brackets, live score reporting & OCR screenshot dispute verification.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-mono text-xs hover:bg-slate-700 cursor-pointer"
              >
                &larr; Back to Home
              </button>
            </div>
            <TournamentTreePanel tournament={demoTournament} />
          </div>
        )}

        {/* Dedicated WebRTC Live Spectator Screen */}
        {activeTab === 'spectator' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-black text-2xl text-white tracking-wide flex items-center gap-2">
                  <Radio className="w-6 h-6 text-[#ff0055]" />
                  In-App WebRTC Spectator Arena
                </h2>
                <p className="text-xs text-slate-400">
                  Native screen capture stream via navigator.mediaDevices.getDisplayMedia with sub-second latency.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-mono text-xs hover:bg-slate-700 cursor-pointer"
              >
                &larr; Back to Home
              </button>
            </div>
            <LiveSpectatorPanel />
          </div>
        )}
      </main>

      {/* Android-Optimized Bottom Navigation */}
      <EPitchBottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Simulated Highlight Reel Modal */}
      <HighlightReelModal
        match={selectedReplayMatch}
        isOpen={isReplayModalOpen}
        onClose={() => setIsReplayModalOpen(false)}
      />

      {/* Django Backend Source & Templates Code Modal */}
      <DjangoCodeViewerModal
        isOpen={isDjangoModalOpen}
        onClose={() => setIsDjangoModalOpen(false)}
      />

      {/* Architecture Spec Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}
