import { SpacesContainer } from "@/app/event/[eventId]/_components";
import { BlockListFormContainer } from "@/components/BlockListFormContainer";
import { WallList } from "@/components/WallList";
import { TitleHeading } from "@/components/common";
import { Section } from "@/components/common/Section";
import { convertToNumber } from "@/lib/util";
import { fetchEvent } from "@/services/eventService";
import { fetchBlockNames } from "@/services/slugService";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "auto";

export const dynamicParams = true;

export const revalidate = 86400;

export const generateMetadata = async ({
	params,
}: {
	params: { eventId: string; dayCount: string; blockName: string };
}): Promise<Metadata> => {
	const [eventId, dayCount, blockName] = [
		params.eventId,
		parseInt(params.dayCount),
		decodeURIComponent(params.blockName),
	];
	const event = await fetchEvent(eventId);
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
	searchParams?: { page?: "string"; size?: string };
}) => {
	const [eventId, dayCount, blockName] = [
		params.eventId,
		parseInt(params.dayCount),
		decodeURIComponent(params.blockName),
	];
	const page = convertToNumber(searchParams!.page!) || 1;
	const size = convertToNumber(searchParams!.size!) || 38;
	const suspenseKey = `${eventId}-${dayCount}-${blockName}-${page}-${size}`;

	const pageTitle = `${eventId} ${dayCount}日目ブロック\"${blockName}\"お品書きまとめ`;

	return (
		<Section className="m-2">
			<TitleHeading>{pageTitle}</TitleHeading>
			<Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
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
				<BlockListFormContainer eventId={eventId} />
			</div>
		</Section>
	);
};
export default Page;
