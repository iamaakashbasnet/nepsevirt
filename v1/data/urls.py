from django.urls import path

from .views.get_live_data import (
    FetchLiveData,
    LiveDataListView,
    LiveDataStockNameListView,
    StockDetailView,
)

urlpatterns = [
    path('fetch-live-data/', FetchLiveData.as_view(), name='fetch-live-data'),
    path('live-data/', LiveDataListView.as_view(), name='live-data'),
    path('live-data-stockname/', LiveDataStockNameListView.as_view(),
         name='live-data-stockname'),
    path('stock-detail/<int:id>/', StockDetailView.as_view(), name='stock-detail')
]
