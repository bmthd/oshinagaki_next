import { SpaceList } from "@/components/SpaceList";
import { SpaceListHeader } from "@/components/SpaceListHeader";
import { Pagenation } from "@/components/common";
import {
	SpacesQueryResult,
	fetchSpaceCountByBlock,
	fetchSpaceCountByHall,
	fetchSpacesByBlock,
} from "@/services/eventService";

/**
 *  blockNameまたはhallIdで指定されたサークル一覧を表示するコンポーネント
 * @param param0
 * @returns
 */
export const SpacesContainer = async ({
	eventId,
	dayCount,
	blockName,
	hallId,
	page,
	size,
}: {
	eventId: string;
	dayCount: number;
	blockName?: string;
	hallId?: string;
	page: number;
	size: number;
}) => {
	if (!blockName && !hallId) throw new Error("blockNameまたはhallIdのどちらかを指定してください。");
	if (blockName && hallId) throw new Error("blockNameとhallIdの両方を指定することはできません。");
	if (blockName) {
		const [count, spaces] = await Promise.all([
			fetchSpaceCountByBlock(eventId, dayCount, blockName),
			fetchSpacesByBlock(eventId, dayCount, blockName, page, size),
		]);
		const totalPage = Math.ceil(count / size);
		return <Inner spaces={spaces} page={page} totalPage={totalPage} />;
	}
	if (hallId) {
		const [count, spaces] = await Promise.all([
			fetchSpaceCountByHall(eventId, dayCount, hallId),
			fetchSpacesByBlock(eventId, dayCount, hallId, page, size),
		]);
		const totalPage = Math.ceil(count / size);
		return <Inner spaces={spaces} page={page} totalPage={totalPage} />;
	}
};

const Inner = ({
	spaces,
	page,
	totalPage,
}: {
	spaces: SpacesQueryResult;
	page: number;
	totalPage: number;
}) => {
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
