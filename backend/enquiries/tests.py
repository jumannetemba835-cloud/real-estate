from rest_framework.test import APITestCase


class EnquiryAPITests(APITestCase):
    def test_enquiry_requires_consent(self):
        response = self.client.post(
            "/api/enquiries/",
            {"name": "Amina Juma", "contact": "+255700000000", "message": "Hello", "consent": False},
            format="json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("consent", response.data)

    def test_enquiry_valid_creates_record(self):
        response = self.client.post(
            "/api/enquiries/",
            {"name": "Amina Juma", "contact": "+255700000000", "message": "Hello", "consent": True},
            format="json",
        )
        self.assertEqual(response.status_code, 201)

    def test_submission_stays_pending(self):
        response = self.client.post(
            "/api/submissions/",
            {
                "title": "Two-bedroom flat in Mikocheni",
                "purpose": "rent",
                "property_type": "apartment",
                "neighbourhood": "Mikocheni",
                "price": 1500000,
                "bedrooms": 2,
                "contact": "+255700000000",
            },
            format="json",
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["status"], "pending")
