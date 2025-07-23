const bloglist = document.getElementById("bloglist");
const searchBar = document.getElementById("bar");
const filterButtons = document.querySelectorAll(".filters button");

const blogs = [
  { title: "My first blog", content: "This is the content of my first blog", category: "Sports" },
  { title: "My second blog", content: "This is the content of my second blog", category: "Health" },
  { title: "My third blog", content: "This is the content of my third blog", category: "Sports" },
  { title: "My fourth blog", content: "This is the content of my fourth blog", category: "Study" },
  { title: "My fifth blog", content: "This is the content of my fifth blog", category: "Study" }
];

let currentSearch = "";
let selectedCategory = "All";


function renderBlogs(blogArray) {
  if (blogArray.length === 0) {
    bloglist.innerHTML = "<p>No blogs found.</p>";
    return;
  }
  bloglist.innerHTML = blogArray.map(blog => `
    <div class="blog">
      <h2>${blog.title}</h2>
      <p>${blog.content}</p>
      <p>Category: ${blog.category}</p>
    </div>
  `).join('');
}


function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  }
}


function filterBlogs() {
  let filtered = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(currentSearch);
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderBlogs(filtered);
}

searchBar.addEventListener("keyup", debounce(e => {
  currentSearch = e.target.value.toLowerCase();
  filterBlogs();
}, 300));


filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedCategory = btn.getAttribute("data-category");
    filterBlogs();
  });
});

renderBlogs(blogs);