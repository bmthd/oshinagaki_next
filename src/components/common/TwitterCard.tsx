import { Tweet } from "@/lib/prisma";
import { NextTweet } from "next-tweet";

export const TwitterCard = ({ tweet }: { tweet: Tweet }) => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  const formatedDate = formatter.format(tweet.createdAt!);
  const tweetId = tweet.url!.split("/").pop();

  return (
    // <blockquote className="twitter-tweet" data-lang="ja" dir="ltr">
    //   <p lang="ja" dir="ltr">
    //     {tweet.text}
    //   </p>
    //   {`— (${tweet.authorId})`}
    //   <a href={`${tweet.url}?ref_src=twsrc%5Etfw`}>{formatedDate}</a>
    // </blockquote>
    <NextTweet id={tweetId!} notFoundOnError fallback={<div>エラー</div>} />
  );
};
