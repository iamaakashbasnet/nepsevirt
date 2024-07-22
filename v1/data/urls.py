from django.urls import path

from .views.live_market import (
    GetLiveMarketDataView,
    IsMarketOpenView,
    SecurityListView,
    SecurityDataListView,
    SecurityDetailView,
)
from .views.live_indices import (
    MainIndicesView,
    SubIndicesView,
)
from .views.historic_data import OHLCDataView


urlpatterns = [
    path('get-live-data/', GetLiveMarketDataView.as_view(), name='get-live-data'),

    path('is-market-open/', IsMarketOpenView.as_view(), name='is-market-open'),

    path('live-market/', SecurityDataListView.as_view(), name='live-market'),

    path('securities/', SecurityListView.as_view(),
         name='securities'),

    path('securities/<int:id>/',
         SecurityDetailView.as_view(), name='securities-detail'),

    path('ohlc-data/<str:security>/',
         OHLCDataView.as_view(), name='ohlc-data'),

    path('main-indices/', MainIndicesView.as_view(), name='main-indices'),

    path('sub-indices/', SubIndicesView.as_view(), name='sub-indices')
]
