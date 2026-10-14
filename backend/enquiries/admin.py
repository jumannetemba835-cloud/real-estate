from django.contrib import admin

from .models import Enquiry, Submission


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "contact", "property", "created_at")
    search_fields = ("name", "contact", "message")


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ("title", "neighbourhood", "purpose", "price", "status", "created_at")
    list_filter = ("status", "purpose")
    search_fields = ("title", "contact")
