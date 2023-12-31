import { fetchDay, fetchEvent } from "@/services/eventService";
import { fetchDayCounts } from "@/services/slugService";

export const generateStaticParams = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const dayCounts = await fetchDayCounts(eventId);
  return dayCounts.map((dayCount) => ({
    eventId,
    dayCount,
  }));
};

/**
 * /event/[eventId]/day/[dayCount]
 * todo: 中身を実装する
 *
 * @param params 受け取るURLパラメータ
 * @returns
 */
const Page = async ({ params }: { params: { eventId: string; dayCount: string } }) => {
  const dayCount = parseInt(params.dayCount);
  const event = await fetchEvent(params.eventId);
  const day = await fetchDay(params.eventId, dayCount);
  return (
    <>
      <span>{event?.name}</span>
      <span>{day?.count}日目</span>
    </>
  );
};
export default Page;
