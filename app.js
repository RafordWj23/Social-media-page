// ---------- Sample data ----------
// In a real app this would come from a server. Here it's just an array
// so the feed has something to render.
const posts = [
  {
    id: 1,
    user: "maya_k",
    initials: "MK",
    c1: "#e0a13c", c2: "#a5482c",
    location: "Joshua Tree, CA",
    photoColors: ["#f4b183", "#c4483c"],
    likes: 128,
    followers: 18400,
    following: false,
    caption: "Golden hour never misses out here 🌵",
    comments: [
      { user: "theo.r", text: "This is stunning!" },
      { user: "sam_p", text: "Need to visit this place." }
    ]
  },
  {
    id: 2,
    user: "theo.r",
    initials: "TR",
    c1: "#3a7d7c", c2: "#1e4e4e",
    location: "Kyoto, Japan",
    photoColors: ["#6fb3b3", "#1e4e4e"],
    likes: 342,
    followers: 270500,
    following: true,
    caption: "Quietest street in the city, right before sunrise",
    comments: [
      { user: "lena.n", text: "The light in this 😍" }
    ]
  },
  {
    id: 3,
    user: "ravi.b",
    initials: "RB",
    c1: "#c47ba0", c2: "#7a3a5c",
    location: "Home kitchen",
    photoColors: ["#e0a9c4", "#7a3a5c"],
    likes: 76,
    followers: 6500,
    following: false,
    caption: "Attempt #4 at sourdough. Getting closer.",
    comments: []
  }
];

// ---------- Theme ----------
const THEME_KEY = "snapfeed-theme";
const themeToggle = document.querySelector(".theme-toggle");
const currentUser = {
  user: "you",
  initials: "JD",
  c1: "#3a7d7c",
  c2: "#1e4e4e",
  location: "Just now",
  followers: 2684,
  following: false
};

const newPostBtn = document.querySelector(".new-post-btn");
const newPostModal = document.getElementById("new-post-modal");
const newPostForm = document.getElementById("new-post-form");
const newPostCaption = document.getElementById("new-post-caption");
const modalCloseBtn = document.querySelector(".modal-close");
const modalCancelBtn = document.querySelector(".modal-cancel");

function openNewPostModal() {
  newPostModal.classList.remove("hidden");
  newPostModal.setAttribute("aria-hidden", "false");
  newPostCaption.focus();
}

function closeNewPostModal() {
  newPostModal.classList.add("hidden");
  newPostModal.setAttribute("aria-hidden", "true");
  newPostForm.reset();
}

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = selectedTheme;

  if (themeToggle) {
    const isDark = selectedTheme === "dark";
    themeToggle.textContent = isDark ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }

  try {
    localStorage.setItem(THEME_KEY, selectedTheme);
  } catch (error) {
    console.warn("Could not save theme preference", error);
  }
}

function initializeTheme() {
  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    applyTheme(initialTheme);
  } catch (error) {
    applyTheme("light");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

if (newPostBtn) {
  newPostBtn.addEventListener("click", openNewPostModal);
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", closeNewPostModal);
}

if (modalCancelBtn) {
  modalCancelBtn.addEventListener("click", closeNewPostModal);
}

if (newPostModal) {
  newPostModal.addEventListener("click", (e) => {
    if (e.target.dataset.closeModal === "true") {
      closeNewPostModal();
    }
  });
}

if (newPostForm) {
  newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const caption = newPostCaption.value.trim();
    if (!caption) {
      newPostCaption.focus();
      return;
    }

    const newPost = {
      id: Date.now(),
      user: currentUser.user,
      initials: currentUser.initials,
      c1: currentUser.c1,
      c2: currentUser.c2,
      location: currentUser.location,
      photoColors: ["#d8ebf3", "#3a7d7c"],
      likes: 0,
      followers: currentUser.followers,
      following: currentUser.following,
      caption,
      comments: []
    };

    posts.unshift(newPost);
    feedEl.prepend(renderPost(newPost));
    closeNewPostModal();
  });
}

initializeTheme();

// ---------- Rendering ----------
const feedEl = document.getElementById("posts");
const template = document.getElementById("post-template");

function formatFollowers(value) {
  return `${value.toLocaleString()} followers`;
}

function closeUserPopovers() {
  document.querySelectorAll(".user-popover").forEach(popover => {
    popover.hidden = true;
    const trigger = popover.closest(".post-user-wrap")?.querySelector(".post-user-btn");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
  });
}

