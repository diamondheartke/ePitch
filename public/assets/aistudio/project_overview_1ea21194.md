# ⚽ eFootball / PES Social Media Platform
**System Architecture, Feature Specifications, and Technical Roadmap**

---

## 1. Project Vision & Architecture Overview

The goal of this project is to build a high-performance, community-driven social networking and tournament hosting platform custom-built for eFootball (PES) players across Mobile, Console, and PC. 

The application uses a server-rendered backend with lightweight frontend interactivity to keep development fast, clean, and easy to maintain.

```
       +-------------------------------------------------------------+
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
    +-------------------+   +------------------+   +-------------------+
```

---

## 2. Tech Stack Breakdown

| Layer | Technology | Key Responsibility |
| :--- | :--- | :--- |
| **Frontend** | HTML5, Tailwind CSS, Alpine.js | UI layout, responsive styling, and lightweight reactivity without heavy SPA overhead. |
| **Backend** | Python (Django Framework) | Core application logic, business rules, routing, ORM, and template rendering. |
| **Real-time Engine** | Django Channels + WebSockets / WebRTC | Live chat messaging, real-time match status updates, and peer-to-peer screen streaming. |
| **Database** | MariaDB / MySQL | Relational data persistence (Users, Tournaments, Matches, Posts, Interactions). |
| **Authentication** | Firebase Auth | Secure social and email logins, handling client-side JWT generation. |
| **Media Storage** | Cloudinary | Cloud-based media storage and automated video/image optimization and delivery. |

---

## 3. Core Feature Specifications

### 3.1 Media Sharing & Feed
* **Highlight Clips:** Video player tailored for 15–60 second goal highlights, skill moves, and match summaries.
* **Squad Showcases:** Special post types designed to display squad formations, ratings, player cards, and custom tactical setups.
* **Interactive Feed:** Like, comment, share, and filter posts by platform (`#Mobile`, `#PlayStation`, `#Xbox`, `#PC`) or category (`#Goals`, `#Tactics`, `#Recruitment`).

### 3.2 In-App Spectator Mode (Native WebRTC)
To allow users to stream gameplay directly within the platform without external applications:
* **Host Broadcaster:** Host uses the browser’s native `navigator.mediaDevices.getDisplayMedia()` Screen Capture API to stream their live match screen directly from their PC or mobile browser session.
* **Peer-to-Peer WebRTC:** Direct video stream routing using WebSockets for signaling.
* **In-App Viewer Experience:** Spectators join a match lobby on the site where an HTML5 `<video>` element plays the live stream with sub-second latency.

### 3.3 Automated Tournament Hub
* **Tournament Formats:** Single Elimination (Knockout), Double Elimination, Round-Robin Leagues, and Group Stage + Knockout.
* **Automated Matchmaking:** Bracket generation with pre-filled player seeds.
* **Dispute Resolution:** Both players upload post-match screenshots showing final scores. Django ORM records reported scores; admin flagged if discrepancies occur.

### 3.4 Messaging & Social Connectivity
* **1v1 Direct Messages:** Private messaging rooms for sending match room codes, passwords, and friendly challenges.
* **Clan / Group Chats:** Group lobbies for eFootball clans, esports teams, and community leagues.
* **Real-time Notifications:** WebSockets deliver instant alerts for match invitations, score confirmations, and tournament round starts.

---

## 4. Key Django Data Models

Below is the conceptual representation of the main database models for the platform.

```python
# models.py (Conceptual Overview)

from django.db import models

class UserProfile(models.Model):
    firebase_uid = models.CharField(max_length=128, unique=True)
    username = models.CharField(max_length=50, unique=True)
    bio = models.TextField(blank=True, max_length=250)
    avatar_url = models.URLField(blank=True)
    primary_platform = models.CharField(max_length=20, choices=[
        ('mobile', 'Mobile'),
        ('psn', 'PlayStation'),
        ('xbox', 'Xbox'),
        ('pc', 'PC')
    ])
    efootball_id = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Post(models.Model):
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField(max_length=1000)
    media_url = models.URLField(blank=True, null=True)
    media_type = models.CharField(max_length=10, choices=[('image', 'Image'), ('video', 'Video'), ('none', 'None')], default='none')
    created_at = models.DateTimeField(auto_now_add=True)

class Tournament(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    format = models.CharField(max_length=20, choices=[('knockout', 'Knockout'), ('league', 'League')])
    max_participants = models.IntegerField(default=16)
    start_date = models.DateTimeField()
    organizer = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, null=True, blank=True)
    player1 = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='matches_as_p1')
    player2 = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='matches_as_p2')
    player1_score = models.IntegerField(null=True, blank=True)
    player2_score = models.IntegerField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    live_stream_active = models.BooleanField(default=False)
    stream_room_id = models.CharField(max_length=100, blank=True, null=True)
```

---

## 5. Development Roadmap

### Phase 1: Core Setup & Authentication (Weeks 1–2)
- Configure Django project with MariaDB database settings.
- Integrate Firebase Web Auth SDK into frontend Django templates.
- Build Django middleware to authenticate incoming Firebase JWT tokens.

### Phase 2: User Profiles & Media Feed (Weeks 3–4)
- Set up Cloudinary integration for image and video media uploads.
- Build feed UI with Alpine.js and Tailwind CSS.
- Implement post creation, liking, and comment logic.

### Phase 3: Direct Messaging & Clans (Weeks 5–6)
- Integrate Django Channels for WebSockets support.
- Build 1v1 chat interfaces for arranging game lobbies.
- Create group chat functionality for clan discussions.

### Phase 4: Tournament Infrastructure (Weeks 7–8)
- Build bracket creation and automated seed generation algorithms.
- Add score reporting and screenshot verification tools.
- Implement leaderboards and user achievement badges.

### Phase 5: In-App Spectator Mode & Optimization (Weeks 9–10)
- Implement WebRTC signaling server using Django Channels.
- Build native screen sharing broadcast UI for host players.
- Polish frontend styles, optimize video loading times, and run beta testing.