import { BlockListFormContainer } from "@/components/BlockListFormContainer";
import { WallList } from "@/components/WallList";
import { fetchEvent } from "@/services/eventService";
import { fetchEventIds } from "@/services/slugService";

export const generateStaticParams = async () => {
	const eventIds = await fetchEventIds();
	return eventIds.map((eventId) => ({
		eventId: eventId,
	}));
};

/**
 * /event/[eventId]
 *
 * @param params 受け取るURLパラメータ
 * @returns
 */
const page = async ({ params }: { params: { eventId: string } }) => {
	const event = await fetchEvent(params.eventId);
	const eventId = event.id;

	return (
		<div className="max-w-md m-auto">
			<WallList eventId={eventId} />
			<BlockListFormContainer eventId={eventId} />
		</div>
	);
};
export default page;
