from rest_framework import serializers

from .models import Enquiry, Submission


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ["id", "name", "contact", "message", "consent", "property", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate_consent(self, value):
        if value is not True:
            raise serializers.ValidationError("Please confirm you are happy to be contacted.")
        return value


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = [
            "id",
            "title",
            "purpose",
            "property_type",
            "neighbourhood",
            "price",
            "bedrooms",
            "contact",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]
