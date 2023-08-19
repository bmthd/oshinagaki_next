import { TextLink } from "@/components/common";
import { fetchDays, fetchEvent } from "@/services/eventService";
import { fetchDayCounts } from "@/services/slugService";

export const generateStaticParams = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const dayCounts = await fetchDayCounts(eventId);
  return dayCounts.map((dayCount) => ({
    eventId: eventId,
    dayCount: dayCount,
  }));
};

/**
 * /event/[eventId]/day/[dayCount]
 * イベントの日付ごとのページ
 * @param param0
 * @returns
 */
const Page = async ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  const event = await fetchEvent(eventId);
  const days = await fetchDays(eventId);

  return (
    <>
      <span>{event?.name}</span>
      <ul>
        {days.map((day) => {
          const dayCount = day.count;
          return (
            <li key={day.id}>
              <TextLink href={`/event/${eventId}/day/${dayCount}`}>{dayCount}日目</TextLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default Page;
