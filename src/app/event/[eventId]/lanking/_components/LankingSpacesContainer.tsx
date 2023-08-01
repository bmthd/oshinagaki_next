import { fetchSpaceCountByEvent, fetchSpacesByLanking } from "@/services/eventService";
import { SpacesPresenter } from "../../_components";

export const LankingSpacesContainer = async ({
	eventId,
	page,
	size,
}: {
	eventId: string;
	page: number;
	size: number;
}) => {
	const [count, spaces] = await Promise.all([
		fetchSpaceCountByEvent(eventId),
		fetchSpacesByLanking(eventId, page, size),
	]);
	const totalPage = Math.ceil(count / size);
	return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
};
