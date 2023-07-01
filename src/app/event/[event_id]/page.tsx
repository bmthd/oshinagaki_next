import { fetchEvent } from "@/services/eventService";

const Page = async ({params}:{params:{event_id:string}}) => {
    const event = await fetchEvent(params.event_id);

    return (
      <>
      <span>{event?.eventName}</span>
      </>
    );
}
export default Page;