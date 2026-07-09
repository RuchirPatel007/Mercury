# Mercury frontend

Plain HTML/CSS/JS storefront for the Mercury Django REST backend. No build step —
open the files in a browser or serve the folder with any static server.

## Running it

1. Start your Django backend: `python manage.py runserver` (defaults to `http://127.0.0.1:8000`).
2. Serve this folder with any static server, e.g.:
   ```
   cd frontend
   python -m http.server 5500
   ```
   then visit `http://127.0.0.1:5500`.
3. If your backend runs somewhere else, edit `js/config.js` (`SITE_BASE` / `API_BASE`).

## Two small backend additions needed

The frontend is complete, but two gaps in the current backend will block real
usage until you add them:

**1. CORS.** The frontend and Django run on different ports, so the backend needs
`django-cors-headers` (or `ALLOWED_HOSTS`/CORS config) to accept requests from the
frontend's origin. Quick version:
```
pip install django-cors-headers
```
```python
# settings.py
INSTALLED_APPS = [..., 'corsheaders']
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]  # put it near the top
CORS_ALLOWED_ORIGINS = ['http://127.0.0.1:5500', 'http://localhost:5500']
```

**2. A "current user" endpoint.** `/api-token-auth/` only returns a token, not the
user's id — but `Order` and `Cart` both require a `user` field in their serializer,
and neither view auto-assigns `request.user` on create. Without knowing the id,
the frontend can't create an order. Add this small endpoint:
```python
# mercury/views.py
class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({'id': request.user.id, 'username': request.user.username})
```
```python
# mercury/urls.py
router.register(...)
urlpatterns = router.urls + [path('me/', MeView.as_view())]
```
The login page already calls `/api/me/` after authenticating and will just show a
clear error at checkout until this exists.

*(Optional, not required to run: `Cart`/`Order`/`Payment` would also be cleaner if
their viewsets set `user`/`total` from `request.user` via `perform_create()`
instead of trusting the client to send them — the frontend currently sends them
explicitly to work around this.)*

## What's included

| Page | Notes |
|---|---|
| `index.html` | Hero + featured aircraft + latest dispatch |
| `products.html` | Full catalog, category filter, live search |
| `product.html?id=` | Spec/telemetry panel, colour swatches, add to cart |
| `cart.html` | Local cart (localStorage), qty edit, remove |
| `checkout.html` | Address form + Stripe card payment → creates Order/OrderItems/Payment |
| `login.html` | Token auth against `/api-token-auth/` |
| `news.html` / `news-detail.html` | News list + article |
| `contact.html` | Posts to `/api/contact/` |

The cart is stored in `localStorage` as a guest cart so people can browse and add
items without logging in; login is only required at checkout, matching the
backend's `IsAuthenticated` permissions on Order/Cart/Payment.

There's no sign-up page because the backend doesn't expose a registration
endpoint — accounts are created via Django admin today. The login page says as
much and points to the contact page.

Stripe is wired up with the test publishable key already in your `settings.py`,
using Stripe.js Elements (loaded from `js.stripe.com`) for the card form.
