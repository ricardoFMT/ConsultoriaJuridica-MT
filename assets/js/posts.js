async function loadPosts() {
  try {
    const response = await fetch('assets/data/posts.json');
    if (!response.ok) {
      throw new Error('Não foi possível carregar os artigos.');
    }
    const posts = await response.json();
    renderPosts(posts);
  } catch (error) {
    renderError(error.message);
  }
}

function renderPosts(posts) {
  const latestContainer = document.getElementById('latest-posts');
  const blogList = document.getElementById('blog-list');
  const createPostCard = (post) => {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.innerHTML = `
      <div class="post-card__media" role="img" aria-label="${post.imageAlt}">${post.imagePlaceholder}</div>
      <div class="post-card__content">
        <div class="post-card__meta">
          <span>${new Date(post.date).toLocaleDateString('pt-BR')}</span>
          <span>${post.category}</span>
        </div>
        <h3 class="post-card__title">${post.title}</h3>
        <p class="post-card__excerpt">${post.excerpt}</p>
        <a class="card-link" href="${post.url}" aria-label="Ler artigo ${post.title}">Ler artigo completo</a>
      </div>
    `;
    return article;
  };

  if (latestContainer) {
    const latestPosts = posts.slice(0, 3);
    latestContainer.className = 'cards-grid';
    latestPosts.forEach((post) => latestContainer.appendChild(createPostCard(post)));
  }

  if (blogList) {
    blogList.innerHTML = '';
    const listWrapper = document.createElement('div');
    listWrapper.className = 'blog-list';
    posts.forEach((post) => listWrapper.appendChild(createPostCard(post)));
    blogList.appendChild(listWrapper);
  }
}

function renderError(message) {
  const latestContainer = document.getElementById('latest-posts');
  const blogList = document.getElementById('blog-list');
  if (latestContainer) {
    latestContainer.innerHTML = `<p>${message}</p>`;
  }
  if (blogList) {
    blogList.innerHTML = `<p>${message}</p>`;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadPosts);
} else {
  loadPosts();
}
