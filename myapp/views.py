from django.shortcuts import render
import json
from .models import Sentence

def readJSONToDatabase():
    with open('quotes.json') as data_file:
        data = json.load(data_file)

    for line in data:
        Sentence(sentence=line['quote'],author=line['author']).save()