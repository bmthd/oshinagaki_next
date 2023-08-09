import { Tweet } from "@/lib/prisma";

export const TwitterCard = ({ tweet }: { tweet: Tweet }) => {
  const formatter = new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  console.log(tweet.createdAt);
  const formatedDate = tweet.createdAt ? formatter.format(new Date(tweet.createdAt)) : "";
  const tweetId = tweet.url!.split("/").pop();

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `    <blockquote className="twitter-tweet" data-lang="ja" dir="ltr">
    <p lang="ja" dir="ltr">
      {tweet.text}
    </p>
    — (${tweet.authorId})
    <a href=${tweet.url}?ref_src=twsrc%5Etfw>${formatedDate}</a>
  </blockquote>`,
      }}></div>
  );
};
