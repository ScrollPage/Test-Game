from rest_framework import generics
from account.models import Account
from account.api.serializers import RegistrationSerializer

class RegistrationView(generics.CreateAPIView):

    queryset = Account.objects.all()
    serializer_class =  RegistrationSerializer