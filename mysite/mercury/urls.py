from rest_framework import routers
from .views import ProductViewSet, ColorViewSet, CategoryViewSet, ContactViewSet, NewsViewSet
router = routers.DefaultRouter()
router.register(r'product', ProductViewSet)
router.register(r'color', ColorViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'news', NewsViewSet)
router.register(r'contact', ContactViewSet)
urlpatterns = router.urls