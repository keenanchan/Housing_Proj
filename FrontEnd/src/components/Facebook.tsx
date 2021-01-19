import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
declare const window: any;
async function login() {
  // login with facebook then authenticate with the API to get a JWT auth token
  const { authResponse } = await new Promise(window.FB.login);
  if (!authResponse) return;

  console.log(authResponse.accessToken);
  return authResponse.accessToken || 'no token';
}
export default function Facebook() {
  const [token, setToken] = useState('' || undefined);
  useEffect(() => {
    async function getToken() {
      setToken(await login());
    }
    getToken();
  }, [token]);
  return <a href="https://www.facebook.com/">{token}</a>;
}
