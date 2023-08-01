import { LinkButton, TitleHeading } from "@/components/common";
import { fetchBlocks, fetchDays } from "@/services/eventService";
import { fetchEventIds } from "@/services/slugService";

export const generateStaticParams = async () => {
  const eventIds = await fetchEventIds();
  return eventIds.map((eventId) => ({
    eventId: eventId,
  }));
};

const page = async ({ params }: { params: { eventId: string } }) => {
  const eventId = params.eventId;
  const blocks = await fetchBlocks(eventId);
  const days = await fetchDays(eventId);
  const pageTitle = `${eventId}のブロック一覧`;
  return (
    <>
      <TitleHeading>{pageTitle}</TitleHeading>
      <div className="border-dashed border-4 rounded-md border-blue-500 bg-blue-100">
        {days.map((day) => {
          return (
            <>
              <ul className="grid grid-cols-2">
                {blocks.map((block) => {
                  return (
                    <li key={block.id} className="col-span-1 justify-content-center">
                      <LinkButton href={`/event/${eventId}/day/${day.dayCount}/block/${block.id}`}>
                        {`${eventId} ${day.dayCount}日目ブロック"${block.name}"お品書きまとめ`}
                      </LinkButton>
                    </li>
                  );
                })}
              </ul>
            </>
          );
        })}
      </div>
    </>
  );
};
export default page;
