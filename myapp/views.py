from django.shortcuts import render
from .models import Sentence
from django.http import JsonResponse
import json
import random
def home(request):
    return render(request,"index.html")

def readJSONToDatabase():
    with open('quotes.json') as data_file:
        data = json.load(data_file)

    for line in data:
        Sentence(sentence=line['quote'],author=line['author']).save()

def game(request):
    "Returns game.html"
    return render(request, "game.html")

def getQuote(request):
    "Retrieves a random quote"
    quotes = Sentence.objects.all()
    quote = quotes[random.randint(0, len(quotes))]
    return JsonResponse({'quote' : quote.sentence, 'author' : quote.author, 'id': quote.id})
