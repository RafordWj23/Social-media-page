
✅ Dark mode is in place
I updated the theme flow in:

index.html
style.css
app.js
What changed
Added a theme toggle in the top bar.
Switched the whole app via document.body.dataset.theme = "dark" | "light".
Centralized colors in CSS custom properties so the feed, stories, posts, and header all re-theme together.
Saved the user preference in localStorage so it persists across reloads.
