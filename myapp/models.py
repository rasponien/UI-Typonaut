from django.db import models

# Create your models here.
class Sentence(models.Model):
    sentence = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    @property
    def medal_times(self):
        return calculate_medal_times(self.sentence)



def calculate_medal_times(sentence):
    words_count = len(sentence.split())
    return {
        'bronze' : (60/23) * words_count,
        'silver' : (60/40) * words_count,
        'gold' : (60/50) * words_count
    }