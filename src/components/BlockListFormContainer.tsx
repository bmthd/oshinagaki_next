import { BlockListForm } from "@/components";
import { fetchDays, fetchEvent } from "@/services/eventService";

export const BlockListFormContainer = async ({ eventId }: { eventId: string }) => {
  const event = await fetchEvent(eventId);
  const days = await fetchDays(eventId);
  return <BlockListForm event={event} days={days} />;
};
