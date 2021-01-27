import spotipy
import os
from spotipy.oauth2 import SpotifyClientCredentials

client_id=os.getenv('SPOTIFY_ID','spotify_id_from_api')
client_secret=os.getenv('SPOTIFY_SECRET','spotify_secret_from_api')

def search_songs(artist):

    # create Spotify api instance
    print(client_id)
    print(client_secret)
    sp = spotipy.Spotify(
        auth_manager=SpotifyClientCredentials(
            client_id=client_id,
            client_secret=client_secret
        )
    )

    results = sp.search(q='artist:'+artist, limit=20)
    #items = results['artists']['items']
    items = []
    images = []

    for idx, track in enumerate(results['tracks']['items']):
        items.append({
            'name': track['name'],
            'image': track['album']['images'][0]['url']
        })
    # print(results['tracks']['items'][0]['album']['images'])
    print(items)
    return items