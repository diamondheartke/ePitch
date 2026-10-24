import React from 'react';
import { X, Server, Database, Radio, Shield, Video, Layers, CheckCircle } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b1017] border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-[#0e1622] z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white tracking-wide">
                System Architecture & Tech Roadmap
              </h2>
              <p className="text-xs text-slate-400">
                Django Rendered Architecture • Alpine.js Reactivity • WebRTC P2P In-App Spectator
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close architecture modal"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-300">
          {/* Architecture Visual Topology */}
          <div className="bg-[#080d14] border border-slate-800 rounded-xl p-4 font-mono-code text-xs text-emerald-400 overflow-x-auto">
            <pre className="leading-relaxed">
{`       +-------------------------------------------------------------+
       |                        FRONTEND                             |
       |  HTML5 + Tailwind CSS + Alpine.js (Django Template Engine)  |
       +------------------------------+------------------------------+
                                      |
                         HTTP / REST  |  WebSockets (Django Channels)
                                      v
       +-------------------------------------------------------------+
       |                        BACKEND                              |
       |               Python / Django Framework                     |
       +-------+----------------------+----------------------+-------+
               |                      |                      |
               v                      v                      v
    +-------------------+   +------------------+   +-------------------+
    |    Firebase       |   | MariaDB / MySQL  |   |    Cloudinary     |
    |  Authentication   |   | Database Models  |   | Media Storage/CDN |
    +-------------------+   +------------------+   +-------------------+`}
            </pre>
          </div>

          {/* Tech Stack Breakdown Table */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-3 flex items-center gap-2">
              <Server className="w-4 h-4 text-[#00FF87]" />
              Tech Stack Breakdown
            </h3>
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0e1622] text-slate-400 font-mono-code border-b border-slate-800">
                  <tr>
                    <th className="p-3">Layer</th>
                    <th className="p-3">Technology</th>
                    <th className="p-3">Key Responsibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-[#090e15]">
                  <tr>
                    <td className="p-3 font-bold text-[#00FF87]">Frontend</td>
                    <td className="p-3 text-white">HTML5, Tailwind CSS, Alpine.js</td>
                    <td className="p-3 text-slate-400">UI layout, responsive dark sports styling, instant reactivity without heavy SPA bloat.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-400">Backend</td>
                    <td className="p-3 text-white">Python / Django Framework</td>
                    <td className="p-3 text-slate-400">Core routing, business logic, bracket generation, and dispute validation.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-rose-400">Real-time</td>
                    <td className="p-3 text-white">Django Channels + WebSockets / WebRTC</td>
                    <td className="p-3 text-slate-400">Live 1v1 match coordination, instant notifications, and native screen sharing.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-400">Database</td>
                    <td className="p-3 text-white">MariaDB / MySQL</td>
                    <td className="p-3 text-slate-400">Relational data persistence (UserProfile, Post, Tournament, Match).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-400">Authentication</td>
                    <td className="p-3 text-white">Firebase Auth (Client-side JWT)</td>
                    <td className="p-3 text-slate-400">Social & email logins, authenticated via Django middleware.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-sky-400">Media CDN</td>
                    <td className="p-3 text-white">Cloudinary / Built-in Server</td>
                    <td className="p-3 text-slate-400">Automated 15–60s highlight video delivery and thumbnail compression.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Core Data Models */}
          <div>
            <h3 className="font-display font-bold text-white text-base mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Core Django Data Models
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono-code">
              <div className="p-3.5 bg-[#090e16] border border-slate-800 rounded-xl">
                <span className="text-[#00FF87] font-bold block mb-1">class UserProfile(models.Model):</span>
                <p className="text-slate-400">
                  firebase_uid, username, bio, avatar_url, primary_platform (mobile, psn, xbox, pc), efootball_id, created_at
                </p>
              </div>

              <div className="p-3.5 bg-[#090e16] border border-slate-800 rounded-xl">
                <span className="text-cyan-400 font-bold block mb-1">class Post(models.Model):</span>
                <p className="text-slate-400">
                  author, content, media_url, media_type (video, squad, match_result), platform_tag, created_at
                </p>
              </div>

              <div className="p-3.5 bg-[#090e16] border border-slate-800 rounded-xl">
                <span className="text-amber-400 font-bold block mb-1">class Tournament(models.Model):</span>
                <p className="text-slate-400">
                  title, description, format (knockout, league), max_participants, start_date, organizer, is_active
                </p>
              </div>

              <div className="p-3.5 bg-[#090e16] border border-slate-800 rounded-xl">
                <span className="text-rose-400 font-bold block mb-1">class Match(models.Model):</span>
                <p className="text-slate-400">
                  tournament, player1, player2, player1_score, player2_score, is_completed, live_stream_active, stream_room_id
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e1622] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#00FF87] text-black font-display font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-300 transition-colors cursor-pointer"
          >
            Close Spec View
          </button>
        </div>
      </div>
    </div>
  );
};
