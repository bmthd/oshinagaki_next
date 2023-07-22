import { SpaceList } from "@/components/SpaceList";
import { SpaceListHeader } from "@/components/SpaceListHeader";
import { Pagenation } from "@/components/common";
import { fetchSpaceCountByBlock, fetchSpaces } from "@/services/eventService";

export const SpacesContainer = async ({
	eventId,
	dayCount,
	blockName,
	page,
	size,
}: {
	eventId: string;
	dayCount: number;
	blockName: string;
	page: number;
	size: number;
}) => {
	const [count, spaces] = await Promise.all([
		fetchSpaceCountByBlock(eventId, dayCount, blockName),
		fetchSpaces(eventId, dayCount, blockName, page, size),
	]);
	const totalPage = Math.ceil(count / size);
	const lastUpdate = spaces
		.flatMap((space) => space.tweets)
		.map((tweet) => tweet.createdAt)
		.reduce((latest, current) => (current! > latest! ? current : latest), null)!
		.toLocaleString("ja-JP");

	return (
		<>
			<span>最終更新日時:{lastUpdate}</span>
			<Pagenation className="my-4" current={page} total={totalPage} />
			<SpaceListHeader spaces={spaces} />
			<SpaceList spaces={spaces} />
			<Pagenation className="my-4" current={page} total={totalPage} />
		</>
	);
};
