"""Property listings. Demo rows stay labelled ``availability="demo"`` until verified."""

from django.db import models

PURPOSE_CHOICES = [
    ("rent", "For rent"),
    ("sale", "For sale"),
]

AVAILABILITY_CHOICES = [
    ("demo", "Demo — not confirmed"),
    ("verified", "Verified"),
]

NEIGHBOURHOODS = [
    "Masaki",
    "Oyster Bay",
    "Mikocheni",
    "Upanga",
    "Sinza",
    "Mbezi Beach",
    "Kigamboni",
]

PROPERTY_TYPES = ["apartment", "house", "villa", "studio", "office"]


class Property(models.Model):
    # Public slug doubles as the frontend id, e.g. "demo-masaki-01".
    slug = models.SlugField(max_length=80, unique=True)
    title = models.CharField(max_length=200)
    purpose = models.CharField(max_length=4, choices=PURPOSE_CHOICES)
    property_type = models.CharField(max_length=20)
    price = models.PositiveBigIntegerField(help_text="Price in Tanzanian shillings (TZS).")
    currency = models.CharField(max_length=3, default="TZS")
    # "month" for rent; blank for sale.
    price_period = models.CharField(max_length=10, blank=True, default="")
    neighbourhood = models.CharField(max_length=50)
    city = models.CharField(max_length=50, default="Dar es Salaam")
    bedrooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)
    area_sqm = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True, default="")
    # Simple lists kept as JSON to stay lean: ["Parking", ...] and
    # [{"src": ..., "alt": ..., "credit": ...}].
    amenities = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    availability = models.CharField(max_length=10, choices=AVAILABILITY_CHOICES, default="demo")
    agent_name = models.CharField(max_length=120, default="Agency contact", blank=True)
    agent_phone = models.CharField(max_length=40, blank=True, default="")
    agent_whatsapp = models.CharField(max_length=40, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at", "id"]

    def __str__(self):
        return f"{self.slug} — {self.title}"
