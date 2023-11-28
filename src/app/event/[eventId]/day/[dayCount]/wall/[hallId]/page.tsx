import { BlockListFormContainer, WallList } from "@/app/_components";
import { SpacesContainer } from "@/app/event/[eventId]/_components";
import { Section, Spinner, TitleHeading } from "@/components";
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
    eventId,
    dayCount,
    hallId,
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
  const title = `${eventId} ${dayCount}日目${hall?.name}お品書きまとめ`;
  const description = `${event.name} ${dayCount}日目${hall?.name}のサークル一覧です。`;
  return {
    title,
    description,
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
  const title = `${eventId} ${dayCount}日目${hall?.name}ホール壁サークルお品書きまとめ`;

  return (
    <>
      <TitleHeading>{title}</TitleHeading>
      <Section>
        <Suspense key={suspenseKey} fallback={<Spinner />}>
          <SpacesContainer
            {...{
              eventId,
              dayCount,
              hallId,
              page,
              size,
            }}
          />
        </Suspense>
        <div className="max-w-md mx-auto">
          <WallList eventId={eventId} />
          <BlockListFormContainer eventId={eventId} />
        </div>
      </Section>
    </>
  );
};
export default Page;
