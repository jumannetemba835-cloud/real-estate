from rest_framework.test import APITestCase

from properties.models import Property


def make_property(slug="demo-masaki-01", purpose="rent", price=1800000, bedrooms=2):
    return Property.objects.create(
        slug=slug,
        title=f"Demo {slug}",
        purpose=purpose,
        property_type="apartment",
        price=price,
        price_period="month" if purpose == "rent" else "",
        neighbourhood="Masaki",
        bedrooms=bedrooms,
        bathrooms=1,
    )


class PropertyAPITests(APITestCase):
    def test_list_returns_paginated_demo_results(self):
        make_property()
        response = self.client.get("/api/properties/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["id"], "demo-masaki-01")

    def test_filter_by_purpose(self):
        make_property("demo-masaki-01", purpose="rent")
        make_property("demo-oyster-02", purpose="sale")
        response = self.client.get("/api/properties/", {"purpose": "rent"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["purpose"], "rent")

    def test_filter_by_bedrooms_min(self):
        make_property("demo-a", bedrooms=1)
        make_property("demo-b", bedrooms=3)
        response = self.client.get("/api/properties/", {"bedrooms_min": 2})
        self.assertEqual(response.data["count"], 1)
        self.assertEqual(response.data["results"][0]["id"], "demo-b")

    def test_detail_by_slug(self):
        make_property()
        response = self.client.get("/api/properties/demo-masaki-01/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "Demo demo-masaki-01")

    def test_ordering_by_price_desc(self):
        make_property("demo-cheap", price=500000)
        make_property("demo-pricey", price=5000000)
        response = self.client.get("/api/properties/", {"ordering": "-price"})
        self.assertEqual(response.data["results"][0]["id"], "demo-pricey")
