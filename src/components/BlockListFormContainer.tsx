import { fetchDays, fetchEvent } from "@/services/eventService";
import { BlockListForm } from "./BlockListForm";

export const BlockListFormContainer = async ({ eventId }: { eventId: string }) => {
  const event = await fetchEvent(eventId);
  const days = await fetchDays(eventId);
  return <BlockListForm event={event} days={days} />;
};
