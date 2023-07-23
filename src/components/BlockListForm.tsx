import { fetchDays, fetchEvent } from "@/services/eventService";
import BlockListFormInner from "./BlockListFormInner";

export const BlockListForm = async ({ eventId }: { eventId: string }) => {
	const event = await fetchEvent(eventId);
	const days = await fetchDays(eventId);
	return <BlockListFormInner event={event} days={days} />;
};
