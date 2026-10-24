import React from 'react';
import { GamingPlatform } from '../types/efootball';
import { 
  Flame, 
  Trophy, 
  Shield, 
  Radio, 
  MessageSquare, 
  Users, 
  Award, 
  ChevronRight, 
  Smartphone, 
  Gamepad2, 
  Monitor, 
  Layers,
  Sparkles,
  Wifi
} from 'lucide-react';

export type ActiveTab = 'feed' | 'tournaments' | 'squads' | 'spectator' | 'messenger';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  selectedPlatform: GamingPlatform | 'all';
  onSelectPlatform: (platform: GamingPlatform | 'all') => void;
  onQuickGenerateRoom: () => void;
  onOpenArchitectureModal: () => void;
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  selectedPlatform,
  onSelectPlatform,
  onQuickGenerateRoom,
  onOpenArchitectureModal,
  isCollapsed = false,
}) => {
  const navItems = [
    { id: 'feed' as const, label: 'Community Feed', icon: <Flame className="w-4 h-4" />, badge: 'LIVE' },
    { id: 'tournaments' as const, label: 'Tournaments Hub', icon: <Trophy className="w-4 h-4" />, badge: '$1.5k' },
    { id: 'squads' as const, label: 'Tactics & Squads', icon: <Shield className="w-4 h-4" /> },
    { id: 'spectator' as const, label: 'Live Spectator (WebRTC)', icon: <Radio className="w-4 h-4" />, badge: '340+' },
    { id: 'messenger' as const, label: '1v1 Match Codes', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const platformList: Array<{ id: GamingPlatform; label: string; icon: React.ReactNode; onlineCount: string }> = [
    { id: 'mobile', label: 'Mobile (iOS / Android)', icon: <Smartphone className="w-3.5 h-3.5 text-emerald-400" />, onlineCount: '1.4k' },
    { id: 'psn', label: 'PlayStation 5 / 4', icon: <Gamepad2 className="w-3.5 h-3.5 text-sky-400" />, onlineCount: '890' },
    { id: 'xbox', label: 'Xbox Series X/S', icon: <Gamepad2 className="w-3.5 h-3.5 text-green-400" />, onlineCount: '420' },
    { id: 'pc', label: 'Steam PC', icon: <Monitor className="w-3.5 h-3.5 text-cyan-400" />, onlineCount: '630' },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-5">
      {/* User Status Card */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#00FF87]/5 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100"
              alt="Apex_Viper"
              className="w-12 h-12 rounded-xl object-cover border-2 border-[#00FF87]"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b1017]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-white text-sm">Apex_Viper</span>
              <Award className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-[11px] font-mono-code text-[#00FF87] font-semibold">
              PSN-VIPER-99
            </span>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 bg-[#080d14] p-2.5 rounded-xl border border-slate-800/80 text-center mb-3">
          <div>
            <span className="text-[10px] uppercase font-mono-code text-slate-500 block">Rank</span>
            <span className="font-display font-bold text-xs text-white">Div 1</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono-code text-slate-500 block">Rating</span>
            <span className="font-display font-bold text-xs text-[#00FF87]">1,940</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono-code text-slate-500 block">Win Rate</span>
            <span className="font-display font-bold text-xs text-cyan-400">68%</span>
          </div>
        </div>

        {/* Quick Match Room Generator Action */}
        <button
          onClick={onQuickGenerateRoom}
          className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-[#00FF87] hover:text-black text-[#00FF87] border border-[#00FF87]/30 text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New 1v1 Room Code</span>
        </button>
      </div>

      {/* Main Navigation Menu */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-2xl p-2.5 shadow-xl space-y-1">
        <span className="px-3 pt-2 pb-1 text-[10px] font-mono-code text-slate-500 uppercase tracking-wider block">
          Platform Navigation
        </span>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#00FF87] text-black font-bold shadow-md shadow-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={isActive ? 'text-black' : 'text-[#00FF87]'}>{item.icon}</span>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded-full font-bold uppercase ${
                    isActive
                      ? 'bg-black text-[#00FF87]'
                      : 'bg-emerald-950/80 text-[#00FF87] border border-emerald-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Platform Fast Switcher */}
      <div className="bg-[#0b1017] border border-slate-800 rounded-2xl p-3 shadow-xl space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono-code text-slate-500 uppercase tracking-wider">
            Filter By Platform
          </span>
          <button
            onClick={() => onSelectPlatform('all')}
            className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded cursor-pointer ${
              selectedPlatform === 'all'
                ? 'bg-[#00FF87] text-black font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
        </div>

        <div className="space-y-1">
          {platformList.map((p) => {
            const isSelected = selectedPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPlatform(p.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border border-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  {p.icon}
                  <span className="truncate">{p.label}</span>
                </div>
                <span className="text-[10px] font-mono-code text-slate-500">
                  {p.onlineCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Backend & Architecture Status Indicator */}
      <div className="p-3 bg-[#080d14] border border-slate-800/90 rounded-2xl text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono-code text-emerald-400 font-bold flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            Django Backend
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono-code">
            CONNECTED
          </span>
        </div>
        <p className="text-[10px] text-slate-500 leading-tight">
          WebSockets channels active for instant score reporting & WebRTC screen sharing signaling.
        </p>
        <button
          onClick={onOpenArchitectureModal}
          className="text-[10px] text-[#00FF87] hover:underline cursor-pointer block pt-1"
        >
          View System Architecture Spec &rarr;
        </button>
      </div>
    </aside>
  );
};
