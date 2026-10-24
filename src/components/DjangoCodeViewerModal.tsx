import React, { useState } from 'react';
import { X, Copy, Check, FileCode, Server, Layers } from 'lucide-react';

interface DjangoCodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DjangoCodeViewerModal: React.FC<DjangoCodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [activeFile, setActiveFile] = useState<string>('views.py');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const files: Record<string, { path: string; language: string; content: string }> = {
    'views.py': {
      path: 'apps/home/views.py',
      language: 'python',
      content: `# apps/home/views.py
from django.shortcuts import render
from django.http import JsonResponse

def home_dashboard(request):
    is_authenticated = request.user.is_authenticated if hasattr(request, 'user') else False
    
    if is_authenticated:
        user_profile = {
            'username': request.user.username,
            'is_guest': False,
            'efootball_id': getattr(request.user, 'efootball_id', 'EP-9028-1144'),
            'division': 'Division 1',
            'gp_currency': 420000,
            'ep_points': 1850,
            'energy': 100,
            'max_energy': 100,
        }
    else:
        # Default guest state for pre-auth phase
        user_profile = {
            'username': 'Guest Tactical Manager',
            'is_guest': True,
            'efootball_id': 'EP-GUEST-001',
            'division': 'Trial Division',
            'gp_currency': 50000,
            'ep_points': 250,
            'energy': 100,
            'max_energy': 100,
        }

    return render(request, 'home/index.html', {
        'user_profile': user_profile,
        'active_tab': 'home',
    })`,
    },
    'top_bar.html': {
      path: 'templates/home/components/top_bar.html',
      language: 'django-html',
      content: `{% load static %}
<header class="epitch-top-bar glass-panel-nav sticky top-0 z-50 w-full px-4 py-2.5 border-b border-white/10 backdrop-blur-xl bg-[#070a10]/85">
  <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
    <!-- Brand Logo -->
    <a href="{% url 'home:index' %}" class="flex items-center gap-2.5">
      <img src="{% static 'assets/images/logos/epitch-logo.svg' %}" alt="ePitch" class="h-9 w-auto" />
    </a>
    
    <!-- Currency Deck -->
    <div class="flex items-center gap-2 font-mono text-xs">
      <span class="text-[#00e5ff]">⚡ {{ user_profile.energy }}/{{ user_profile.max_energy }}</span>
      <span class="text-amber-300">🪙 {{ user_profile.gp_currency }} GP</span>
      <span class="text-[#00ff87]">◈ {{ user_profile.ep_points }} EP</span>
    </div>

    <!-- Auth Hook -->
    {% if user_profile.is_guest %}
      <button class="px-3 py-1.5 rounded-xl bg-[#00ff87] text-black font-display font-bold text-xs uppercase">
        Sign In / Join
      </button>
    {% else %}
      <div class="text-right">
        <span class="text-white font-bold text-xs">{{ user_profile.username }}</span>
      </div>
    {% endif %}
  </div>
</header>`,
    },
    'bottom_nav.html': {
      path: 'templates/home/components/bottom_nav.html',
      language: 'django-html',
      content: `{% load static %}
<nav class="epitch-bottom-nav fixed bottom-0 left-0 right-0 z-50 px-2 py-1.5 backdrop-blur-2xl bg-[#070a10]/90 border-t border-white/10 safe-area-bottom">
  <div class="max-w-md mx-auto grid grid-cols-5 items-center gap-1 text-center">
    <a href="{% url 'home:index' %}" class="text-[#00ff87]">Home</a>
    <a href="#arena">Arena</a>
    <a href="#tactics" class="py-1 px-1 rounded-2xl bg-gradient-to-tr from-[#00ff87] to-[#00e5ff] text-black font-bold">Tactics</a>
    <a href="#cups">Cups</a>
    <a href="#spectator">Live</a>
  </div>
</nav>`,
    },
    'settings.py': {
      path: 'core/settings.py',
      language: 'python',
      content: `# core/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'epitch_db',
        'USER': 'epitch_user',
        'PASSWORD': 'epitch_pass',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'`,
    },
  };

  const current = files[activeFile];

  const handleCopy = () => {
    navigator.clipboard?.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b1017] border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#0e1622] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-[#00ff87]" />
            <div>
              <h2 className="font-display font-bold text-base text-white">
                Django Backend & Template Source (Phase 1 Home)
              </h2>
              <p className="text-xs text-slate-400">
                Native static asset serving & future-proof Auth hook architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* File Tabs */}
        <div className="px-4 pt-3 bg-[#080d14] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {Object.keys(files).map((fileKey) => (
              <button
                key={fileKey}
                onClick={() => setActiveFile(fileKey)}
                className={`px-3 py-1.5 rounded-t-lg text-xs font-mono font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeFile === fileKey
                    ? 'bg-[#0e1622] text-[#00ff87] border-t-2 border-[#00ff87] font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{fileKey}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#00ff87]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 bg-[#080d14] flex-1 overflow-y-auto">
          <div className="text-[11px] font-mono text-slate-500 mb-2">
            File path: {current.path}
          </div>
          <pre className="font-mono text-xs text-emerald-300/90 leading-relaxed overflow-x-auto p-3 bg-black/60 rounded-xl border border-slate-800">
            <code>{current.content}</code>
          </pre>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0e1622] border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#00ff87] text-black font-display font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-300 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
