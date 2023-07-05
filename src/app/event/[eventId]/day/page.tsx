import { fetchDays, fetchEvent } from "@/services/eventService";

const Page = async ({params}:{params:{eventId:string}}) => {
    const event = await fetchEvent(params.eventId);
    const days = await fetchDays(params.eventId);

    return (
      <>
      <span>{event?.eventName}</span>
      <ul>
        {days.map(day => <li key={day.id}>{day.dayCount}日目</li>)}
      </ul>
      </>
    );
}
export default Page;