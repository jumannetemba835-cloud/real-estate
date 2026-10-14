"""Agent enquiries and agent-submitted listings. No auth: everything stays pending."""

from django.db import models


class Enquiry(models.Model):
    name = models.CharField(max_length=120)
    contact = models.CharField(max_length=120, help_text="Phone number or email.")
    message = models.TextField()
    consent = models.BooleanField(default=False)
    property = models.ForeignKey(
        "properties.Property",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="enquiries",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Enquiry from {self.name} ({self.created_at:%Y-%m-%d})"


class Submission(models.Model):
    STATUS_PENDING = "pending"
    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending review"),
        ("published", "Published"),
        ("rejected", "Rejected"),
    ]

    title = models.CharField(max_length=200)
    purpose = models.CharField(max_length=4, default="rent")
    property_type = models.CharField(max_length=20, default="apartment")
    neighbourhood = models.CharField(max_length=50, default="")
    price = models.PositiveBigIntegerField(help_text="Price in Tanzanian shillings (TZS).")
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    contact = models.CharField(max_length=120, help_text="Agent phone or WhatsApp.")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Submission: {self.title} [{self.status}]"
