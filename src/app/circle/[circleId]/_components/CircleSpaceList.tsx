import { DotHeading, Section, TitleHeading, TwitterCard } from "@/components/common";
import { fetchSpacesByCircle } from "@/services/eventService";
import React from "react";

export const CircleSpaceList = async ({ circleId }: { circleId: number }) => {
  const circleSpaces = await fetchSpacesByCircle(circleId);

  return (
    <>
      {circleSpaces.map((circleSpace) => {
        const block = circleSpace.block!;
        const event = block!.event!;
        const day = circleSpace.day!;
        const eventName = event.name;
        const placement = `${day?.count}日目${block?.hall.name}${block?.name}-${circleSpace.spaceNumber}${circleSpace.ab}`;
        const tweet = circleSpace.tweet;
        return (
          <React.Fragment key={circleSpace.id}>
            <div className="my-4">
              <TitleHeading>{eventName}</TitleHeading>
              <Section>
                <DotHeading>配置</DotHeading>
                <p>{placement}</p>
                <DotHeading>お品書き</DotHeading>
                {tweet ? <TwitterCard tweet={tweet} /> : <p>お品書きはありません</p>}
              </Section>
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};
