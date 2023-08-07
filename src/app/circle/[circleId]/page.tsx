import { DotHeading, Section, TextLink, TitleHeading } from "@/components/common";
import { convertToNumber } from "@/lib/util";
import { fetchCircle, fetchSpacesByCircle } from "@/services/eventService";
import { fetchCircleIds } from "@/services/slugService";
import { Suspense } from "react";

export const generateStaticParams = async () => {
  const circleIds = await fetchCircleIds();
  return circleIds.map((circleId) => ({ circleId: circleId }));
};

const Page = async ({ params }: { params: { circleId: string } }) => {
  const circleId = convertToNumber(params.circleId);
  if (!circleId) throw new Error("circleId is not number");
  const circle = await fetchCircle(circleId);
  const spaces = await fetchSpacesByCircle(circleId);
  const pageTitle = `${circle?.name}のお品書きまとめ`;

  const circleName = circle?.name ? (
    <TextLink href={`/circle/${circle!.id}`} className="font-bold whitespace-pre-wrap">
      {circle!.name}
    </TextLink>
  ) : (
    <p>データなし</p>
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

  const author = circle?.author ? <span>{circle!.author}</span> : <span>データなし</span>;

  return (
    <>
      <div className="m-2">
        <TitleHeading>{pageTitle}</TitleHeading>
        <Section>
          <DotHeading>サークル名</DotHeading>
          {circleName}
          <DotHeading>執筆者名</DotHeading>
          {author}
          <DotHeading>リンク</DotHeading>
          {!circle.pixivUrl && !circle.hpUrl ? (
            <span>データなし</span>
          ) : (
            <div className="flex flex-col">
              {pixivUrl}
              {hpUrl}
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}></Suspense>
        </Section>
      </div>
    </>
  );
};

export default Page;
