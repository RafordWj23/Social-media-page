
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

✅ Username popovers added
Each post’s username is now clickable and opens a small popover with:

the profile’s follower count
a Follow/Following toggle
independent per-post state that updates immediately when clicked
Updated in:

index.html
style.css
app.js
Verified behavior
I checked in the browser:

the username button opens the popover
the toggle switches between Follow and Following
the follower count updates from 18,400 followers to 18,401 followers on toggle
