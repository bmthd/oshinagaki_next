import { BlockListFormContainer } from "@/components/BlockListFormContainer";
import { EventList } from "@/components/EventList";
import { WallList } from "@/components/WallList";
import { LinkButton } from "@/components/common";
import { fetchLatestEvent, fetchSpaceCount } from "@/services/eventService";
import { Event } from "@prisma/client";
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

const Home = async () => {
  const event = await fetchLatestEvent();
  const eventId = event.id;
  const circleCount = await fetchSpaceCount(eventId);

  return (
    <>
      <ComiketHistory />
      <LatestEvent event={event} circleCount={circleCount} />
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
