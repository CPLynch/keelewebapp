import csv
import itertools

def getTweetData():
    tweetData = []
    with open('static/data/Kaggle_TwitterUSAirlineSentiment.csv', encoding='utf-8-sig') as csv_file:
        data = csv.reader(csv_file, delimiter=',')
        first_line = True
       

        for row in itertools.islice(data, 41):
            if not first_line:
                tweetData.append({
                    "id": row[0],
                    "airline_sentiment": row[1],
                    "airline_sentiment_confidence": row[2],
                    "negative_reason": row[3],
                    "airline": row[4],
                    "name": row[5],
                    "text": row[6],
                    "tweet_created": row[7],
                    "tweet_location": row[8]
                })
            else:
                first_line = False
            
    return sorted(tweetData, key=lambda x: x["airline_sentiment_confidence"])
