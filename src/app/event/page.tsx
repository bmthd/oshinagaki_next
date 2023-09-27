import { EventList } from "@/app/_components";
import Head from "next/head";

/**
 * /event
 * イベント一覧を表示するページ
 * @returns
 */
const Page = () => {
  return (
    <>
      <Head>
        <title>掲載イベント一覧</title>
      </Head>
      <EventList />
    </>
  );
};

export default Page;
