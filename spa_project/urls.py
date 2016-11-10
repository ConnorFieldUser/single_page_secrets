from django.conf.urls import url
from django.contrib import admin
from rest_framework.authtoken import views

from app.views import IndexView

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', IndexView.as_view(), name="index_view"),
    url(r'^obtain_token/', views.obtain_auth_token, name="obtain_auth_token")
]
