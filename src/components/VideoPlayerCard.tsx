import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw, Video } from 'lucide-react';

interface VideoPlayerCardProps {
  videoUrl: string;
  durationSeconds?: number;
  title?: string;
}

export const VideoPlayerCard: React.FC<VideoPlayerCardProps> = ({
  videoUrl,
  durationSeconds = 20,
  title,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(durationSeconds);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-black/90 border border-slate-800 shadow-xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onClick={togglePlay}
        className="w-full max-h-[460px] object-cover cursor-pointer block"
      />

      {/* Top Overlay Badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 text-xs text-white">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono-code text-[11px] font-bold tracking-wider">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-[#00FF87] font-semibold text-[10px] uppercase">
            1080p 60FPS
          </span>
        </div>

        <div className="bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono-code font-bold uppercase tracking-wider border border-slate-700/50">
          eFootball Highlight Clip
        </div>
      </div>

      {/* Center Big Play Button if paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#00FF87] text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer z-10"
        >
          <Play className="w-6 h-6 fill-black translate-x-0.5" />
        </button>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-6 transition-opacity duration-200 z-10 ${
          isHovered || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Scrubber Range Bar */}
        <div className="flex items-center gap-2 mb-2">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Video seek bar"
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00FF87]"
          />
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="p-1 hover:text-[#00FF87] transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              onClick={handleRestart}
              aria-label="Replay clip"
              className="p-1 hover:text-[#00FF87] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-1 hover:text-[#00FF87] transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#00FF87]" />}
            </button>

            <span className="font-mono-code text-[11px] text-slate-300">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              className="p-1 hover:text-[#00FF87] transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
