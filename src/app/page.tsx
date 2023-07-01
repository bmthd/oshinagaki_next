import Head from "next/head";
import { LinkButton } from "@/components/common/LinkButton";
import { FaTwitter } from "react-icons/fa";
import { BlockListForm } from "@/components/BlockListForm";
import { fetchDays, fetchEvents, fetchHalls, fetchLatestEvent, fetchSpaceCount } from "@/services/eventService";
import { Event } from "@prisma/client";
function ComiketHistory() {
  const now = new Date();
  const year = now.getFullYear() - 2014;

  return (
    <p>
      コミケ参加歴 {year} 年の製作者が、使いやすいと思うサイトを実現しました。
    </p>
  );
}

const LatestEvent = (
  props: {
    event: Event;
    circleCount: number;
  }
) => {
  const { event, circleCount } = props;
  
  return (
    <p>
      最新イベント: {event.eventName} 掲載数: {circleCount}
    </p>
  );
}

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
  const events = await fetchEvents();
  const days = await fetchDays(event!.id);
  const halls = await fetchHalls(event!.id);
  const circleCount = await fetchSpaceCount(event!.id);
  return (
    <>
      <Head>
        <title>コミケお品書きツイートまとめサイト</title>
      </Head>

      <div className="container">
        <div className="row">
          <ComiketHistory />
          <LatestEvent event={event!} circleCount={circleCount} />
        </div>
        <div className="max-w-md m-auto">
          <div className="row">
            <div className="col-12">
              <LinkButton href={`/event/${event!.id}/lanking`}>
                {event!.id} 話題のサークル
              </LinkButton>
            </div>

            <div className="col-12">
              <LinkButton href="/recent">{event!.id} 最新のお品書き</LinkButton>
            </div>

            <div className="col-12">
              <LinkButton href="/twitter-webapp">
                <FaTwitter />
                から参加者を見つけるツール
              </LinkButton>
            </div>
          </div>

          <p className="text-center">壁サークル一覧</p>
          {/* <!-- 		壁サークルとは？ --> */}

          <div className="flex justify-around">
            {days.map((day) => {
              return (
                <div key={day.id} className="col-6 text-center">
                  <span>{day.dayCount}日目</span>
                  <ul>
                    {halls.map((hall) => {
                      return (
                        <li
                          key={hall.id}
                          className="d-flex justify-content-center"
                        >
                          <LinkButton
                            href={`/event/${event!.id}/day/${day.dayCount}/wall/${hall.id}`}
                          >
                            {hall.name}ホール
                          </LinkButton>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          {/* <BlockListForm event={event!} days={days} /> */}

          <div className="row">
            <LinkButton href={`/event/${event!.id}/block_list`}>
              {event!.id} ブロック別まとめ一覧
            </LinkButton>
          </div>

          <div className="text-center">過去のイベント一覧</div>
          <ul>
            {events.map((e) => {
              return (
                <li key={e.id}>
                  <LinkButton href={`/event/${e.id}`}>{e.id}</LinkButton>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
