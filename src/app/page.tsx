import { BlockListFormContainer } from "@/components/BlockListFormContainer";
import { EventList } from "@/components/EventList";
import { WallList } from "@/components/WallList";
import { LinkButton, PaddingedText } from "@/components/common";
import { fetchLatestEvent, fetchSpaceCount } from "@/services/eventService";
import { FaTwitter } from "react-icons/fa";

/**
 * トップページ
 * @returns
 */
const Home = async () => {
  const event = await fetchLatestEvent();
  const eventId = event.id;
  const circleCount = await fetchSpaceCount(eventId);

  const now = new Date();
  const year = now.getFullYear() - 2014;

  const description = [
    `コミケ参加歴 ${year} 年の製作者が、使いやすいと思うサイトを実現しました。`,
    "せっかく技術の粋を集めて作成したのにTwitterAPIの仕様変更のせいで一部機能が利用できなくなってしまいました。",
    "約14000円支払っても月間1万ツイートしか取得できないため、絶望的です。",
    "サークル参加のネタとしてNext.js App Routerでリプレースしたため課金せざるを得ませんでした。",
    "なお、ツイートの取得は1度きりのため、データの取得は8月9日を予定しています。",
    `最新イベント: ${event.eventName} 掲載数: ${circleCount}`,
  ];

  const TwitterWebAppLink = () => {
    return (
      <LinkButton href="/twitter-webapp">
        <FaTwitter />
        から参加者を見つけるツール
      </LinkButton>
    );
  };

  return (
    <>
      <PaddingedText texts={description} />
      <div className="max-w-md m-auto">
        <LinkButton href={`/event/${eventId}/lanking`}>{eventId} 話題のサークル</LinkButton>
        <LinkButton href="/recent">{eventId} 最新のお品書き</LinkButton>
        <TwitterWebAppLink />
        <WallList eventId={eventId} />
        <BlockListFormContainer eventId={eventId} />
        <EventList />
      </div>
    </>
  );
};

export default Home;
