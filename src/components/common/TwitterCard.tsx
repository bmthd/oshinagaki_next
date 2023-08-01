import { Tweet } from "@/lib/prisma";

export const TwitterCard = ({ tweet }: { tweet: Tweet }) => {
	const formatter = new Intl.DateTimeFormat("ja-JP", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
	const formatedDate = formatter.format(tweet.createdAt!);
	return (
		<blockquote className="twitter-tweet" data-lang="ja" dir="ltr">
			<p lang="ja" dir="ltr">
				{tweet.text}
			</p>
			{`— (${tweet.authorId})`}
			<a href={`${tweet.url}?ref_src=twsrc%5Etfw`}>{formatedDate}</a>
		</blockquote>
	);
};
