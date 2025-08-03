import { TextLink } from "@/components";
import { fetchDays, fetchEvent } from "@/services/eventService";
import { fetchDayCounts, fetchEventIds } from "@/services/slugService";

export const generateStaticParams = async () => {
  const eventIds = await fetchEventIds();
  return eventIds.map((eventId) => ({
    eventId,
  }));
};

/**
 * /event/[eventId]/day/[dayCount]
 * イベントの日付ごとのページ
 * @param param0
 * @returns
 */
const Page = async (props: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await props.params;
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
