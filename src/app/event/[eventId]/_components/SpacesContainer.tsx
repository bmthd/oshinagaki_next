import { SpacesPresenter } from "@/app/event/[eventId]/_components";
import {
  SpacesQueryResult,
  fetchSpaceCountByBlock,
  fetchSpaceCountByEvent,
  fetchSpaceCountByHall,
  fetchSpacesByBlock,
  fetchSpacesByHall,
  fetchSpacesByLanking,
  fetchSpacesByUpdate,
} from "@/services/eventService";
import { Space } from "@prisma/client";

type Common = {
  eventId: string;
  page: number;
  size: number;
};

type LankingProps = Common & {
  dayCount?: never;
  blockName?: never;
  hallId?: never;
  type: "lanking";
};

type RecentProps = Common & {
  dayCount?: never;
  blockName?: never;
  hallId?: never;
  type: "recent";
};

type PropsWithBlock = Common & {
  blockName: string;
  dayCount: number;
  hallId?: never;
  type?: never;
};

type PropsWithHall = Common & {
  hallId: string;
  dayCount: number;
  blockName?: never;
  type?: never;
};

type SpaceData = [number, SpacesQueryResult];

const fetchSpacesData = async ({
  ...props
  }: PropsWithBlock | PropsWithHall | LankingProps | RecentProps):Promise<SpaceData> => {
  const { eventId, dayCount, blockName, hallId, page, size, type } = props;
  if (blockName && dayCount) {
    return await Promise.all([
      fetchSpaceCountByBlock(eventId, dayCount, blockName),
      fetchSpacesByBlock(eventId, dayCount, blockName, page, size),
    ]);
  } else if (hallId && dayCount) {
    return await Promise.all([
      fetchSpaceCountByHall(eventId, dayCount, hallId),
      fetchSpacesByHall(eventId, dayCount, hallId, page, size),
    ]);
  } else if (type === "lanking") {
    return  await Promise.all([
      fetchSpaceCountByEvent(eventId),
      fetchSpacesByLanking(eventId, page, size),
    ]);
  } else if (type === "recent") {
    return await Promise.all([
      fetchSpaceCountByEvent(eventId),
      fetchSpacesByUpdate(eventId, page, size),
    ]);
  } else {
    throw new Error("invalid props");
  }
};

/**
 * blockNameまたはhallId、もしくはランキングまたは直近の条件を受け取る。<p>
 * 指定されたスペース一覧を取得し、表示するコンポーネント
 * @package
 * @param
 * @returns
 */
export const SpacesContainer = async ({
...props
}: PropsWithBlock | PropsWithHall | LankingProps | RecentProps) => {
  const { page, size } = props;
  const [count, spaces] = await fetchSpacesData(props);
  const totalPage = Math.ceil(count / size);
  return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
};
