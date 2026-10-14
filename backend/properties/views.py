import django_filters
from rest_framework import viewsets

from .models import Property
from .serializers import PropertySerializer


class PropertyFilter(django_filters.FilterSet):
    bedrooms_min = django_filters.NumberFilter(field_name="bedrooms", lookup_expr="gte")
    price_min = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    price_max = django_filters.NumberFilter(field_name="price", lookup_expr="lte")

    class Meta:
        model = Property
        fields = ["purpose", "property_type", "neighbourhood", "availability"]


class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = "slug"
    filterset_class = PropertyFilter
    ordering_fields = ["price", "created_at"]
    search_fields = ["title", "description", "neighbourhood"]
