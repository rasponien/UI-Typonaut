from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Sentence, Score
import json
import random
from .constants import MEDALS
import myapp.score_calculator

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

@csrf_exempt
def submit(request):
    if "time" in request.POST and "answer" in request.POST and "id" in request.POST and "name" in request.POST:
        answer = request.POST["answer"]
        time = float(request.POST["time"])
        quote = Sentence.objects.get(id=request.POST["id"])
        actual = quote.sentence
        score, medal, gold_score, silver_score, bronze_score, lost_score = myapp.score_calculator.score(answer, actual, time)

        score_entry = Score(time=time, sentence_id=quote,user_name=request.POST["name"],medal=medal, score=score)
        score_entry.save()

        return JsonResponse({"success":True, "score": score, "medal":MEDALS[medal][1],
                             "lost_score"   : lost_score,
                             "gold_score"   : gold_score,
                             "silver_score" : silver_score,
                             "bronze_score" : bronze_score})
    else:
        return JsonResponse({"success":False,"message":"Missing parameters"})
