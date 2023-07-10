import { fetchEvents } from "@/services/eventService";
import { H2, LinkButton } from "@/components/common";

export const EventList = async () => {
    const events = await fetchEvents();
    return (
        <>
        <H2>掲載イベント一覧</H2>
        <div className="flex flex-col items-center">
        {events.map((event) => (
            <LinkButton href={`/event/${event.id}`} key={event.id}>
                {event.eventName}
            </LinkButton>
        ))}
        </div>
        </>
    );
}