from django.db import models
from .constants import MEDALS, WPM_BRONZE, WPM_GOLD, WPM_SILVER

# Create your models here.
class Sentence(models.Model):
    sentence = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    @property
    def medal_times(self):
        return calculate_medal_times(self.sentence)

class Score(models.Model):
    sentence_id = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=255)
    time = models.DateTimeField()
    medal = models.PositiveSmallIntegerField(choices=MEDALS)



def calculate_medal_times(sentence):
    words_count = len(sentence.split())
    return {
        'bronze' : (60/WPM_BRONZE) * words_count,
        'silver' : (60/WPM_SILVER) * words_count,
        'gold' : (60/WPM_GOLD) * words_count
    }