// mercury frontend :: thin wrapper around fetch for the DRF backend

const Api = {
  async request(path, { method = 'GET', body, auth = false, root = false } = {}) {
    const base = root ? CONFIG.SITE_BASE : CONFIG.API_BASE;
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
      const token = Auth.getToken();
      if (token) headers['Authorization'] = `Token ${token}`;
    }
    let res;
    try {
      res = await fetch(`${base}${path}`, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (err) {
      throw { status: 0, detail: 'Could not reach the server. Is the Django backend running and reachable at ' + base + '?' };
    }
    if (!res.ok) {
      let detail;
      try { detail = await res.json(); } catch (e) { detail = null; }
      throw { status: res.status, detail };
    }
    if (res.status === 204) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  },
  get(path, opts) { return this.request(path, { ...opts, method: 'GET' }); },
  post(path, body, opts) { return this.request(path, { ...opts, method: 'POST', body }); },
  patch(path, body, opts) { return this.request(path, { ...opts, method: 'PATCH', body }); },
  del(path, opts) { return this.request(path, { ...opts, method: 'DELETE' }); },
};

// Turns a relative /media/... path from the backend into a full URL
function mediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${CONFIG.SITE_BASE}${path}`;
}

function friendlyError(err) {
  if (!err) return 'Something went wrong.';
  if (err.status === 0) return err.detail;
  if (err.detail && typeof err.detail === 'object') {
    const parts = [];
    for (const k in err.detail) {
      const v = err.detail[k];
      parts.push(`${k}: ${Array.isArray(v) ? v.join(' ') : v}`);
    }
    if (parts.length) return parts.join(' — ');
  }
  if (err.status === 401 || err.status === 403) return 'You need to be logged in to do that.';
  if (err.status === 404) return 'Not found.';
  return 'Something went wrong (status ' + err.status + ').';
}
