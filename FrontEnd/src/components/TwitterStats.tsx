import React, { useEffect, useState } from 'react';
import { backendAPI } from '../apis/apiBases';
export default function TwitterStats() {
  const [stats, setStats] = useState(['hello']);
  useEffect(() => {
    async function twitterCall() {
      try {
        const result = await backendAPI.get('/twitter_stats', {
          withCredentials: true,
        });
        console.log(result);
        // handle errors
        if (result.request?.status !== 200) throw Error('Bad request');
        setStats(result.data.friends);
        return result.data.friends;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    }
    twitterCall();
  }, []);
  return (
    <div>
      <h1>MY HOMIES</h1>
      <ol>
        {stats?.map((name) => (
          <li>{name}</li>
        ))}
      </ol>
    </div>
  );
}
