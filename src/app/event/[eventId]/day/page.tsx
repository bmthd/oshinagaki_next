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
const page = async ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  const event = await fetchEvent(eventId);
  const days = await fetchDays(eventId);

  return (
    <>
      <span>{event?.eventName}</span>
      <ul>
        {days.map((day) => (
          <li key={day.id}>
            <TextLink href={`/event/${eventId}/day/${day.dayCount}`}>{day.dayCount}日目</TextLink>
          </li>
        ))}
      </ul>
    </>
  );
};
export default page;
