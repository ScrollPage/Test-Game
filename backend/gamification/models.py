from django.db import models
from tictactoe.models import TicTacSession
from search.models import Search

class GameItem(models.Model):
    tictac = models.ManyToManyField(TicTacSession)
    search = models.OneToOneField(Search, on_delete = models.CASCADE)