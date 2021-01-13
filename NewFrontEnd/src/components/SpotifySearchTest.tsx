import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: '', // TODO make sure to not add the id, secret, or access token to git! otherwise, it'll be public on github
  clientSecret: '',
  // accessToken: '',
});

const SpotifySearchTest: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (search === '') {
      setSearchResults([]);
      return;
    }

    const updateSearchResults = async () => {
      const { body } = await spotifyApi.searchTracks(search);
      const songNames = body.tracks?.items.map((item) => item.name);
      console.log(songNames);
      setSearchResults(songNames || []);
    };

    updateSearchResults();
  }, [search]);

  return (
    <>
      <input onChange={(e) => setSearch(e.currentTarget.value.trim())} />
      <ul>
        {searchResults.map((s) => (
          <li>{s}</li>
        ))}
      </ul>
    </>
  );
};

export default SpotifySearchTest;
