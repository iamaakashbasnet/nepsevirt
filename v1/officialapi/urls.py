from django.urls import path

from .views.index import Test


urlpatterns = [
    path('test/', Test.as_view(), name='test'),
]
