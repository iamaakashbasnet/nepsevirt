from django.contrib import admin
from .models import Security, SecurityData


@admin.register(Security)
class StockNameAdmin(admin.ModelAdmin):
    list_display = ['securityName']
    list_filter = ['securityName']
    search_fields = ['securityName']
    ordering = ['securityName']


@admin.register(SecurityData)
class StockDataAdmin(admin.ModelAdmin):
    list_display = ['security', 'lastTradedPrice',
                    'openPrice', 'highPrice', 'lowPrice', 'previousClose']
    list_filter = ['security']
    search_fields = ['security']
    ordering = ['security']
