import { BlockListForm } from "@/components/BlockListForm";
import { WallList } from "@/components/WallList";
import { H2 } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import { fetchEvent } from "@/services/eventService";
import { fetchBlockNames } from "@/services/slugService";
import { Suspense } from "react";
import { SpacesContainer } from "../_component/SpacesContainer";

export const dynamic = "force-dynamic";

export const dynamicParams = true;

export const revalidate = 86400;

export const generateMetadata = async ({
	params,
}: {
	params: { eventId: string; dayCount: string; blockName: string };
}) => {
	const eventId = params.eventId;
	const dayCount = parseInt(params.dayCount);
	const event = await fetchEvent(eventId);
	const blockName = decodeURIComponent(params.blockName);
	const pageTitle = `${eventId} ${dayCount}日目ブロック\"${blockName}\"お品書きまとめ`;
	const description = `${event.eventName} ${dayCount}日目ブロック\"${blockName}\"のサークル一覧です。`;
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
	const blockNames = await fetchBlockNames(eventId);
	return blockNames.map((blockName) => ({
		eventId: eventId,
		dayCount: dayCount,
		blockName: blockName,
	}));
};

/**
 * ブロックごとのサークル一覧を表示するページ
 * URL: /event/[eventId]/day/[dayCount]/block/[blockId]
 * @param param0
 * @returns
 */
const Page = async ({
	params,
	searchParams,
}: {
	params: { eventId: string; dayCount: string; blockName: string };
	searchParams?: { page?: string; size?: string };
}) => {
	const page = convertToNumber(searchParams!.page!) || 1;
	const size = convertToNumber(searchParams!.size!) || 38;
	const dayCount = parseInt(params.dayCount);
	const blockName = decodeURIComponent(params.blockName);
	const eventId = params.eventId;

	const pageTitle = `${eventId} ${dayCount}日目ブロック\"${blockName}\"お品書きまとめ`;

	return (
		<>
			<div className="m-2">
				<H2>{pageTitle}</H2>
				<Suspense fallback={<div>Loading...</div>}>
					<SpacesContainer
						eventId={params.eventId}
						dayCount={dayCount}
						blockName={blockName}
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
