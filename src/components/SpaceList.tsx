import { Block, Circle, Day } from "@prisma/client";
import { LinkButton } from "@/components/common";
import { SpaceQueryResult, SpacesQueryResult } from "@/services/eventService";
import { SpaceInfo } from "./SpaceInfo";

export const SpaceList = ({ spaces }: { spaces: SpacesQueryResult }) => {
  return (
    <>
      <SpaceHeader spaces={spaces} />
      {spaces.map((space) => {
        <SpaceInfo space={space} />;
      })}
    </>
  );
};

const SpaceHeader = ({ spaces }: { spaces: SpacesQueryResult }) => {
  return (
    <>
      <ul className="grid lg:grid-cols-4 max-lg:grid-cols-2">
        {spaces.map((space) => {
          const link = `#${space.spaceNumber}${space.ab}`;
          const circleName = `${space.block?.name} ${space.spaceNumber} ${
            space.ab
          } ${space.circle?.name ? space.circle?.name : ""}`;
          return (
            <li key={space.id} className="col-span-1">
              <LinkButton
                href={link}
                className="btn btn-info btn-block btn-sm m-1 font-weight-bold"
              >
                {circleName}
              </LinkButton>
            </li>
          );
        })}
      </ul>
    </>
  );
};
