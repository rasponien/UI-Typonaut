import distance # pip install distance
from myapp.constants import BRONZE, SILVER, GOLD
LPS_GOLD = 7
LPS_SILVER = 5
LPS_BRONZE = 2.5
CHAR_SCORE = 100
MISTAKE_SCORE = 150
TIME_PENALTY = 50
def score(usertyped, actual, time):
    "Score is exponentially bigger with word lenth and exponentially reduced by number of errors"
    lav = distance.levenshtein(usertyped, actual) # how different user's answer from the actual sentence
    l = min(len(usertyped), len(actual))
    score = l * CHAR_SCORE * 1.01 ** l - MISTAKE_SCORE * lav * 1.3 ** lav - time * TIME_PENALTY
    score = round(score, 0)
    gold_score      = calc_medal_score(LPS_GOLD,    len(actual),0)
    silver_score    = calc_medal_score(LPS_SILVER,  len(actual),2)
    bronze_score    = calc_medal_score(LPS_BRONZE,  len(actual),4)
    if score > gold_score:
        medal = GOLD
    elif score > silver_score:
        medal = SILVER
    elif score > bronze_score:
        medal = BRONZE
    else:
        medal = None
    return max(score,0), medal, gold_score, silver_score, bronze_score

def calc_medal_score(lps, length, mistakes):
    expected_time = length / lps
    score = length * CHAR_SCORE * 1.01**length - MISTAKE_SCORE * mistakes * 1.3 ** mistakes - expected_time * TIME_PENALTY
    return round(score,0)