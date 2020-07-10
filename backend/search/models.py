from django.db import models

class Search(models.Model):
    tictactoe = models.BooleanField(default = False)
