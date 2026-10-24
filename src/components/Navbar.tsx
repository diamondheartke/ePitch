import React from 'react';
import { GamingPlatform } from '../types/efootball';
import { Shield, Sparkles, Search, Layers, Radio, Plus, Trophy, Bell, Menu } from 'lucide-react';

interface NavbarProps {
  platformFilter: GamingPlatform | 'all';
  onSelectPlatform: (platform: GamingPlatform | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenCreateModal: () => void;
  onOpenArchitectureModal: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  platformFilter,
  onSelectPlatform,
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
  onOpenArchitectureModal,
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080d14]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              className="lg:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF87] to-emerald-700 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#080d14] rounded-[10px] flex items-center justify-center">
                <span className="font-display font-extrabold text-base tracking-tighter text-[#00FF87]">
                  EF
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-lg tracking-wider text-white uppercase">
                  PITCH<span className="text-[#00FF87]">NET</span>
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-emerald-950/80 text-[#00FF87] border border-emerald-500/30 font-bold uppercase">
                  eFootball
                </span>
              </div>
              <p className="hidden md:block text-[10px] font-mono-code text-slate-400">
                Community & Tournament Hub
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search highlight clips, squad tactics, clans or eFootball ID..."
              className="w-full bg-[#0b121b] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87] transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Architecture Spec Button */}
          <button
            onClick={onOpenArchitectureModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono-code border border-slate-700 transition-colors cursor-pointer"
            title="Inspect Django + Alpine.js Architecture Spec"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture Spec</span>
          </button>

          {/* New Post Button */}
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00FF87] hover:bg-emerald-300 text-black font-display font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Post Clip</span>
          </button>

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80"
              alt="Apex_Viper"
              className="w-8 h-8 rounded-lg object-cover border border-[#00FF87]/50"
            />
            <div className="hidden xl:block text-left">
              <span className="font-display font-bold text-xs text-white block leading-tight">Apex_Viper</span>
              <span className="text-[10px] text-emerald-400 font-mono-code font-bold">Div 1 • PS5</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
