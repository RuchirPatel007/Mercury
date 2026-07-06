from rest_framework import routers
from .views import ProductViewSet, ColorViewSet, CategoryViewSet, ContactViewSet, NewsViewSet, CartViewSet
router = routers.DefaultRouter()
router.register(r'product', ProductViewSet)
router.register(r'color', ColorViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'news', NewsViewSet)
router.register(r'contact', ContactViewSet)
router.register(r'cart', CartViewSet)
urlpatterns = router.urls