"use client";

import { NextPage } from "next";
import { useEffect } from "react";

const RedirectPage: NextPage = () => {
  useEffect(() => {
    window.location.href = getRedirectUrl();
  }, []);
  return <div>Redirecting...</div>;
};

const getRedirectUrl = () => {
  const auth_url = "https://twitter.com/i/oauth2/authorize";
  const params = {
    response_type: "code",
    client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
    redirect_uri:
      "https://vercel.com/bmthd/oshinagaki-front/api/auth/callback/twitter",
    scope: "offline.access%20users.read%20follows.read",
    state: "state",
    code_challenge: "challenge",
    code_challenge_method: "plain",
  };

  const queryString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value || "")}`
    )
    .join("&");

  const redirectUrl = `${auth_url}?${queryString}`;

  return redirectUrl;
};

export default RedirectPage;
