from django.contrib import admin
from .models import Contact, News, Color, Category, Product

admin.site.register(Contact)
admin.site.register(News)
admin.site.register(Color)
admin.site.register(Category)
admin.site.register(Product)