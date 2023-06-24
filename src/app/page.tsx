import Head from "next/head";
import { LinkButton } from "@/components/common/LinkButton";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { BlockListForm } from "@/components/BlockListForm";
import { Day, Event, Hall } from "types/dbTypes";
import events from "events";

function ComiketHistory() {
  const now = new Date();
  const year = now.getFullYear() - 2014;

  return (
    <p>
      コミケ参加歴 {year} 年の製作者が、使いやすいと思うサイトを実現しました。
    </p>
  );
}

const LatestEvent = () => {
  const eventName = "C97";
  const circleCount = 100;
  return (
    <p>
      最新イベント: {eventName} 掲載数: {circleCount}
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

const Home =() => {
  const event: Event = {
    id: "C97",
    startDate: new Date(),
    lastDate: new Date(),
    url: "https://example.com",
    eventName: "コミックマーケット97",
  };
  const events: Event[] = [event];
  const days: Day[] = [
    { id: 1, dayCount: 1 },
    { id: 2, dayCount: 2 },
  ];
  const halls: Hall[] = [
    { id: "east1", name: "東1" },
    { id: "east2", name: "東2" },
    { id: "east3", name: "東3" },
    { id: "east4", name: "東4" },
    { id: "east5", name: "東5" },
    { id: "east6", name: "東6" },
    { id: "west1", name: "西1" },
    { id: "west2", name: "西2" },
  ];
  return (
    <>
      <Head>
        <title>コミケお品書きツイートまとめサイト</title>
      </Head>

      <div className="container">
        <div className="row">
          <ComiketHistory />
          <LatestEvent />
        </div>
        <div className="max-w-md m-auto">
          <div className="row">
            <div className="col-12">
              <LinkButton href={`/event/${event.id}/lanking`}>
                {event.id} 話題のサークル
              </LinkButton>
            </div>

            <div className="col-12">
              <LinkButton href="/recent">{event.id} 最新のお品書き</LinkButton>
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

          <div className="flex">
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
                            href={`/event/${event.id}/day/${day.dayCount}/wall/${hall.id}`}
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
          <BlockListForm event={event} />

          <div className="row">
            <LinkButton href={`/event/${event.id}/block_list`}>
              {event.id} ブロック別まとめ一覧
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
