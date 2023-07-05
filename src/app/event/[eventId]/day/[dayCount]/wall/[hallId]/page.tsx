import { fetchDay, fetchEvent, fetchHall } from "@/services/eventService";

const Page = async ({params}:{params:{eventId:string,dayCount:string,hallId:string}}) => {
    const dayCount = parseInt(params.dayCount);
    const event = await fetchEvent(params.eventId);
    const day = await fetchDay(params.eventId, dayCount);
    const hall = await fetchHall(params.hallId);
    return (
      <>
      <span>{event?.eventName}</span>
      <span>{day?.dayCount}日目</span>
      <span>{hall?.name}</span>
      </>
    );
}
export default Page;