"use client";

import { useSearchParams } from "next/navigation";
/**
 * Twitterからの転送を受け取り、認証を行う
 * @returns
 */
const Page = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  if (error) {
    return (
      <>
        <h1>エラー</h1>
        <p>{error}</p>
        <p>{errorDescription}</p>
      </>
    );
  }
  if (code && state) {
    return (
      <>
        <h1>認証中...</h1>
        <p>認証中です。しばらくお待ちください。</p>
      </>
    );
  }
};

export default Page;
