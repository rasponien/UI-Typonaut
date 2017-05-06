import distance # pip install distance

def score(usertyped, actual, time):
    "Score is exponentially bigger with word lenth and exponentially reduced by number of errors"
    CHAR_SCORE = 100
    TIME_PENALTY = 50
    lav = distance.levenshtein(usertyped, actual) # levenshtein distance between strings
    score = len(usertyped) * CHAR_SCORE * 1.01 ** len(usertyped) - CHAR_SCORE * lav * 1.3 ** lav
    score -= TIME_PENALTY * time
    return score