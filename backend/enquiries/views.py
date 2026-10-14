from rest_framework import generics

from .models import Enquiry, Submission
from .serializers import EnquirySerializer, SubmissionSerializer


class EnquiryCreateView(generics.CreateAPIView):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    throttle_scope = "enquiry"


class SubmissionCreateView(generics.CreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    throttle_scope = "enquiry"