function updateUserPopover(article, post) {
  const trigger = article.querySelector(".post-user-btn");
  const popover = article.querySelector(".user-popover");
  const name = article.querySelector(".user-popover-name");
  const followerCount = article.querySelector(".user-follower-count");
  const followBtn = article.querySelector(".user-follow-btn");

  trigger.textContent = post.user;
  name.textContent = post.user;
  followerCount.textContent = formatFollowers(post.followers);
  followBtn.textContent = post.following ? "Following" : "Follow";
  followBtn.classList.toggle("following", post.following);
  followBtn.setAttribute("aria-pressed", String(post.following));
  popover.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
}

function renderPost(post) {
  const node = template.content.cloneNode(true);
  const article = node.querySelector(".post");
  article.dataset.id = post.id;

  const avatar = node.querySelector(".post-avatar");
  avatar.textContent = post.initials;
  avatar.style.setProperty("--c1", post.c1);
  avatar.style.setProperty("--c2", post.c2);

  node.querySelector(".post-loc").textContent = post.location;
  updateUserPopover(article, post);

  const photo = node.querySelector(".post-photo");
  photo.style.background = `linear-gradient(135deg, ${post.photoColors[0]}, ${post.photoColors[1]})`;

  const captionEl = node.querySelector(".post-caption");
  captionEl.innerHTML = `<span class="post-user-inline">${post.user}</span>${post.caption}`;

  updateLikeCount(node, post.likes);
  renderComments(node, post.comments);

  return node;
}

function updateLikeCount(scope, count) {
  const likesEl = scope.querySelector(".post-likes");
  likesEl.textContent = `${count.toLocaleString()} likes`;
}

function renderComments(scope, comments) {
  const list = scope.querySelector(".post-comments");
  list.innerHTML = "";
  comments.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${c.user}</b>${c.text}`;
    list.appendChild(li);
  });
}

posts.forEach(post => feedEl.appendChild(renderPost(post)));

// ---------- Interactions (event delegation on the feed) ----------

feedEl.addEventListener("click", (e) => {
  const article = e.target.closest(".post");
  if (!article) return;
  const post = posts.find(p => p.id === Number(article.dataset.id));

  if (e.target.closest(".post-user-btn")) {
    const popover = article.querySelector(".user-popover");
    const isOpen = !popover.hidden;
    closeUserPopovers();
    if (!isOpen) {
      popover.hidden = false;
      article.querySelector(".post-user-btn").setAttribute("aria-expanded", "true");
    }
    return;
  }

  if (e.target.closest(".user-follow-btn")) {
    post.following = !post.following;
    post.followers += post.following ? 1 : -1;
    updateUserPopover(article, post);
    return;
  }

  if (!e.target.closest(".post-user-wrap") && !e.target.closest(".user-popover")) {
    closeUserPopovers();
  }

  // Like button
  if (e.target.closest(".like-btn")) {
    toggleLike(article, post);
  }

  // Save button
  if (e.target.closest(".save-btn")) {
    e.target.closest(".save-btn").classList.toggle("saved");
  }

  // Focus the comment input when the comment icon is clicked
  if (e.target.closest(".comment-btn")) {
    article.querySelector(".comment-input").focus();
  }
});

feedEl.addEventListener("dblclick", (e) => {
  const photo = e.target.closest(".post-photo");
  if (!photo) return;
  const article = photo.closest(".post");
  const post = posts.find(p => p.id === Number(article.dataset.id));

  if (!article.querySelector(".like-btn").classList.contains("liked")) {
    toggleLike(article, post);
  }
  flashHeart(photo);
});

function toggleLike(article, post) {
  const btn = article.querySelector(".like-btn");
  const isLiked = btn.classList.toggle("liked");
  btn.textContent = isLiked ? "♥" : "♡";
  post.likes += isLiked ? 1 : -1;
  updateLikeCount(article, post.likes);
}

function flashHeart(photo) {
  const heart = photo.querySelector(".post-like-flash");
  heart.classList.remove("flash");
  // Force reflow so the animation can restart if triggered again quickly.
  void heart.offsetWidth;
  heart.classList.add("flash");
}

// ---------- Comment form handling ----------

feedEl.addEventListener("input", (e) => {
  if (!e.target.classList.contains("comment-input")) return;
  const form = e.target.closest(".comment-form");
  form.querySelector(".comment-post").classList.toggle("active", e.target.value.trim().length > 0);
});

feedEl.addEventListener("submit", (e) => {
  if (!e.target.classList.contains("comment-form")) return;
  e.preventDefault();

  const article = e.target.closest(".post");
  const post = posts.find(p => p.id === Number(article.dataset.id));
  const input = e.target.querySelector(".comment-input");
  const text = input.value.trim();
  if (!text) return;

  post.comments.push({ user: "you", text });
  renderComments(article, post.comments);

  input.value = "";
  e.target.querySelector(".comment-post").classList.remove("active");
});
