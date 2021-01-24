import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { backendAPI } from '../apis/apiBases';
import Input from './basics/Input';

export default function Spotify() {
  const [songs, setSongs] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const spotifyGet = async () => {
    try {
      const result = await backendAPI.get('/spotify', {
        withCredentials: true,
      });
      console.log(result);

      if (result.request?.status !== 200) throw Error('Bad request');
      setSongs(result.data.songs);
      return result.data.songs;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const spotifyPost = async (q: string) => {
    try {
      const result = await backendAPI.post(
        '/spotify_search',
        JSON.stringify({ query: q }),
        {
          headers: {
            'content-type': 'application/json',
          },
          withCredentials: true,
        },
      );
      console.log(result);
      if (result.request?.status != 200) throw Error('Bad request');

      return result.data.songs;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  useEffect(() => {
    spotifyGet();
  }, []);
  return (
    <div>
      {/* search chopin (no token, hardcoded) */}
      <h1>Songs</h1>
      <ol>
        {songs?.map((song) => (
          <li>{song}</li>
        ))}
      </ol>

      <br />

      {/* search from user input */}

      <Input label="Search Anthem" onChange={(e) => setQuery(e.target.value)} />
      <Button
        onClick={() =>
          spotifyPost(query).then((results) => setSearchResults(results))
        }
      >
        Search!
      </Button>
      {searchResults ? (
        <>
          <h1>Songs</h1>
          <ol>
            {searchResults?.map((result) => (
              <li>{result}</li>
            ))}
          </ol>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
