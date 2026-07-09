from django.contrib import admin
from .models import Contact, News, Color, Category, Product, Cart, Order, OrderItem, Payment
from rest_framework.authtoken.admin import TokenAdmin

admin.site.register(Contact)
admin.site.register(News)
admin.site.register(Color)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Payment)

TokenAdmin.raw_id_fields = ['user']