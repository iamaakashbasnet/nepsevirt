from django.urls import path

from .views.get_live_data import LiveData


urlpatterns = [
    path('live-data/', LiveData.as_view(), name='live-data'),
]
