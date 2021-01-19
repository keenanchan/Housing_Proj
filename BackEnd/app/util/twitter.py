import twitter
import os
consumer_key = os.getenv(
    'CONSUMER_KEY', 'API_Key_from_Twitter')
consumer_secret = os.getenv(
    'CONSUMER_SECRET', 'API_SECRET_from_Twitter')


def getFriends(access_token_key, access_token_secret):
    # Create an Api instance.
    api = twitter.Api(consumer_key=consumer_key,
                      consumer_secret=consumer_secret,
                      access_token_key=access_token_key,
                      access_token_secret=access_token_secret)
    users = api.GetFriends()
    print([u.screen_name for u in users])
    return [u.screen_name for u in users]
