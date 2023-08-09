import { SpacesPresenter } from "@/app/event/[eventId]/_components";
import {
  fetchSpaceCountByBlock,
  fetchSpaceCountByEvent,
  fetchSpaceCountByHall,
  fetchSpacesByBlock,
  fetchSpacesByHall,
  fetchSpacesByLanking,
  fetchSpacesByUpdate,
} from "@/services/eventService";

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

/**
 * blockNameまたはhallId、もしくはランキングまたは直近の条件を受け取る。<p>
 * 指定されたスペース一覧を取得し、表示するコンポーネント
 * @param
 * @returns
 */
export const SpacesContainer = async ({
  eventId,
  dayCount,
  blockName,
  hallId,
  page,
  size,
  type,
}: PropsWithBlock | PropsWithHall | LankingProps | RecentProps) => {
  if (blockName && dayCount) {
    const [count, spaces] = await Promise.all([
      fetchSpaceCountByBlock(eventId, dayCount, blockName),
      fetchSpacesByBlock(eventId, dayCount, blockName, page, size),
    ]);
    const totalPage = Math.ceil(count / size);
    return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
  } else if (hallId && dayCount) {
    const [count, spaces] = await Promise.all([
      fetchSpaceCountByHall(eventId, dayCount, hallId),
      fetchSpacesByHall(eventId, dayCount, hallId, page, size),
    ]);
    const totalPage = Math.ceil(count / size);
    return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
  } else if (type === "lanking") {
    const [count, spaces] = await Promise.all([
      fetchSpaceCountByEvent(eventId),
      fetchSpacesByLanking(eventId, page, size),
    ]);
    const totalPage = Math.ceil(count / size);
    return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
  } else if (type === "recent") {
    const [count, spaces] = await Promise.all([
      fetchSpaceCountByEvent(eventId),
      fetchSpacesByUpdate(eventId, page, size),
    ]);
    const totalPage = Math.ceil(count / size);
    return <SpacesPresenter spaces={spaces} page={page} totalPage={totalPage} />;
  }
};
