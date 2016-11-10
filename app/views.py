from django.views.generic import TemplateView

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from app.serializers import SecretSerializer
from app.models import Secret


class IndexView(TemplateView):
    template_name = "index.html"


class SecretListAPIView(ListAPIView):
    serializer_class = SecretSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Secret.objects.filter(user=self.request.user)
