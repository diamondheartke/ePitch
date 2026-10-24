"""
ePitch - Home Application Views (apps/home/views.py)
Serves the Phase 1 Home Dashboard, user profile state (Guest vs Authenticated),
in-game currency metrics, and featured game mode card decks.
"""

from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET

def home_dashboard(request):
    """
    Renders the primary Android-optimized Glassmorphic Home Dashboard.
    Supports both guest visitors and authenticated users seamlessly.
    """
    # Context prepared for future authentication integration
    is_authenticated = request.user.is_authenticated if hasattr(request, 'user') else False
    
    if is_authenticated:
        user_profile = {
            'username': request.user.username,
            'is_guest': False,
            'efootball_id': getattr(request.user, 'efootball_id', 'EP-9028-1144'),
            'avatar_url': getattr(request.user, 'avatar_url', '/static/assets/images/UI/default-avatar.png'),
            'division': 'Division 1',
            'rating': 1940,
            'win_rate': '68%',
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
            'avatar_url': '/static/assets/images/UI/default-avatar.png',
            'division': 'Trial Division',
            'rating': 1200,
            'win_rate': '50%',
            'gp_currency': 50000,
            'ep_points': 250,
            'energy': 100,
            'max_energy': 100,
        }

    featured_modes = [
        {
            'id': 'mode-matchday',
            'title': 'MATCHDAY CLASH',
            'badge': 'LIVE EVENT',
            'badge_color': '#ff0055',
            'description': 'Real-time competitive matchmaking with weekend double Elo rewards.',
            'image_url': '/static/assets/images/UI/card-matchday.jpg',
            'accent': '#00ff87',
            'cta': 'ENTER ARENA',
            'active_players': '12,480 Online',
        },
        {
            'id': 'mode-squad',
            'title': 'TACTICAL SQUAD LAB',
            'badge': 'META 4-2-1-3',
            'badge_color': '#00e5ff',
            'description': 'Interactive pitch formation, player chemistry synergy, and custom tactics.',
            'image_url': '/static/assets/images/UI/card-squad.jpg',
            'accent': '#00e5ff',
            'cta': 'EDIT FORMATION',
            'team_strength': '3,140 OVR',
        },
        {
            'id': 'mode-tournaments',
            'title': 'MASTERS CUP S9',
            'badge': '$1,500 POOL',
            'badge_color': '#f59e0b',
            'description': '16-player single elimination bracket with automated score OCR validation.',
            'image_url': '/static/assets/images/UI/card-tournament.jpg',
            'accent': '#f59e0b',
            'cta': 'VIEW BRACKET',
            'status': 'Quarterfinals Live',
        },
        {
            'id': 'mode-spectator',
            'title': 'IN-APP WEBRTC ARENA',
            'badge': 'SUB-SECOND',
            'badge_color': '#ff0055',
            'description': 'Native browser screen capture streaming with sub-25ms latency & emoji reactions.',
            'image_url': '/static/assets/images/UI/card-spectator.jpg',
            'accent': '#00ff87',
            'cta': 'SPECTATE NOW',
            'viewers': '340+ Watching',
        },
    ]

    context = {
        'page_title': 'ePitch — Tactical Stadium & Home Dashboard',
        'user_profile': user_profile,
        'featured_modes': featured_modes,
        'active_tab': 'home',
    }
    return render(request, 'home/index.html', context)


@require_GET
def home_state_api(request):
    """
    JSON endpoint for Alpine.js / Vanilla JS clients to fetch real-time state.
    """
    return JsonResponse({
        'status': 'ok',
        'server': 'Django 5.x / Channels WebSockets',
        'system_ready': True,
        'database': 'MySQL / MariaDB Connected',
        'active_match_rooms': 84,
        'server_time': '2026-10-24T05:18:00Z',
    })
