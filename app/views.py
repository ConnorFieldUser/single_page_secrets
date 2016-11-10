from django.views.generic import TemplateView

from rest_framework.generics import ListAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from app.serializers import SecretSerializer
from app.models import Secret


class IndexView(TemplateView):
    template_name = "index.html"


class SecretListAPIView(ListCreateAPIView):
    serializer_class = SecretSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    def get_queryset(self):
        return Secret.objects.filter(user=self.request.user)
