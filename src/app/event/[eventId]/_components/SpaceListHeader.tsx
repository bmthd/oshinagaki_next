import { SpacesQueryResult } from "@/services/eventService";

/**
 * スペースの配列を受け取り見出しを表示するコンポーネント
 * タイトルは、ブロック名、スペース番号、サークル名の順で表示
 * リンクは対応するサークルのページ内リンク
 * @package
 * @param param0
 * @returns
 */
export const SpaceListHeader = ({ spaces }: { spaces: SpacesQueryResult }) => {
  return (
    <nav>
      <ul className="grid lg:grid-cols-4 max-lg:grid-cols-2">
        {spaces.map((space) => {
          const link = `#${space.spaceNumber}${space.ab}`;
          const circleName = `${space.block?.name}${space.spaceNumber}${space.ab} ${
            space.circle?.name ? space.circle?.name : ""
          }`;
          return (
            <li
              key={space.id}
              className="flex items-center col-span-1 w-auto h-10 max-md:h-8 py-1 px-2 m-1 bg-primary hover:bg-primary-dark border border-gray-300 rounded-md">
              <a
                href={link}
                className="max-md:text-xs text-white font-bold text-ellipsis whitespace-nowrap overflow-hidden">
                {circleName}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
