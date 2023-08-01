import { TextLink } from "@/components/common";
import { fetchDays, fetchEvent } from "@/services/eventService";

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
