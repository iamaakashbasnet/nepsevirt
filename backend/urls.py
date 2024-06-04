from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('v1.accounts.urls')),
    path('data/', include('v1.data.urls')),
    path('portfolio/', include('v1.portfolio.urls')),
    path('trade/', include('v1.trade.urls')),
    path('officialapi/', include('v1.officialapi.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
