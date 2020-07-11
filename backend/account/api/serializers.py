from rest_framework import serializers 
from account.models import Account
from gamification.models import GameItem
from search.models import Search

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta():
        model = Account
        fields = ['username', 'email', 'first_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def save(self):
        s = Search.objects.create()
        g = GameItem.objects.create(search = s)
        account = Account(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            games = g,
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()

        return account