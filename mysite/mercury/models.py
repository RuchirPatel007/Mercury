from django.db import models
import datetime
from django.contrib.auth.models import User
# Create your models here.

class Color(models.Model):
    name = models.CharField(max_length=30)
    hex_code = models.CharField(max_length=7)

    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=50)
    about = models.TextField()
    speed = models.IntegerField()
    range_min = models.IntegerField()
    range_max = models.IntegerField()
    battery = models.IntegerField()
    charging_time = models.IntegerField()
    playload = models.IntegerField()
    gps = models.BooleanField(default=False)
    image = models.ImageField()
    price= models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    colours = models.ManyToManyField(Color)

    def __str__(self):
        return self.name

class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254, unique=True)
    phone = models.CharField(max_length=50)
    budget = models.CharField(max_length=100)
    message = models.TextField()

    def __str__(self):
        return self.name

class News(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField()
    date = models.DateField()
    content = models.TextField()
    author = models.CharField(max_length=50)

    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    product = models.ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name