"""Seed the database with the same demo listings as the frontend.

Idempotent: re-running updates existing rows instead of duplicating them.
Every row stays ``availability="demo"`` until the owner verifies it.
"""

from django.core.management.base import BaseCommand

from properties.models import Property

DEMO = [
    {
        "slug": "demo-masaki-01",
        "title": "Contemporary apartment near the coast",
        "purpose": "rent",
        "property_type": "apartment",
        "price": 1800000,
        "price_period": "month",
        "neighbourhood": "Masaki",
        "bedrooms": 2,
        "bathrooms": 2,
        "area_sqm": 110,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
                "alt": "Bright living room in a contemporary apartment",
                "credit": "Unsplash demo image — replace with verified photo",
            },
            {
                "src": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1200&auto=format&fit=crop",
                "alt": "Modern apartment bedroom with neutral decor",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Parking", "Balcony", "Backup generator", "Security"],
        "description": "Demo description — replace with verified property details. Bright two-bedroom apartment a short walk from Masaki eateries and the peninsula road.",
    },
    {
        "slug": "demo-oyster-02",
        "title": "Family house with garden in Oyster Bay",
        "purpose": "sale",
        "property_type": "house",
        "price": 850000000,
        "price_period": "",
        "neighbourhood": "Oyster Bay",
        "bedrooms": 4,
        "bathrooms": 3,
        "area_sqm": 320,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
                "alt": "Detached family house exterior with lawn",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Garden", "Parking", "Water tank", "Security"],
        "description": "Demo description — replace with verified property details. Four-bedroom family house on a quiet Oyster Bay street.",
    },
    {
        "slug": "demo-mikocheni-03",
        "title": "Two-bedroom flat in Mikocheni",
        "purpose": "rent",
        "property_type": "apartment",
        "price": 950000,
        "price_period": "month",
        "neighbourhood": "Mikocheni",
        "bedrooms": 2,
        "bathrooms": 1,
        "area_sqm": 85,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
                "alt": "Modern residential building exterior",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Parking", "Balcony"],
        "description": "Demo description — replace with verified property details. Practical two-bedroom flat close to shops and schools in Mikocheni.",
    },
    {
        "slug": "demo-upanga-04",
        "title": "City studio in Upanga",
        "purpose": "rent",
        "property_type": "studio",
        "price": 600000,
        "price_period": "month",
        "neighbourhood": "Upanga",
        "bedrooms": 1,
        "bathrooms": 1,
        "area_sqm": 45,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop",
                "alt": "Compact studio living space with kitchen",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Furnished option", "Security", "Water tank"],
        "description": "Demo description — replace with verified property details. Compact studio suited to city workers in Upanga.",
    },
    {
        "slug": "demo-mbezi-05",
        "title": "Beach-area villa near Mbezi Beach",
        "purpose": "sale",
        "property_type": "villa",
        "price": 1200000000,
        "price_period": "",
        "neighbourhood": "Mbezi Beach",
        "bedrooms": 5,
        "bathrooms": 4,
        "area_sqm": 450,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1200&auto=format&fit=crop",
                "alt": "Villa exterior with driveway",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Garden", "Parking", "Backup generator", "Water tank"],
        "description": "Demo description — replace with verified property details. Spacious villa within reach of Mbezi Beach.",
    },
    {
        "slug": "demo-sinza-06",
        "title": "Three-bedroom home in Sinza",
        "purpose": "rent",
        "property_type": "house",
        "price": 1200000,
        "price_period": "month",
        "neighbourhood": "Sinza",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqm": 140,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
                "alt": "House exterior in daylight",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Parking", "Water tank", "Security"],
        "description": "Demo description — replace with verified property details. Three-bedroom home on a settled Sinza street.",
    },
    {
        "slug": "demo-kigamboni-07",
        "title": "Seaside plot-side house in Kigamboni",
        "purpose": "sale",
        "property_type": "house",
        "price": 420000000,
        "price_period": "",
        "neighbourhood": "Kigamboni",
        "bedrooms": 3,
        "bathrooms": 2,
        "area_sqm": 220,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop",
                "alt": "Residential house with tiled roof",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Parking", "Garden", "Water tank"],
        "description": "Demo description — replace with verified property details. Solid three-bedroom house across the ferry in Kigamboni.",
    },
    {
        "slug": "demo-upanga-office-08",
        "title": "Small office space in Upanga",
        "purpose": "rent",
        "property_type": "office",
        "price": 2500000,
        "price_period": "month",
        "neighbourhood": "Upanga",
        "bedrooms": 0,
        "bathrooms": 2,
        "area_sqm": 90,
        "images": [
            {
                "src": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
                "alt": "Bright office interior with desks",
                "credit": "Unsplash demo image — replace with verified photo",
            },
        ],
        "amenities": ["Parking", "Backup generator", "Security"],
        "description": "Demo description — replace with verified property details. Street-facing office space suited to a small team.",
    },
]


class Command(BaseCommand):
    help = "Seed demo property listings (idempotent, all availability=demo)."

    def handle(self, *args, **options):
        for row in DEMO:
            Property.objects.update_or_create(
                slug=row["slug"],
                defaults={**row, "availability": "demo"},
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(DEMO)} demo properties."))
