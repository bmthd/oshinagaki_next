import { BlockListForm } from "@/components/BlockListForm";
import { WallList } from "@/components/WallList";
import { H2 } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import { fetchDay, fetchEvent, fetchHall } from "@/services/eventService";
import { fetchHallIds } from "@/services/slugService";
import { Suspense } from "react";
import { SpacesContainer } from "../../block/_component/SpacesContainer";

export const dynamic = "force-dynamic";

export const dynamicParams = true;

export const revalidate = 86400;

export const generateMetadata = async ({
	params,
}: {
	params: { eventId: string; dayCount: string; hallId: string };
}) => {
	const dayCount = parseInt(params.dayCount);
	const [event, day, hall] = await Promise.all([
		fetchEvent(params.eventId),
		fetchDay(params.eventId, dayCount),
		fetchHall(params.hallId),
	]);
	const pageTitle = `${event.id} ${day.dayCount}日目${hall?.name}お品書きまとめ`;
	const description = `${event.eventName} ${day.dayCount}日目${hall?.name}のサークル一覧です。`;
	return {
		title: pageTitle,
		description: description,
	};
};

export const generateStaticParams = async ({
	params: { eventId, dayCount },
}: {
	params: { eventId: string; dayCount: string };
}) => {
	const hallIds = await fetchHallIds(eventId);
	return hallIds.map((hallId) => ({
		eventId: eventId,
		dayCount: dayCount,
		hallId: hallId,
	}));
};

const Page = async ({
	params,
	searchParams,
}: {
	params: { eventId: string; dayCount: string; hallId: string };
	searchParams?: { page?: string; size?: string };
}) => {
	const page = convertToNumber(searchParams!.page!) || 1;
	const size = convertToNumber(searchParams!.size!) || 38;
	const dayCount = parseInt(params.dayCount);
	const [eventId, hallId] = [params.eventId, params.hallId];
	const [event, day, hall] = await Promise.all([
		fetchEvent(eventId),
		fetchDay(eventId, dayCount),
		fetchHall(hallId),
	]);

	const pageTitle = `${event.id} ${day.dayCount}日目${hall?.name}お品書きまとめ`;

	return (
		<>
			<div className="m-2">
				<H2>{pageTitle}</H2>
				<Suspense fallback={<div>Loading...</div>}>
					<SpacesContainer
						eventId={eventId}
						dayCount={dayCount}
						hallId={hallId}
						page={page}
						size={size}
					/>
				</Suspense>
				<div className="max-w-md mx-auto">
					<WallList eventId={eventId} />
					<BlockListForm eventId={eventId} />
				</div>
			</div>
		</>
	);
};
export default Page;
