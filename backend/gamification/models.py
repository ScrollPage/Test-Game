from django.db import models
from tictactoe.models import TicTacSession
from search.models import Search

class GameItem(models.Model):
    playing = models.CharField(max_length = 20, blank = True)
    tictac = models.OneToOneField(TicTacSession, on_delete = models.CASCADE, null = True)
    search = models.OneToOneField(Search, on_delete = models.CASCADE, null = True)