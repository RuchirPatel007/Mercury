// mercury frontend :: auth state
// NOTE: the backend's /api-token-auth/ endpoint only returns a token, not the
// user's id. Order/Cart records require a user id. This file tries to fetch
// it from /api/me/ — see the README for the tiny backend addition needed.

const Auth = {
  getToken() { return localStorage.getItem('mercury_token'); },
  setToken(t) { localStorage.setItem('mercury_token', t); },
  clearToken() {
    localStorage.removeItem('mercury_token');
    localStorage.removeItem('mercury_user');
  },
  getUser() {
    const u = localStorage.getItem('mercury_user');
    return u ? JSON.parse(u) : null;
  },
  setUser(u) { localStorage.setItem('mercury_user', JSON.stringify(u)); },
  isLoggedIn() { return !!this.getToken(); },

  async login(username, password) {
    const data = await Api.post('/api-token-auth/', { username, password }, { root: true });
    this.setToken(data.token);
    // Try to resolve the logged-in user's id (needed for Order/Cart).
    try {
      const me = await Api.get('/me/', { auth: true });
      this.setUser({ id: me.id, username: me.username });
    } catch (err) {
      // /api/me/ isn't set up on the backend yet — see README.
      this.setUser({ id: null, username });
    }
    return this.getUser();
  },

  logout() {
    this.clearToken();
    window.location.href = 'index.html';
  },
};
