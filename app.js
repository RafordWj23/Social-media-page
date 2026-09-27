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
    caption: "Attempt #4 at sourdough. Getting closer.",
    comments: []
  }
];

// ---------- Rendering ----------
const feedEl = document.getElementById("posts");
const template = document.getElementById("post-template");

function renderPost(post) {
  const node = template.content.cloneNode(true);
  const article = node.querySelector(".post");
  article.dataset.id = post.id;

  const avatar = node.querySelector(".post-avatar");
  avatar.textContent = post.initials;
  avatar.style.setProperty("--c1", post.c1);
  avatar.style.setProperty("--c2", post.c2);

  node.querySelector(".post-user").textContent = post.user;
  node.querySelector(".post-loc").textContent = post.location;

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
