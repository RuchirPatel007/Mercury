// mercury frontend :: local cart (no login required to browse/add)
// Cart lives in localStorage as [{product_id, quantity}]. It becomes a real
// Order (via the API) only at checkout.

const Cart = {
  KEY: 'mercury_cart',

  getItems() {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  },

  saveItems(items) {
    localStorage.setItem(this.KEY, JSON.stringify(items));
    this.updateBadge();
  },

  add(productId, quantity = 1) {
    const items = this.getItems();
    const existing = items.find((i) => i.product_id === productId);
    if (existing) existing.quantity += quantity;
    else items.push({ product_id: productId, quantity });
    this.saveItems(items);
  },

  updateQuantity(productId, quantity) {
    let items = this.getItems();
    if (quantity <= 0) {
      items = items.filter((i) => i.product_id !== productId);
    } else {
      const existing = items.find((i) => i.product_id === productId);
      if (existing) existing.quantity = quantity;
    }
    this.saveItems(items);
  },

  remove(productId) {
    const items = this.getItems().filter((i) => i.product_id !== productId);
    this.saveItems(items);
  },

  clear() {
    this.saveItems([]);
  },

  count() {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  },

  updateBadge() {
    const badge = document.getElementById('cart-count');
    if (badge) {
      const n = this.count();
      badge.textContent = n;
      badge.style.display = n > 0 ? 'inline-flex' : 'none';
    }
  },
};
