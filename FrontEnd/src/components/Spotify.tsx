import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { backendAPI } from '../apis/apiBases';
import Input from './basics/Input';

export default function Spotify() {
  const [songs, setSongs] = useState<any[]>([]); // use a SongModel in future!
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const spotifyGet = async () => {
    try {
      const result = await backendAPI.get('/spotify', {
        withCredentials: true,
      });
      console.log(result);

      if (result.request?.status !== 200) throw Error('Bad request');
      setSongs(result.data.items);
      return result.data.items;
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

      return result.data.items;
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
      {/* <ul> */}
      {songs?.map((song) => (
        <div>
          <img src={song.image} />
          {song.name}
        </div>
      ))}
      {/* </ul> */}

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
          {/* <ul> */}
          {searchResults?.map((result) => (
            <div>
              <img src={result.image} />
              {result.name}
            </div>
          ))}
          {/* </ul> */}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
