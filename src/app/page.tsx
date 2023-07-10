import { BlockListForm } from "@/components/BlockListForm";
import { EventList } from "@/components/EventList";
import { WallList } from "@/components/WallList";
import { LinkButton } from "@/components/common/LinkButton";
import { fetchDays, fetchLatestEvent, fetchSpaceCount } from "@/services/eventService";
import { Event } from "@prisma/client";
import Head from "next/head";
import { FaTwitter } from "react-icons/fa";
const ComiketHistory = () => {
	const now = new Date();
	const year = now.getFullYear() - 2014;
	return <p>コミケ参加歴 {year} 年の製作者が、使いやすいと思うサイトを実現しました。</p>;
};

const LatestEvent = (props: { event: Event; circleCount: number }) => {
	const { event, circleCount } = props;
	return (
		<p>
			最新イベント: {event.eventName} 掲載数: {circleCount}
		</p>
	);
};

const TwitterWebAppLink = () => {
	return (
		<LinkButton href="/twitter-webapp">
			<FaTwitter />
			から参加者を見つけるツール
		</LinkButton>
	);
};

export const metadata = {
	title: "コミケお品書きツイートまとめサイト",
	description:
		"コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
	keywords: "コミックマーケット, お品書き, 新刊情報, サークル情報",
	language: "ja",
	"og:url": "https://oshinagaki.bmth.dev",
	"og:type": "website",
	"og:title": "コミケお品書きツイートまとめサイト",
	"og:description":
		"コミックマーケットのお品書きツイートをまとめて掲載しています。新刊情報やサークル情報を一覧で確認できます。",
	"og:image": "https://oshinagaki.bmth.dev/ogp.png",
	"twitter:card": "summary_large_image",
};

const Home = async () => {
	const event = await fetchLatestEvent();
	const days = await fetchDays(event.id);
	const circleCount = await fetchSpaceCount(event.id);
	return (
		<>
			<Head>
				<title>コミケお品書きツイートまとめサイト</title>
			</Head>

			<ComiketHistory />
			<LatestEvent event={event} circleCount={circleCount} />

			<div className="max-w-md m-auto">
				<LinkButton href={`/event/${event.id}/lanking`}>{event.id} 話題のサークル</LinkButton>
				<LinkButton href="/recent">{event.id} 最新のお品書き</LinkButton>
				<TwitterWebAppLink />
				<WallList event={event} />
				<BlockListForm event={event} days={days} />
				<EventList />
			</div>
		</>
	);
};

export default Home;
