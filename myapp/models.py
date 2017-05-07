from django.db import models
from .constants import MEDALS
import datetime
# Create your models here.
class Sentence(models.Model):
    sentence = models.CharField(max_length=255)
    author = models.CharField(max_length=255)

class Score(models.Model):
    sentence_id = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    datetime = models.DateTimeField(auto_now_add=True,null=True)
    time = models.FloatField()
    medal = models.PositiveSmallIntegerField(choices=MEDALS, null=True)
    score = models.FloatField(default=0)