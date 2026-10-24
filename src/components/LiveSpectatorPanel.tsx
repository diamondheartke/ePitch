import React, { useState, useRef, useEffect } from 'react';
import { Radio, Users, Eye, Sparkles, MessageSquare, Send, Cast, Shield, Wifi, AlertCircle } from 'lucide-react';

export const LiveSpectatorPanel: React.FC = () => {
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastError, setBroadcastError] = useState<string | null>(null);
  const [reactions, setReactions] = useState<{ id: string; emoji: string; left: number }[]>([]);
  const [viewerCount, setViewerCount] = useState<number>(342);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    { id: '1', user: 'MobilePro_99', text: 'That curler from Carlos was unstoppable!', time: '18:20' },
    { id: '2', user: 'ConsoleKing', text: 'Lag is zero on this stream, WebRTC sub-second is crisp', time: '18:21' },
    { id: '3', user: 'PES_Scout', text: 'Watch the double DMF pivot defending the box', time: '18:22' },
  ]);

  const streamVideoRef = useRef<HTMLVideoElement>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Reaction burst trigger
  const triggerReaction = (emoji: string) => {
    const id = Math.random().toString();
    const left = 20 + Math.random() * 60; // 20% to 80% horizontal range
    setReactions((prev) => [...prev, { id, emoji, left }]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  // WebRTC Screen Capture API integration
  const startScreenBroadcast = async () => {
    setBroadcastError(null);
    try {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        throw new Error('Screen Capture API is not supported in this browser environment.');
      }
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      screenStreamRef.current = stream;
      if (streamVideoRef.current) {
        streamVideoRef.current.srcObject = stream;
        streamVideoRef.current.play();
      }
      setIsBroadcasting(true);

      // Listen for stream ended by user via browser chrome bar
      stream.getVideoTracks()[0].onended = () => {
        stopScreenBroadcast();
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Permission denied for screen capture.';
      console.warn('Broadcast screen share info:', errorMessage);
      setBroadcastError('Screen capture prompt dismissed or preview restricted. You can still test in-app spectator mode!');
      // Toggle simulated broadcast
      setIsBroadcasting(true);
    }
  };

  const stopScreenBroadcast = () => {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
    }
    if (streamVideoRef.current) {
      streamVideoRef.current.srcObject = null;
    }
    setIsBroadcasting(false);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        user: 'You (EF-VIPER)',
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setChatInput('');
  };

  // Simulate viewer fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => Math.max(310, prev + Math.floor(Math.random() * 7) - 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0b1017] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Lobby Header */}
      <div className="p-4 bg-[#0e1622] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute" />
            <div className="w-3 h-3 rounded-full bg-rose-500 relative" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-sm tracking-wide">
                IN-APP SPECTATOR LOBBY
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-rose-950/80 text-rose-400 border border-rose-500/40 font-bold uppercase">
                WebRTC P2P
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Grand Final: <strong className="text-white">Apex_Viper (PS5) vs ShadowStriker (PC)</strong>
            </p>
          </div>
        </div>

        {/* Latency & Viewers */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-slate-800 text-slate-300">
            <Users className="w-3.5 h-3.5 text-[#00FF87]" />
            <span className="font-mono-code font-bold text-white">{viewerCount}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-black/40 border border-slate-800 text-slate-400 text-[11px] font-mono-code">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>24ms</span>
          </div>
        </div>
      </div>

      {/* Main Broadcast Video Area */}
      <div className="relative bg-black h-56 sm:h-64 flex items-center justify-center overflow-hidden">
        {/* Floating animated reactions */}
        {reactions.map((r) => (
          <div
            key={r.id}
            style={{ left: `${r.left}%` }}
            className="absolute bottom-6 text-3xl pointer-events-none animate-bounce z-30 transition-all duration-1000 transform -translate-y-24 opacity-80"
          >
            {r.emoji}
          </div>
        ))}

        {isBroadcasting && screenStreamRef.current ? (
          <video
            ref={streamVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          /* Live Stream Simulation Canvas/Feed */
          <div className="w-full h-full relative tactical-pitch flex flex-col justify-between p-4">
            {/* Match HUD Overlay */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80">
                <span className="font-display font-bold text-white text-xs">Apex_Viper</span>
                <span className="text-[#00FF87] font-mono-code font-extrabold text-sm px-1.5 py-0.5 bg-emerald-950/80 rounded">
                  2
                </span>
                <span className="text-slate-500 font-bold">:</span>
                <span className="text-white font-mono-code font-extrabold text-sm px-1.5 py-0.5 bg-slate-800 rounded">
                  2
                </span>
                <span className="font-display font-bold text-white text-xs">ShadowStriker</span>
                <span className="text-rose-400 font-mono-code text-xs font-bold pl-1 animate-pulse">86&apos;</span>
              </div>

              <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-[11px] text-[#00FF87] font-mono-code flex items-center gap-1.5">
                <Radio className="w-3 h-3 text-rose-500 animate-pulse" />
                <span>LIVE FEED</span>
              </div>
            </div>

            {/* Stadium Pitch Radar Graphic in center */}
            <div className="self-center flex flex-col items-center justify-center my-auto">
              <div className="w-20 h-20 rounded-full border-2 border-[#00FF87]/40 flex items-center justify-center relative animate-pulse">
                <div className="w-10 h-10 rounded-full border border-cyan-400/50" />
                <div className="w-2 h-2 rounded-full bg-[#00FF87] absolute top-3 left-4" />
                <div className="w-2 h-2 rounded-full bg-cyan-400 absolute bottom-5 right-5" />
                <div className="w-2 h-2 rounded-full bg-amber-400 absolute top-7 right-7 animate-ping" />
              </div>
              <span className="text-[11px] font-mono-code text-slate-300 mt-2 bg-black/60 px-2 py-0.5 rounded">
                Tactical Radar Sync • 60 FPS
              </span>
            </div>

            {/* Broadcast action overlay */}
            <div className="flex items-center justify-between z-10">
              <span className="text-[10px] text-slate-400 font-mono-code">
                Signal: WebSockets Signaling Consumer (Django Channels)
              </span>
            </div>
          </div>
        )}

        {/* Broadcaster Controller Overlay */}
        <div className="absolute top-3 right-3 z-20">
          {!isBroadcasting ? (
            <button
              onClick={startScreenBroadcast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00FF87] text-black font-display font-bold text-xs uppercase tracking-wide shadow-lg hover:bg-emerald-300 transition-all cursor-pointer"
            >
              <Cast className="w-3.5 h-3.5" />
              <span>Broadcast Screen</span>
            </button>
          ) : (
            <button
              onClick={stopScreenBroadcast}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white font-display font-bold text-xs uppercase tracking-wide shadow-lg hover:bg-rose-500 transition-all cursor-pointer"
            >
              <span>Stop Broadcast</span>
            </button>
          )}
        </div>
      </div>

      {broadcastError && (
        <div className="p-2.5 bg-amber-950/40 border-y border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{broadcastError}</span>
        </div>
      )}

      {/* Emoji Reactions Bar */}
      <div className="px-4 py-2 bg-[#0e1622] border-b border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider">
          Live Reactions
        </span>
        <div className="flex items-center gap-2">
          {['⚽', '🔥', '😱', '👏', '🏆'].map((emoji) => (
            <button
              key={emoji}
              onClick={() => triggerReaction(emoji)}
              aria-label={`Send ${emoji} reaction`}
              className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 hover:scale-110 active:scale-95 text-base flex items-center justify-center transition-all cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Spectator Chat Log */}
      <div className="p-3 bg-[#080d14] flex-1 max-h-44 overflow-y-auto space-y-2 text-xs">
        {chatMessages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-2">
            <span className="font-display font-bold text-[#00FF87] text-xs shrink-0">
              {msg.user}:
            </span>
            <span className="text-slate-300 break-words">{msg.text}</span>
            <span className="text-[10px] text-slate-600 ml-auto shrink-0 font-mono-code">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSendChat} className="p-2.5 bg-[#0e1622] border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Send spectator message..."
          className="flex-1 bg-black/60 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87]"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="p-1.5 bg-[#00FF87] text-black rounded-lg hover:bg-emerald-300 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
