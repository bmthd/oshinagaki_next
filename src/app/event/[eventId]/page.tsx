import { fetchEvent } from "@/services/eventService";

const Page = async ({params}:{params:{eventId:string}}) => {
    const event = await fetchEvent(params.eventId);

    return (
      <>
      <span>{event?.eventName}</span>
      </>
    );
}
export default Page;