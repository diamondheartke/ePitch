import React, { useState } from 'react';
import { GamingPlatform, ChatMessage } from '../types/efootball';
import { generateMatchRoomCode, getPlatformBadge } from '../utils/efootball';
import { Send, Copy, Check, Key, Wifi, Gamepad, Lock, ShieldAlert, Sparkles } from 'lucide-react';

interface MatchMessengerPanelProps {
  initialMessages: ChatMessage[];
  defaultPlatform?: GamingPlatform;
}

export const MatchMessengerPanel: React.FC<MatchMessengerPanelProps> = ({
  initialMessages,
  defaultPlatform = 'psn',
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState<string>('');
  const [platform, setPlatform] = useState<GamingPlatform>(defaultPlatform);
  const [roomCode, setRoomCode] = useState<string>(generateMatchRoomCode(defaultPlatform));
  const [hasPassword, setHasPassword] = useState<boolean>(true);
  const [roomPassword, setRoomPassword] = useState<string>('7711');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const handleGenerateNewCode = () => {
    const newCode = generateMatchRoomCode(platform);
    setRoomCode(newCode);
    const pass = Math.floor(1000 + Math.random() * 9000).toString();
    setRoomPassword(pass);

    // Automatically send new room code into chat
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Apex_Viper (You)',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80',
      platform,
      text: `Generated New Room: ${newCode} (Pass: ${hasPassword ? pass : 'None'}). Match standard 10 mins.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRoomCode: true,
      roomCode: newCode,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(roomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Apex_Viper (You)',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80',
      platform,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <div className="bg-[#0b1017] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col h-full max-h-[640px]">
      {/* 1v1 Room Code Dispatcher Header */}
      <div className="p-4 bg-[#0e1622] border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Gamepad className="w-4 h-4 text-[#00FF87]" />
            <span className="font-display font-bold text-white text-sm tracking-wide">
              1v1 MATCH ROOM HUB
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            <Wifi className="w-3 h-3" />
            <span>P2P Ready</span>
          </div>
        </div>

        {/* Room Code Card */}
        <div className="bg-black/60 border border-slate-700/80 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono-code text-slate-400 tracking-wider">
                Current Match Code
              </span>
              {hasPassword && (
                <span className="text-[10px] text-amber-400 font-mono-code flex items-center gap-0.5">
                  <Lock className="w-3 h-3" /> Pass: {roomPassword}
                </span>
              )}
            </div>
            <span className="font-display font-extrabold text-xl text-[#00FF87] tracking-wider block font-mono-code">
              {roomCode}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyCode}
              aria-label="Copy room code"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono-code transition-colors cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00FF87]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleGenerateNewCode}
              aria-label="Generate new match room code"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-[#00FF87] hover:bg-emerald-300 text-black text-xs font-display font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Room</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-4 bg-[#080d14] flex-1 overflow-y-auto space-y-3 text-xs">
        {messages.map((m) => (
          <div key={m.id} className="flex items-start gap-2.5">
            <img
              src={m.avatar}
              alt={m.sender}
              className="w-7 h-7 rounded-lg object-cover border border-slate-700 shrink-0 mt-0.5"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white text-xs">{m.sender}</span>
                <span className="text-[10px] text-slate-500 font-mono-code">{m.timestamp}</span>
              </div>
              <div className="mt-1 p-2 rounded-lg bg-[#0d1622] border border-slate-800 text-slate-200">
                {m.text}
                {m.isRoomCode && m.roomCode && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(m.roomCode!);
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="px-2 py-0.5 rounded bg-emerald-950/80 text-[#00FF87] border border-emerald-500/40 text-[10px] font-mono-code font-bold hover:bg-emerald-900 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy {m.roomCode}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Footer */}
      <form onSubmit={handleSendMessage} className="p-3 bg-[#0e1622] border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send room pass or match challenge..."
          className="flex-1 bg-black/60 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87]"
        />
        <button
          type="submit"
          aria-label="Send match message"
          className="p-2 bg-[#00FF87] text-black rounded-lg hover:bg-emerald-300 transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
