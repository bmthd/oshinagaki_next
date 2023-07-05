import { fetchDay, fetchEvent } from "@/services/eventService";

const Page = async ({params}:{params:{eventId:string,dayCount:string}}) => {
    const dayCount = parseInt(params.dayCount);
    const event = await fetchEvent(params.eventId);
    const day = await fetchDay(params.eventId, dayCount);
    return (
      <>
      <span>{event?.eventName}</span>
      <span>{day?.dayCount}日目</span>
      </>
    );
}
export default Page;