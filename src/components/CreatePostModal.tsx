import React, { useState } from 'react';
import { GamingPlatform, PostCategory, Post } from '../types/efootball';
import { demoSquadFormation } from '../data/mockData';
import { X, Video, Shield, Plus, Sparkles, Send, Gamepad2 } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitPost: (newPost: Post) => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmitPost,
}) => {
  const [content, setContent] = useState<string>('');
  const [platformTag, setPlatformTag] = useState<GamingPlatform | 'all'>('psn');
  const [category, setCategory] = useState<PostCategory>('goals');
  const [mediaType, setMediaType] = useState<'video' | 'squad' | 'recruitment' | 'none'>('video');
  const [videoUrl, setVideoUrl] = useState<string>(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const post: Post = {
      id: `post-${Date.now()}`,
      author: {
        username: 'Apex_Viper',
        handle: '@apex_viper',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=120',
        platform: platformTag === 'all' ? 'psn' : platformTag,
        efootballId: 'PSN-VIPER-99',
        division: 'Division 1',
        clan: 'Apex Syndicate',
      },
      content: content.trim(),
      mediaType: mediaType === 'none' ? 'video' : mediaType,
      mediaUrl: mediaType === 'video' ? videoUrl : undefined,
      videoDurationSeconds: mediaType === 'video' ? 22 : undefined,
      squadData: mediaType === 'squad' ? demoSquadFormation : undefined,
      platformTag,
      category,
      likesCount: 0,
      hasLiked: false,
      commentsCount: 0,
      sharesCount: 0,
      createdAt: 'Just now',
    };

    onSubmitPost(post);
    onClose();
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b1017] border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 bg-[#0e1622] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00FF87]" />
            <h3 className="font-display font-bold text-white text-base">
              Create eFootball Post
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Post Type Selector */}
          <div>
            <label className="font-mono-code text-slate-400 block mb-1.5 uppercase text-[10px]">
              Post Format / Media Attachment
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-medium cursor-pointer ${
                  mediaType === 'video'
                    ? 'border-[#00FF87] bg-emerald-950/40 text-[#00FF87]'
                    : 'border-slate-800 bg-[#0d1420] text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Goal Clip</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaType('squad')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-medium cursor-pointer ${
                  mediaType === 'squad'
                    ? 'border-[#00FF87] bg-emerald-950/40 text-[#00FF87]'
                    : 'border-slate-800 bg-[#0d1420] text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Squad Tactics</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaType('recruitment')}
                className={`py-2 px-3 rounded-lg border flex items-center justify-center gap-1.5 font-medium cursor-pointer ${
                  mediaType === 'recruitment'
                    ? 'border-[#00FF87] bg-emerald-950/40 text-[#00FF87]'
                    : 'border-slate-800 bg-[#0d1420] text-slate-400 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Recruitment</span>
              </button>
            </div>
          </div>

          {/* Platform Tag Selector */}
          <div>
            <label className="font-mono-code text-slate-400 block mb-1.5 uppercase text-[10px]">
              Gaming Platform Filter Tag
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'mobile', 'psn', 'xbox', 'pc'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlatformTag(p)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono-code border cursor-pointer uppercase ${
                    platformTag === p
                      ? 'border-[#00FF87] bg-[#00FF87] text-black font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  #{p === 'all' ? 'Crossplay' : p}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector */}
          <div>
            <label className="font-mono-code text-slate-400 block mb-1.5 uppercase text-[10px]">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['goals', 'tactics', 'skills', 'recruitment', 'discussion'] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono-code border cursor-pointer capitalize ${
                    category === c
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 font-bold'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  #{c}
                </button>
              ))}
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="font-mono-code text-slate-400 block mb-1.5 uppercase text-[10px]">
              Post Caption & Tactical Description
            </label>
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Break down your tactical setup, share match details, or drop your room code..."
              className="w-full bg-black/60 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF87] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#00FF87] text-black font-display font-bold uppercase tracking-wider hover:bg-emerald-300 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Post</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
