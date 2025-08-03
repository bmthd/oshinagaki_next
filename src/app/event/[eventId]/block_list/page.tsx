import { LinkButton, TitleHeading } from "@/components";
import { fetchBlocks, fetchDays } from "@/services/eventService";
import { fetchEventIds } from "@/services/slugService";

export const generateStaticParams = async () => {
  const eventIds = await fetchEventIds();
  return eventIds.map((eventId) => ({
    eventId,
  }));
};

const Page = async (props: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await props.params;
  const blocks = await fetchBlocks(eventId);
  const days = await fetchDays(eventId);
  const title = `${eventId}のブロック一覧`;
  return (
    <>
      <TitleHeading>{title}</TitleHeading>
      <div className="border-dashed border-4 rounded-md border-blue-500 bg-blue-100 grid grid-cols-2">
        {days.map((day, index) => {
          return (
            <div key={index} className="text-center">
              <p className="p-2 font-bold text-xl">{day.count}日目</p>
              <ul className="flex flex-col gap-4 m-4">
                {blocks.map((block) => {
                  return (
                    <li key={block.id} className="col-span-1 flex justify-center items-center">
                      <LinkButton
                        className="w-full"
                        href={`/event/${eventId}/day/${day.count}/block/${block.name}`}>
                        {`${day.count}日目"${block.name}"ブロック`}
                      </LinkButton>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Page;
