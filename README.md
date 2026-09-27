# Social-media-page
generic social-media photo feed

# Snapfeed
A basic photo-feed app built with plain HTML, CSS, and JavaScript — no frameworks, no build step. It recreates the core interactions of a social media feed: stories, posts, likes, comments, profile follow toggles, and posting new content.

# Features
Feed of posts — each with an avatar, username, location, photo, caption, and comment thread
Stories bar — horizontally scrollable avatar row with gradient rings
Like a post — click the heart icon, or double-click/double-tap the photo for the classic like-flash animation
Save a post — bookmark toggle on each post
Follower panel — click a username to see their follower count and toggle Follow / Following
Comments — add a comment to any post; it appears instantly
New post modal — click the + button, write a caption, and share a new post to the top of the feed
Dark mode — toggle in the top bar; the choice is remembered between visits (localStorage)

# Tech stack
HTML5 (<template> element for post rendering)
CSS3 (custom properties for theming, flexbox/grid layout, CSS animations)
Vanilla JavaScript (event delegation, no dependencies)

# Installation
No build tools or package manager required.
1. Clone the repository:
bash
   git clone YOUR_REPO_URL
   cd YOUR_REPO_FOLDER
2. Open index.html directly in a browser, or serve it locally:
bash
   python3 -m http.server 8000
then visit http://localhost:8000.

# Usage
Like a post — click the heart under a post, or double-click the photo
Comment — type in the comment box under a post and press Post (or Enter)
Follow someone — click their username to open their profile panel, then click Follow
Create a post — click the + icon in the top bar, write a caption, and click Share
Switch theme — click the circle icon (◐) in the top bar to toggle dark mode

# Project structure
.
├── index.html                 # Page structure and post template
├── style.css                  # All styling, including dark theme variables
├── app.js                     # Rendering, state, and event handling
├── REFLECTION.md # Log of AI-assisted changes made to this project
└── REFLECTION.md              # Reflection on the AI-collaboration process

# Notes
Post data is sample data hard-coded in app.js — there is no backend or persistence beyond the theme preference, so new posts, likes, and comments reset on page reload.
