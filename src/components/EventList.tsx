import { LinkButton, TitleHeading } from "@/components/common";
import { fetchEvents } from "@/services/eventService";

export const EventList = async () => {
  const events = await fetchEvents();
  return (
    <>
      <TitleHeading>掲載イベント一覧</TitleHeading>
      <div className="flex flex-col items-center my-2">
        {events.map((event) => (
          <LinkButton className="w-full m-2" href={`/event/${event.id}`} key={event.id}>
            {event.name}
          </LinkButton>
        ))}
      </div>
    </>
  );
};
