import { SpacesPresenter } from "@/app/event/[eventId]/_components";
import {
	fetchSpaceCountByBlock,
	fetchSpaceCountByEvent,
	fetchSpacesByBlock,
	fetchSpacesByLanking,
} from "@/services/eventService";

type Props = {
	eventId: string;
	page: number;
	size: number;
	dayCount?: number;
	blockName?: string;
	hallId?: string;
};

type PropsWithBlock = Props & {
	blockName: string;
	dayCount: number;
};

type PropsWithHall = Props & {
	hallId: string;
	dayCount: number;
};

/**
 * blockNameまたはhallIdで指定されたサークル一覧を表示するコンポーネント
 * @param
 * @returns
 */
export const SpacesContainer = async ({
	eventId,
	dayCount,
	blockName,
	hallId,
	page,
	size,
}: PropsWithBlock | PropsWithHall | Props) => {
	if (blockName && dayCount) {
		const [count, spaces] = await Promise.all([
			fetchSpaceCountByBlock(eventId, dayCount, blockName),
			fetchSpacesByBlock(eventId, dayCount, blockName, page, size),
		]);
		const totalPage = Math.ceil(count / size);
		return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
	} else if (hallId && dayCount) {
		const [count, spaces] = await Promise.all([
			fetchSpaceCountByBlock(eventId, dayCount, hallId),
			fetchSpacesByBlock(eventId, dayCount, hallId, page, size),
		]);
		const totalPage = Math.ceil(count / size);
		return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
	} else {
		const [count, spaces] = await Promise.all([
			fetchSpaceCountByEvent(eventId),
			fetchSpacesByLanking(eventId, page, size),
		]);
		const totalPage = Math.ceil(count / size);
		return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
	}
};
