import { fetchDay, fetchEvent } from "@/services/eventService";
import { fetchDayCounts, fetchEventIds } from "@/services/slugService";

export const generateStaticParams = async () => {
  const eventIds = await fetchEventIds();
  const allParams = [];
  
  for (const eventId of eventIds) {
    const dayCounts = await fetchDayCounts(eventId);
    for (const dayCount of dayCounts) {
      allParams.push({
        eventId,
        dayCount,
      });
    }
  }
  
  return allParams;
};

/**
 * /event/[eventId]/day/[dayCount]
 * todo: 中身を実装する
 *
 * @param params 受け取るURLパラメータ
 * @returns
 */
const Page = async (props: { params: Promise<{ eventId: string; dayCount: string }> }) => {
  const { eventId, dayCount: dayCountString } = await props.params;
  const dayCount = parseInt(dayCountString);
  const event = await fetchEvent(eventId);
  const day = await fetchDay(eventId, dayCount);
  return (
    <>
      <span>{event?.name}</span>
      <span>{day?.count}日目</span>
    </>
  );
};
export default Page;
