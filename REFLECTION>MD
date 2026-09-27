What changed:
index.html — added a .theme-toggle button in the top bar icons.
style.css — added a :root[data-theme="dark"] block overriding the color variables (--bg, --surface, --border, --text, --text-dim, --accent, --accent-dim); added a background/color transition to body.
app.js — added applyTheme(), a check for a saved preference in localStorage (falling back to the OS prefers-color-scheme), and a click handler on the toggle button that flips the theme and saves it.
Why this approach: using CSS variables meant every element that already referenced var(--bg) / var(--text) etc. re-themed automatically — no need to touch each component's CSS individually.
