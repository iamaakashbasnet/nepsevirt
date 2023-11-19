from django.contrib import admin
from .models import StockName, StockData


@admin.register(StockName)
class StockNameAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
    search_fields = ['name']
    ordering = ['name']


@admin.register(StockData)
class StockDataAdmin(admin.ModelAdmin):
    list_display = ['name', 'open', 'high', 'low', 'close']
    list_filter = ['name']
    search_fields = ['name']
    ordering = ['name']
