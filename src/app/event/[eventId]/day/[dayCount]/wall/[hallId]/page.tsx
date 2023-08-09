import { SpacesContainer } from "@/app/event/[eventId]/_components";
import { BlockListFormContainer, WallList } from "@/components";
import { TitleHeading } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import { fetchEvent, fetchHall } from "@/services/eventService";
import { fetchHallIds } from "@/services/slugService";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const revalidate = 86400;

export const generateStaticParams = async ({
  params: { eventId, dayCount },
}: {
  params: { eventId: string; dayCount: string };
}) => {
  const hallIds = await fetchHallIds(eventId);
  return hallIds.map((hallId) => ({
    eventId: eventId,
    dayCount: dayCount,
    hallId: hallId,
  }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { eventId: string; dayCount: string; hallId: string };
}): Promise<Metadata> => {
  const [eventId, dayCount, hallId] = [
    params.eventId,
    parseInt(params.dayCount),
    decodeURIComponent(params.hallId),
  ];
  const [event, hall] = await Promise.all([fetchEvent(eventId), fetchHall(hallId)]);
  const pageTitle = `${eventId} ${dayCount}日目${hall?.name}お品書きまとめ`;
  const description = `${event.eventName} ${dayCount}日目${hall?.name}のサークル一覧です。`;
  return {
    title: pageTitle,
    description: description,
  };
};

/**
 * /event/[eventId]/day/[dayCount]/wall/[hallId]
 * ホールごとの壁サークルの一覧を表示するページ
 * @param param0
 * @returns
 */
const Page = async ({
  params,
  searchParams,
}: {
  params: { eventId: string; dayCount: string; hallId: string };
  searchParams?: { page?: string; size?: string };
}) => {
  const [eventId, dayCount, hallId] = [params.eventId, parseInt(params.dayCount), params.hallId];
  const page = convertToNumber(searchParams!.page!) || 1;
  const size = convertToNumber(searchParams!.size!) || 38;
  const hall = await fetchHall(hallId);
  const suspenseKey = `${eventId}-${dayCount}-${hallId}-${page}-${size}`;
  const pageTitle = `${eventId} ${dayCount}日目${hall?.name}ホール壁サークルお品書きまとめ`;

  return (
    <>
      <div className="m-2">
        <TitleHeading>{pageTitle}</TitleHeading>
        <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
          <SpacesContainer
            eventId={eventId}
            dayCount={dayCount}
            hallId={hallId}
            page={page}
            size={size}
          />
        </Suspense>
        <div className="max-w-md mx-auto">
          <WallList eventId={eventId} />
          <BlockListFormContainer eventId={eventId} />
        </div>
      </div>
    </>
  );
};
export default Page;
