from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/properties/", include("properties.urls")),
    path("api/", include("enquiries.urls")),
]
