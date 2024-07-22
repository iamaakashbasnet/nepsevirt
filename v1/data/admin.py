from django.contrib import admin
from .models import Security, SecurityData


@admin.register(Security)
class SecurityAdmin(admin.ModelAdmin):
    list_display = ['securityName']
    list_filter = ['securityName']
    search_fields = ['securityName']
    ordering = ['securityName']


@admin.register(SecurityData)
class SecurityDataAdmin(admin.ModelAdmin):
    list_display = ['security', 'lastTradedPrice',
                    'openPrice', 'highPrice', 'lowPrice', 'previousClose']
    list_filter = ['security']
    search_fields = ['security']
    ordering = ['-lastUpdatedDateTime']
