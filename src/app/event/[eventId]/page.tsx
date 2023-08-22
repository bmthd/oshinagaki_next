import { BlockListFormContainer, WallList } from "@/components";
import { LinkButton, PaddingedText, Section, TitleHeading } from "@/components/common";
import { fetchEvent } from "@/services/eventService";

export const revalidate = 86400;

export const generateStaticParams = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  return [{ eventId: eventId }];
};

export const generateMetadata = async ({ params }: { params: { eventId: string } }) => {
  const event = await fetchEvent(params.eventId);
  const pageTitle = `${event.name}のお品書きまとめ`;
  const description = `${event.name}のサークル一覧です。`;
  return {
    title: pageTitle,
    description: description,
  };
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
  const title = `${event.name}のお品書きまとめ`;
  const description = [
    `${eventId}の参加サークルをまとめたページです。`,
    "人気のサークルは壁サークルから、ジャンル毎やお近くのサークルをお探しの場合はブロック一覧から探してみてください。",
  ];
  return (
    <>
      <TitleHeading>{title}</TitleHeading>
      <PaddingedText texts={description} />
      <Section className="flex flex-col gap-8 max-w-md m-auto">
        <div className="flex flex-col gap-4 py-4">
          <LinkButton href={`/event/${eventId}/lanking`}>{`${eventId} 話題のサークル`}</LinkButton>
          <LinkButton
            href={`/event/${eventId}/recent`}
          >{`${eventId} 最近更新されたサークル`}</LinkButton>
        </div>
        <WallList eventId={eventId} />
        <BlockListFormContainer eventId={eventId} />
      </Section>
    </>
  );
};
export default page;
