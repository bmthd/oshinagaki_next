import { BlockListFormContainer, EventList, WallList } from "@/app/_components";
import { LinkButton, PaddingedText } from "@/components";
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
    "コミックマーケットのサークルやお品書き情報をまとめたサイトです。",
    `コミケ参加歴 ${year} 年の製作者が、使いやすいと思うサイトを実現しました。`,
    "TwitterAPIの仕様変更により、ツイートの取得並びにフォロー情報が取得できなくなりました。",
    "C102では有料プランに登録し、ツイートの取得を試みましたが一部しか取得できませんでした。",
    "現在は過去の情報の掲載のみ行っています。",
    `最新イベント: ${event.name} 掲載数: ${circleCount}`,
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
      <div className="flex flex-col gap-8 max-w-md m-auto">
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
