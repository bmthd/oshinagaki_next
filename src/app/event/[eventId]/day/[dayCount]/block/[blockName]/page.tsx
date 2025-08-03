import { BlockListFormContainer, WallList } from "@/app/_components";
import { SpacesContainer } from "@/app/event/[eventId]/_components";
import { Section, Spinner, TitleHeading } from "@/components";
import { convertToNumber } from "@/lib/util";
import { fetchEvent } from "@/services/eventService";
import { fetchBlockNames, fetchEventIds, fetchDayCounts } from "@/services/slugService";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const revalidate = 86400;

export const generateStaticParams = async () => {
  const eventIds = await fetchEventIds();
  const allParams = [];
  
  for (const eventId of eventIds) {
    const dayCounts = await fetchDayCounts(eventId);
    const blockNames = await fetchBlockNames(eventId);
    
    for (const dayCount of dayCounts) {
      for (const blockName of blockNames) {
        allParams.push({
          eventId,
          dayCount,
          blockName,
        });
      }
    }
  }
  
  return allParams;
};

export const generateMetadata = async (props: {
  params: Promise<{ eventId: string; dayCount: string; blockName: string }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const [eventId, dayCount, blockName] = [
    params.eventId,
    parseInt(params.dayCount),
    decodeURIComponent(params.blockName),
  ];
  const event = await fetchEvent(eventId);
  const title = `${eventId} ${dayCount}日目ブロック\"${blockName}\"お品書きまとめ`;
  const description = `${event.name} ${dayCount}日目ブロック\"${blockName}\"のサークル一覧です。`;
  return {
    title,
    description,
  };
};

/**
 * ブロックごとのサークル一覧を表示するページ
 * URL: /event/[eventId]/day/[dayCount]/block/[blockId]
 * @param param0
 * @returns
 */
const Page = async (props: {
  params: Promise<{ eventId: string; dayCount: string; blockName: string }>;
  searchParams?: Promise<{ page?: string; size?: string }>;
}) => {
  const [params, searchParams] = await Promise.all([
    props.params,
    props.searchParams || Promise.resolve({ page: undefined, size: undefined })
  ]);
  const [eventId, dayCount, blockName] = [
    params.eventId,
    parseInt(params.dayCount),
    decodeURIComponent(params.blockName),
  ];
  const page = convertToNumber(searchParams?.page || '') || 1;
  const size = convertToNumber(searchParams?.size || '') || 38;
  const suspenseKey = `${eventId}-${dayCount}-${blockName}-${page}-${size}`;
  const title = `${eventId} ${dayCount}日目ブロック\"${blockName}\"お品書きまとめ`;

  return (
    <>
      <TitleHeading>{title}</TitleHeading>
      <Section>
        <Suspense key={suspenseKey} fallback={<Spinner />}>
          <SpacesContainer
            {...{
              eventId,
              dayCount,
              blockName,
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
