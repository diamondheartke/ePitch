import React, { useState } from 'react';
import { Post } from '../types/efootball';
import { getPlatformBadge } from '../utils/efootball';
import { VideoPlayerCard } from './VideoPlayerCard';
import { TacticalPitchBoard } from './TacticalPitchBoard';
import { Heart, MessageSquare, Share2, Copy, Check, Trophy, Users, ShieldCheck, Flame, Smartphone, Gamepad2, Monitor } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLikeToggle?: (postId: string) => void;
  onChallengePlayer?: (efootballId: string, username: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLikeToggle, onChallengePlayer }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(post.hasLiked || false);
  const [likes, setLikes] = useState<number>(post.likesCount);

  const platformInfo = getPlatformBadge(post.author.platform);

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(post.author.efootballId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikes((prev) => (nextLiked ? prev + 1 : prev - 1));
    if (onLikeToggle) {
      onLikeToggle(post.id);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'mobile':
        return <Smartphone className="w-3.5 h-3.5" />;
      case 'psn':
      case 'xbox':
        return <Gamepad2 className="w-3.5 h-3.5" />;
      case 'pc':
        return <Monitor className="w-3.5 h-3.5" />;
      default:
        return <Trophy className="w-3.5 h-3.5" />;
    }
  };

  return (
    <article className="bg-[#0b1017] border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-lg hover:border-slate-700/80 transition-all duration-200">
      {/* Post Author Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.username}
            className="w-11 h-11 rounded-xl object-cover border-2 border-slate-700"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-bold text-white text-base tracking-wide hover:text-[#00FF87] cursor-pointer transition-colors">
                {post.author.username}
              </h2>
              <span className={`text-[11px] font-mono-code px-2 py-0.5 rounded-full border flex items-center gap-1 ${platformInfo.bgClass} ${platformInfo.colorClass}`}>
                {getPlatformIcon(post.author.platform)}
                <span>{platformInfo.tag}</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                {post.author.division}
              </span>
              {post.author.clan && (
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-1">
                  <Users className="w-3 h-3 text-emerald-400" />
                  {post.author.clan}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{post.author.handle}</span>
              <span>•</span>
              <button
                onClick={handleCopyId}
                title="Copy eFootball ID"
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/60 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer font-mono-code text-[11px]"
              >
                <span>ID: {post.author.efootballId}</span>
                {copied ? <Check className="w-3 h-3 text-[#00FF87]" /> : <Copy className="w-3 h-3 text-slate-400" />}
              </button>
              <span>•</span>
              <time className="text-slate-500">{post.createdAt}</time>
            </div>
          </div>
        </div>

        {/* Quick 1v1 Challenge Action */}
        {onChallengePlayer && (
          <button
            onClick={() => onChallengePlayer(post.author.efootballId, post.author.username)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-[#00FF87] hover:text-black text-[#00FF87] border border-[#00FF87]/30 text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Challenge 1v1</span>
          </button>
        )}
      </div>

      {/* Post Text Content */}
      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4 whitespace-pre-line font-normal">
        {post.content}
      </p>

      {/* Media Type Rendition */}
      {post.mediaType === 'video' && post.mediaUrl && (
        <div className="mb-4">
          <VideoPlayerCard
            videoUrl={post.mediaUrl}
            durationSeconds={post.videoDurationSeconds}
          />
        </div>
      )}

      {post.mediaType === 'squad' && post.squadData && (
        <div className="mb-4">
          <TacticalPitchBoard formation={post.squadData} />
        </div>
      )}

      {post.mediaType === 'match_result' && post.matchData && (
        <div className="mb-4 bg-gradient-to-r from-slate-900 via-[#0e1622] to-slate-900 border border-slate-700/80 rounded-xl p-4 shadow-inner">
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
            <span className="text-xs uppercase font-mono-code text-slate-400 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              {post.matchData.competition}
            </span>
            {post.matchData.screenshotVerified && (
              <span className="text-[11px] font-semibold text-[#00FF87] bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified via OCR Screenshot
              </span>
            )}
          </div>

          <div className="flex items-center justify-around py-3">
            <div className="text-center">
              <span className="font-display font-bold text-white text-base block">{post.author.username}</span>
              <span className="text-xs text-slate-400 font-mono-code">Home</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-display font-extrabold text-[#00FF87]">{post.matchData.p1Score}</span>
              <span className="text-xl text-slate-600 font-bold">-</span>
              <span className="text-3xl font-display font-extrabold text-slate-300">{post.matchData.p2Score}</span>
            </div>

            <div className="text-center">
              <span className="font-display font-bold text-white text-base block">{post.matchData.opponent}</span>
              <span className="text-xs text-slate-400 font-mono-code">Away</span>
            </div>
          </div>
        </div>
      )}

      {post.mediaType === 'recruitment' && (
        <div className="mb-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-emerald-400 text-sm tracking-wide flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              Clan Trial Requirements
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Minimum Division 2 ranking, weekly activity on Discord, crossplay friendly.
            </p>
          </div>
          <button
            onClick={() => onChallengePlayer && onChallengePlayer(post.author.efootballId, post.author.username)}
            className="px-3.5 py-1.5 bg-[#00FF87] text-black font-display font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            Apply for Trial
          </button>
        </div>
      )}

      {/* Engagement Actions Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-5">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer group ${
              isLiked ? 'text-rose-500' : 'hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
            <span className="font-mono-code font-semibold">{likes}</span>
          </button>

          {/* Comment */}
          <button className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            <span className="font-mono-code font-semibold">{post.commentsCount}</span>
          </button>

          {/* Share */}
          <button className="flex items-center gap-1.5 hover:text-[#00FF87] transition-colors cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span className="font-mono-code font-semibold">{post.sharesCount}</span>
          </button>
        </div>

        {/* Category Pill */}
        <span className="text-[11px] font-mono-code uppercase px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/50">
          #{post.category}
        </span>
      </div>
    </article>
  );
};
