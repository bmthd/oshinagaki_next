import { Pagenation } from "@/components/common";
import { SpacesQueryResult } from "@/services/eventService";
import { SpaceList } from "./SpaceList";
import { SpaceListHeader } from "./SpaceListHeader";

/**
 * 複数のスペースを表示するべきページを構成するコンポーネント
 * @param param0
 * @returns
 */
export const SpacesPresenter = ({
  spaces,
  page,
  totalPage,
}: {
  spaces: SpacesQueryResult;
  page: number;
  totalPage: number;
}) => {
  const lastTweetDate = spaces
    .flatMap((space) => space.tweet?.createdAt)
    .reduce((latest, current) => (current! > latest! ? current : latest), null);
  const lastUpdate = lastTweetDate?.toLocaleString("ja-JP") || "データなし";
  return (
    <>
      <span>最終更新日時:{lastUpdate}</span>
      <Pagenation className="my-4" current={page} total={totalPage} />
      <SpaceListHeader spaces={spaces} />
      <SpaceList spaces={spaces} />
      <Pagenation className="my-4" current={page} total={totalPage} />
    </>
  );
};
