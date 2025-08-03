"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const auth_url = "https://twitter.com/i/oauth2/authorize";
const params = {
  response_type: "code",
  client_id: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
  redirect_uri: "https://oshinagaki.bmth.dev/api/auth/callback/twitter",
  scope: "offline.access%20users.read%20follows.read",
  state: "state",
  code_challenge: "challenge",
  code_challenge_method: "plain",
};

const queryString = Object.entries(params)
  .map(([key, value]) => `${key}=${value}`)
  .join("&");

const redirectUrl = `${auth_url}?${queryString}`;

const Page = () => {
  const router = useRouter();
  
  useEffect(() => {
    router.push(redirectUrl);
  }, [router]);
  
  return <div>Redirecting...</div>;
};

export default Page;
