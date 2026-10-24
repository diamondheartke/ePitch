import React, { useRef, useState, useEffect } from 'react';
import { RecentMatch, MatchHighlightMoment } from '../types/recentMatches';
import { formatResultBadge } from '../utils/recentMatches';
import { getPlatformBadge } from '../utils/efootball';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Trophy, 
  Share2, 
  Check, 
  Sparkles, 
  Clock, 
  Target, 
  Shield 
} from 'lucide-react';

interface HighlightReelModalProps {
  match: RecentMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export const HighlightReelModal: React.FC<HighlightReelModalProps> = ({
  match,
  isOpen,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(25);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeMomentIndex, setActiveMomentIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      setIsPlaying(true);
      setCurrentTime(0);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !match) return null;

  const resultBadge = formatResultBadge(match.result);
  const opponentPlatform = getPlatformBadge(match.opponent.platform);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeekMoment = (index: number) => {
    setActiveMomentIndex(index);
    if (!videoRef.current) return;
    // Calculate fractional timestamp based on moment position
    const momentFraction = index / Math.max(1, match.keyMoments.length);
    const targetTime = momentFraction * (duration || 24);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(
      `Watch eFootball Match Highlights: Apex_Viper ${match.userScore} - ${match.opponentScore} ${match.opponent.name} (${match.competition})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div 
        className="bg-[#0b1017] border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-auto animate-fade-in flex flex-col max-h-[92vh]"
        role="dialog"
        aria-labelledby="modal-highlight-title"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-[#0e1622] border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`px-2.5 py-1 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider ${resultBadge.badgeClass}`}>
              {resultBadge.label}
            </div>
            <div>
              <h2 id="modal-highlight-title" className="font-display font-black text-base sm:text-lg text-white tracking-wide">
                Apex_Viper <span className={resultBadge.scoreColor}>{match.userScore}</span> : <span>{match.opponentScore}</span> {match.opponent.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
                <span>{match.competition}</span>
                <span>•</span>
                <span>{match.timestamp}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyShare}
              aria-label="Share highlight reel"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00ff87]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share Reel'}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close highlight modal"
              className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body (Scrollable) */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Highlight Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-xl group">
            <video
              ref={videoRef}
              src={match.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
              className="w-full h-56 sm:h-80 object-cover cursor-pointer block"
            />

            {/* Video Overlay Top Badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/80 text-xs text-white font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>MATCH HIGHLIGHT REEL</span>
                <span className="text-slate-500">|</span>
                <span className="text-[#00ff87] font-bold">1080p 60FPS</span>
              </div>

              <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-xs text-slate-300 font-mono">
                {formatSeconds(currentTime)} / {formatSeconds(duration)}
              </div>
            </div>

            {/* Play Button Overlay if Paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                aria-label="Play video reel"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#00ff87] text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
              >
                <Play className="w-7 h-7 fill-black translate-x-0.5" />
              </button>
            )}

            {/* Player Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 z-10">
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="p-1.5 hover:text-[#00ff87] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().then(() => setIsPlaying(true));
                      }
                    }}
                    aria-label="Restart reel"
                    className="p-1.5 hover:text-[#00ff87] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                    className="p-1.5 hover:text-[#00ff87] transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#00ff87]" />}
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-300">
                  ePitch In-Game Instant Replay Engine
                </div>
              </div>
            </div>
          </div>

          {/* Key Match Moments Reel Navigator */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00ff87]" />
                Key Match Highlights & Goals
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                Click moment to jump
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {match.keyMoments.map((moment, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSeekMoment(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    activeMomentIndex === idx
                      ? 'bg-slate-800/90 border-[#00ff87] shadow-lg shadow-[#00ff87]/10'
                      : 'bg-slate-900/60 border-white/5 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-black/60 border border-slate-700 flex flex-col items-center justify-center shrink-0">
                    <span className="font-mono text-xs font-black text-[#00ff87] leading-none">
                      {moment.minute}&apos;
                    </span>
                    <span className="text-[9px] uppercase text-slate-400 font-mono leading-none mt-0.5">
                      MIN
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white truncate">
                        {moment.title}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 font-semibold mt-0.5">
                      {moment.scorerOrPlayer}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {moment.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Match Statistics Card */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-white/10 space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              Final Match Statistics
            </h4>

            {/* Possession Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-white font-bold">Apex_Viper ({match.possession.user}%)</span>
                <span className="text-slate-400 font-bold">Possession</span>
                <span className="text-slate-300 font-bold">{match.opponent.name} ({match.possession.opponent}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  style={{ width: `${match.possession.user}%` }}
                  className="bg-[#00ff87] h-full transition-all"
                />
                <div
                  style={{ width: `${match.possession.opponent}%` }}
                  className="bg-slate-600 h-full transition-all"
                />
              </div>
            </div>

            {/* Shots on Target & Opponent Details */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-white/5">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Shots (On Target)</span>
                <span className="text-white font-bold">{match.shotsOnTarget.user} vs {match.shotsOnTarget.opponent}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[10px] uppercase">Opponent Platform & ID</span>
                <span className="text-cyan-400 font-bold">{opponentPlatform.tag} • {match.opponent.efootballId}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0e1622] border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Matches recorded automatically via Django Match Engine & Channels
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#00ff87] text-black font-display font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors cursor-pointer ml-auto"
          >
            Close Replay
          </button>
        </div>
      </div>
    </div>
  );
};
