import React, { useEffect, useState } from 'react';
import { backendAPI } from '../apis/apiBases';
export default function Twitter() {
  const [verifyLink, setLink] = useState('your linke will be displayed here');
  useEffect(() => {
    async function twitterCall() {
      try {
        const result = await backendAPI.get('/twitter_start', {
          withCredentials: true,
        });
        console.log(result);
        // handle errors
        if (result.request?.status !== 200) throw Error('Bad request');
        setLink(result.data.authorize_url);
        return result.data.authorize_url;
      } catch (err) {
        console.error(err);
        setLink('Authorization Failed');
        return undefined;
      }
    }
    twitterCall();
  }, []);
  return <a href={verifyLink}>{verifyLink}</a>;
}
