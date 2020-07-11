from rest_framework import generics
from account.models import Account
from search.models import Search
from account.api.serializers import RegistrationSerializer
from gamification.models import GameItem
from rest_framework.response import Response
from rest_framework import status

class RegistrationView(generics.GenericAPIView): 

    serializer_class =  RegistrationSerializer

    def post(self, request):
        serializer = RegistrationSerializer(data = request.POST)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)

