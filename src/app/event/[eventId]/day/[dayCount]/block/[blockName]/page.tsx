import { BlockListForm } from "@/components/BlockListForm";
import { SpaceList } from "@/components/SpaceList";
import { SpaceListHeader } from "@/components/SpaceListHeader";
import { WallList } from "@/components/WallList";
import { H2, Pagenation } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import {
  fetchBlock,
  fetchDay,
  fetchDays,
  fetchEvent,
  fetchSpaceCountByBlock,
  fetchSpaces,
} from "@/services/eventService";
import { fetchBlockNames } from "@/services/slugService";
import Head from "next/head";

export const dynamic = 'auto'

export const dynamicParams = true;

export const revalidate = 86400;

export const generateStaticParams = async ({
  params: { eventId, dayCount},
}: {
  params: { eventId: string; dayCount: string; };
}) => {
  const blockNames = await fetchBlockNames(eventId);
  return blockNames.map((blockName) => ({
    eventId: eventId,
    dayCount: dayCount,
    blockName: blockName,
  }));
}

/**
 * ブロックごとのサークル一覧を表示するページ
 * URL: /event/[eventId]/day/[dayCount]/block/[blockId]
 * @param param0
 * @returns
 */
const Page = async ({
  params,
  searchParams,
}: {
  params: { eventId: string; dayCount: string; blockName: string };
  searchParams?: { page?: string; size?: string };
}) => {
  const page = convertToNumber(searchParams!.page!)||1;
  const size = convertToNumber(searchParams!.size!)||38;
  const dayCount = parseInt(params.dayCount);
  const event = await fetchEvent(params.eventId);
  const days = await fetchDays(params.eventId);
  const day = await fetchDay(params.eventId, dayCount);
  const blockName = decodeURIComponent(params.blockName);
  const block = await fetchBlock(params.eventId, blockName);
  const spaces = await fetchSpaces(params.eventId, dayCount, blockName,page,size);
  const count = await fetchSpaceCountByBlock(params.eventId, dayCount, blockName);
  const totalPage = Math.ceil(count / size);
  const lastUpdate =spaces.flatMap((space) => space.tweets)
    .map((tweet) => tweet.createdAt)
      .reduce((latest, current) => (current! > latest! ? current : latest), null)!.toLocaleString("ja-JP");
  const pageTitle = `${event.id} ${day.dayCount}日目ブロック\"${block?.name}\"お品書きまとめ`;
  return (
    <>
    <Head>
      <title>{pageTitle}</title>
    </Head>
      <div className="m-2">
        <H2>{pageTitle}</H2>
        <span>最終更新日時:{lastUpdate}</span>
        <Pagenation className='my-4' current={page} total={totalPage} />
        <SpaceListHeader spaces={spaces} />
        <SpaceList spaces={spaces} />
        <Pagenation className='my-4' current={page} total={totalPage} />
        <div className="max-w-md mx-auto">
        <WallList event={event} />
        <BlockListForm event={event} days={days} />
        </div>
      </div>

    </>
  );
};
export default Page;