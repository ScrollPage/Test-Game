from rest_framework import generics
from account.models import Account
from account.api.serializers import RegistrationSerializer
from gamification.models import GameItem
from rest_framework.response import Response
from rest_framework import status

class RegistrationView(generics.GenericAPIView): 

    serializer_class =  RegistrationSerializer

    def post(self, request):
        print(request.POST)
        serializer = RegistrationSerializer(request.POST)
        if serializer.is_valid():
            u = Account.objects.create_user(serializer)
            g = GameItem.objects.create()
            u.games.add(g)
            return Response(status = status.HTTP_201_CREATED)
        else:
            return Response(status = status.HTTP_400_BAD_REQUEST)

