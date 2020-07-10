from django.db import models

class TicTacSession(models.Model):
    board = models.CharField(max_length = 10)
    player1 = models.CharField(max_length = 20)
    player2 = models.CharField(max_length = 20)
    first_turn = models.CharField(max_length = 20)