import spotipy
import random
from scipy import spatial
from spotipy.oauth2 import SpotifyClientCredentials
from sklearn.neighbors import NearestNeighbors
import numpy as np

sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id="90a6aa310e894f489bee434eb377e40f",
                                                           client_secret="0d2bd2f3823b4edd82e8b8a79f17e2f5"))
# dependency injection, display as user is typing
def searchArtist(name,spapi,limit=10):
    results = spapi.search(q=name, limit=limit, type='artist')
    return [(elem['name'],elem['id'],elem['genres']) for elem in results['artists']['items']]
# dependency injection, display as user is typing
def searchMusic(name,spapi,limit=10):
    results = spapi.search(q=name, limit=limit, type='track')
    return [(elem['name'],elem['id'], elem['type']) for elem in results['tracks']['items']]
def jaccard(arr1,arr2):
    return len(set(arr1)-set(arr2))/len(set(arr1+arr2))
availabe_genres = sp.recommendation_genre_seeds()['genres']
encodings = {value:index for index,value in enumerate(availabe_genres)}
def userInputConversion(k=5):
    feature_arr = [0]*len(availabe_genres)
    inferred_genres = random.sample(availabe_genres,k)
    # simulate inclusion => inferred from artists
    for genre in inferred_genres:
        ranking = input("From 1-5: how do you rank: "+genre+" ")
        feature_arr[encodings[genre]] = int(ranking)
    # simulate exclusion => inferred from ~artists
    for genre in random.sample(list(set(availabe_genres)-set(inferred_genres)),k):
        ranking = input("From 1-5: how do you rank: "+genre+" ")
        feature_arr[encodings[genre]] = int(ranking)
    return feature_arr
def cosineSim(arr1,arr2):
    return 1-spatial.distance.cosine(arr1,arr2)
def getSimilarUser(existing_users, current_user,k=2,algo='ball_tree',m='minkowski'):
    _,matched_users = NearestNeighbors(n_neighbors=k, algorithm=algo,metric=m).fit(existing_users).kneighbors(current_user)
    return matched_users