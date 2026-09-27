# Reflection

1. What did you ask Copilot to help you build? How did you break down the problem?

I started with a basic HTML/CSS/JS structure for a photo feed — a top bar, a stories row, and a scrollable list of posts with a like button, a photo, and a comment section. Once that baseline worked, I added features one at a time instead of asking for everything at once:
A dark mode toggle that switches a data-theme attribute and persists the choice with localStorage.
A clickable username that opens a small profile panel showing a follower count and a Follow/Following button.
A "new post" modal triggered by the + button, so I could write a caption and have it appear at the top of the feed.
Breaking it into these three separate, scoped requests made each change easy to test in isolation before moving to the next one — see DOCUMENTED_INTERACTIONS.md for the exact prompts and what each one changed.


2. How did your approach to asking questions change as you worked?

My first prompts described what I wanted at a high level ("add a dark mode toggle"). As I went on, I got more specific about how — for example, telling it to use CSS custom properties so the whole page would re-theme automatically instead of hardcoding colors in multiple places, or specifying that the follower count needed to update live when the Follow button was clicked. Being explicit about the underlying approach (not just the visible feature) saved a round of back-and-forth compared to my first, vaguer prompt.


3. What parts of the development process surprised you?

How much a small, well-scoped prompt could produce in one pass — asking for one clear feature at a time consistently returned something close to usable, while I suspect a single "build the whole feed" prompt would have needed much more correction afterward. I was also surprised by how much existing structure (the CSS variables set up early for the theme) made later features, like the modal and the follow panel, faster to style consistently.


4. What did you learn about the technology you used that you didn't know before?

Using CSS custom properties (--bg, --text, etc.) defined once in :root and then overridden under a [data-theme="dark"] selector is a clean way to support a full theme switch without duplicating styles per component. I also hadn't used the HTML <template> element before — cloning it in JavaScript to stamp out repeated post markup kept the JavaScript free of large strings of inline HTML.


5. What would you do differently if you had to build this again?

I'd plan the data shape (the posts array's fields) before writing any UI, since I ended up adding fields like followers and following after the fact, which meant revisiting the render function each time. I'd also build the "new post" flow earlier, since testing new features against a feed that could grow made it easier to catch layout issues than testing against a fixed set of three posts.

# Chat Exchanges 

1. ✅ Dark mode is in place

I updated the theme flow in:

index.html
style.css
app.js
What changed
Added a theme toggle in the top bar.
Switched the whole app via document.body.dataset.theme = "dark" | "light".
Centralized colors in CSS custom properties so the feed, stories, posts, and header all re-theme together.
Saved the user preference in localStorage so it persists across reloads.

2. ✅ Username popovers added

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

3. ✅ Make a post as a user added

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

