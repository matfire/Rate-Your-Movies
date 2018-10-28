import sys
import csv
import json


parsed_movies = []

with open("data.tsv") as tsvfile:
    spamreader = csv.reader(tsvfile, delimiter="\t")
    for row in spamreader:
        if not row[0] == "tconst":
            parsed_movies.append({
               "imdbId": row[0],
               "rating": row[1],
               "votes": row[2]
            })


with open("result.json", "w") as outfile:
    json.dump(parsed_movies, outfile)