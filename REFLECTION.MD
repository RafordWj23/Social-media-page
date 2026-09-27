
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

✅ Make a post as a user added
The + button in the top bar now opens a modal with a caption field, and submitting it adds a new post at the top of the feed using the current user’s avatar.

Updated files:

index.html
style.css
app.js
Verification
I verified this in the browser:

the modal opens from the top-bar + button
submitting a caption creates a new post at the top of the feed
the new post uses the JD avatar and the current user label
