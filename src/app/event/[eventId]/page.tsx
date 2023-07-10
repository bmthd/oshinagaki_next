import { BlockListForm } from "@/components/BlockListForm";
import { WallList } from "@/components/WallList";
import { fetchDays, fetchEvent } from "@/services/eventService";
import { fetchEventIds } from "@/services/slugService";

export const generateStaticParams = async () => {
  const eventIds = await fetchEventIds();
  return eventIds.map((eventId) => ({
      eventId: eventId,
      }));
}

/**
 * /event/[eventId]
 * 
 * @param params 受け取るURLパラメータ
 * @returns 
 */
const page = async ({params}:{params:{eventId:string}}) => {
    const event = await fetchEvent(params.eventId);
    const days = await fetchDays(params.eventId);

    return (
      <div className="max-w-md m-auto">
				<WallList event={event} />
				<BlockListForm event={event} days={days} />
      </div>
    );
}
export default page;