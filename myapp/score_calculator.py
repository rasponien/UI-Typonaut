import distance # pip install distance

def score(usertyped, actual, time):
    "Score is exponentially bigger with word lenth and exponentially reduced by number of errors"
    CHAR_SCORE = 100
    TIME_PENALTY = 50
    lav = distance.levenshtein(usertyped, actual) # levenshtein distance between strings
    l = min(len(usertyped), len(actual))
    score = l * CHAR_SCORE * 1.01 ** l - CHAR_SCORE * lav * 1.3 ** lav
    score -= TIME_PENALTY * time
    return score