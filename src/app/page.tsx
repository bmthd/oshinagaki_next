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
    "TwitterAPIの仕様変更のせいで一部機能が利用できなくなってしまいました。",
    "約14000円支払っても月間1万ツイートしか取得できないため、絶望的です。",
    "モダンなWeb技術でリプレースしたため、せっかくなので課金してツイート収集を行います。",
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
        <div className="flex flex-col gap-4 py-4">
          <LinkButton href={`/event/${eventId}/lanking`}>{`${eventId} 話題のサークル`}</LinkButton>
          <LinkButton
            href={`/event/${eventId}/recent`}>{`${eventId} 最近更新されたサークル`}</LinkButton>
        </div>
        <WallList eventId={eventId} />
        <BlockListFormContainer eventId={eventId} />
        <EventList />
      </div>
    </>
  );
};

export default Home;
