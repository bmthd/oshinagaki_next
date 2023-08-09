"use client";

import { Tweet } from "@/lib/prisma";
import { useEffect, useRef } from "react";

export const TwitterCard = ({ tweet }: { tweet: Tweet }) => {
  const ref = useRef(null);
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const tweetCreatedAt = tweet.createdAt;
  const formatedDate = tweetCreatedAt ? formatter.format(new Date(tweetCreatedAt)) : "";
  const tweetId = tweet.url!.split("/").pop();

  useEffect(() => {
    window.twttr?.widgets.load(ref.current);
  }, [tweetId]);

  return (
    <blockquote className="twitter-tweet" data-lang="ja" dir="ltr" ref={ref.current}>
      <p lang="ja" dir="ltr">
        {tweet.text}
      </p>
      {`— (${tweet.authorId})`}
      <a href={`${tweet.url}?ref_src=twsrc%5Etfw`}>{formatedDate}</a>
    </blockquote>
    // <NextTweet id={tweetId!} notFoundOnError fallback={<div>エラー</div>} />
    // <div
    // ref={ref}
    // dangerouslySetInnerHTML={{
    //   __html: `    <blockquote className="twitter-tweet" data-lang="ja" dir="ltr">
    //                 <p lang="ja" dir="ltr">
    //                   ${tweet.text}
    //                 </p>
    //                   — (${tweet.authorId})
    //                 <a href=${tweet.url}?ref_src=twsrc%5Etfw>${formatedDate}</a>
    //                 </blockquote>`,
    // }}></div>
  );
};
