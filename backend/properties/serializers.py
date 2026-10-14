from rest_framework import serializers

from .models import Property


class PropertySerializer(serializers.ModelSerializer):
    # Frontend addresses listings by this id (e.g. "demo-masaki-01").
    id = serializers.CharField(source="slug", read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "slug",
            "title",
            "purpose",
            "property_type",
            "price",
            "currency",
            "price_period",
            "neighbourhood",
            "city",
            "bedrooms",
            "bathrooms",
            "area_sqm",
            "description",
            "amenities",
            "images",
            "availability",
            "agent_name",
            "agent_phone",
            "agent_whatsapp",
        ]
