import { DotHeading, Section, TextLink, TitleHeading, TwitterCard } from "@/components/common";
import { SpaceQueryResult, SpacesQueryResult } from "@/services/eventService";

/**
 * スペース情報を表示するコンポーネント
 * 受け取った情報をもとにサークル情報を表示する
 *
 * @param データベース上のスペースオブジェクト
 */
export const SpaceList = ({ spaces }: { spaces: SpacesQueryResult }) => {
	return (
		<ul
			className="grid xl:grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 gap-2
    		border-dashed border-4 rounded-md border-blue-500 bg-blue-100">
			{spaces.map((space) => {
				return <SpaceInfo key={space.id} space={space} />;
			})}
		</ul>
	);
};

/**
 * 1スペース分の情報を表示するコンポーネント
 * @param param0
 * @returns
 */
const SpaceInfo = ({ space }: { space: SpaceQueryResult }) => {
	const circle = space.circle;
	const block = space.block;
	const day = space.day;

	const circleName = circle?.name ? (
		<TextLink href={`/circle/${circle!.id}`} className="font-bold whitespace-pre-wrap">
			{circle!.name}
		</TextLink>
	) : (
		<p>データなし</p>
	);

	const author = circle?.author ? <span>{circle!.author}</span> : <span>データなし</span>;

	const webcatalogUrl = space.webcatalogUrl && (
		<TextLink href={space.webcatalogUrl} className="whitespace-pre-wrap">
			WEBカタログ
		</TextLink>
	);

	const pixivUrl = circle?.pixivUrl && (
		<TextLink href={circle!.pixivUrl} className="whitespace-pre-wrap">
			Pixiv
		</TextLink>
	);

	const hpUrl = circle?.hpUrl && (
		<TextLink href={circle!.hpUrl} className="whitespace-pre-wrap">
			ホームページ
		</TextLink>
	);

	const tweet = space.tweets[0];

	const title = `${day?.dayCount}日目${block?.hall.name}${block?.name}-${space.spaceNumber}${space.ab}`;

	const circleInfo = !circle ? (
		<span>サークルデータなし</span>
	) : (
		<>
			<DotHeading>サークル名</DotHeading>
			{circleName}

			<DotHeading>執筆者名</DotHeading>
			{author}

			<DotHeading>リンク</DotHeading>
			{!space.webcatalogUrl && !circle.pixivUrl && !circle.hpUrl ? (
				<span>データなし</span>
			) : (
				<div className="flex flex-col">
					{webcatalogUrl}
					{pixivUrl}
					{hpUrl}
				</div>
			)}

			<DotHeading>お品書き</DotHeading>
			{tweet ? (
				<div className="flex justify-center">
					<TwitterCard tweet={tweet} />
				</div>
			) : circle.twitterId ? (
				<>
					<a href={`https://twitter.com/${space.circle?.twitterId}`} target="_blank">
						{`@${space.circle?.twitterId}`}
					</a>
					<p>このサークルはまだお品書きを公開していないようです。</p>
				</>
			) : (
				<span>データなし</span>
			)}
		</>
	);

	return (
		<li>
			<div className="m-4">
				<TitleHeading id={`${space.spaceNumber}${space.ab}`}>
					<span className="whitespace-pre-wrap">{title}</span>
				</TitleHeading>
				<Section>{circleInfo}</Section>
			</div>
		</li>
	);
};
