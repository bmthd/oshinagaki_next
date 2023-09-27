import { DotHeading, Section, TitleHeading, TwitterCard } from "@/components";
import { fetchSpacesByCircle } from "@/services/eventService";

export const CircleSpaceList = async ({ circleId }: { circleId: number }) => {
  const spaces = await fetchSpacesByCircle(circleId);
  console.log(spaces);
  return (
    <>
      {spaces.map((space) => {
        const block = space.block;
        const day = space.day!;
        const event = day.event;
        const eventName = event?.name;
        const placement = `${day.count}日目${block?.hall.name || ""}${block?.name}-${
          space.spaceNumber
        }${space.ab}`;
        const tweet = space.tweet;
        return (
          <div className="my-4" key={space.id}>
            <TitleHeading>{eventName}</TitleHeading>
            <Section>
              <DotHeading>配置</DotHeading>
              <p>{placement}</p>
              <DotHeading>お品書き</DotHeading>
              {tweet && tweet.url ? <TwitterCard tweet={tweet} /> : <p>お品書きはありません</p>}
            </Section>
          </div>
        );
      })}
    </>
  );
};
