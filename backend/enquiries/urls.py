from django.urls import path

from .views import EnquiryCreateView, SubmissionCreateView

urlpatterns = [
    path("enquiries/", EnquiryCreateView.as_view(), name="enquiry-create"),
    path("submissions/", SubmissionCreateView.as_view(), name="submission-create"),
]
