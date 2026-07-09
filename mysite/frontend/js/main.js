// mercury frontend :: shared chrome (nav/footer) + small shared helpers

const ICONS = {
  speed: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M12 3a9 9 0 1 0 9 9" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 12L17 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  range: '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 21c4-5 7-8.5 7-12a7 7 0 0 0-14 0c0 3.5 3 7 7 12z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  battery: '<svg viewBox="0 0 24 24" width="14" height="14"><rect x="2" y="8" width="17" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="20" y="10.5" width="2" height="3" fill="currentColor"/><rect x="4" y="10" width="9" height="4" fill="currentColor"/></svg>',
  charge: '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="currentColor"/></svg>',
  payload: '<svg viewBox="0 0 24 24" width="14" height="14"><rect x="4" y="8" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 8V6a4 4 0 0 1 8 0v2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  gps: '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="3" fill="currentColor"/><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="1.6"/></svg>',
  cart: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 8H6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="21" r="1.4" fill="currentColor"/><circle cx="18" cy="21" r="1.4" fill="currentColor"/></svg>',
};

function specChip(icon, value, unit) {
  return `<span class="chip"><span class="chip-icon">${ICONS[icon]}</span><span class="chip-value">${value}</span><span class="chip-unit">${unit}</span></span>`;
}

function renderChrome() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const page = document.body.dataset.page || '';
  const loggedIn = Auth.isLoggedIn();
  const user = Auth.getUser();

  if (header) {
    header.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="brand"><span class="brand-dot"></span>MERCURY</a>
        <nav class="nav-links">
          <a href="index.html" class="${page === 'home' ? 'active' : ''}">Home</a>
          <a href="products.html" class="${page === 'products' || page === 'product' ? 'active' : ''}">Fleet</a>
          <a href="news.html" class="${page === 'news' ? 'active' : ''}">Dispatch</a>
          <a href="contact.html" class="${page === 'contact' ? 'active' : ''}">Contact</a>
        </nav>
        <div class="nav-actions">
          ${loggedIn
            ? `<span class="nav-user">${user && user.username ? user.username : 'account'}</span><button id="logout-btn" class="btn-ghost small">Log out</button>`
            : `<a href="login.html" class="btn-ghost small">Log in</a>`}
          <a href="cart.html" class="cart-link">${ICONS.cart}<span id="cart-count" class="cart-badge">0</span></a>
        </div>
      </div>`;
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => Auth.logout());
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-brand"><span class="brand-dot"></span>MERCURY</div>
        <div class="footer-links">
          <a href="products.html">Fleet</a>
          <a href="news.html">Dispatch</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-note">Flight-tested hardware, shipped worldwide.</div>
      </div>`;
  }

  Cart.updateBadge();
}

document.addEventListener('DOMContentLoaded', renderChrome);
