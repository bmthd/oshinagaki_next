import { LinkButton, TitleHeading } from "@/components";
import { fetchDays } from "@/application/DayApplicationService";
import { fetchHalls } from "@/application/HallApplicationService";

/**
 * 受け取ったイベントの壁サークル一覧ページへのリンクを表示する
 * 日付ごとにホールを表示する
 * 生成するリンクのURL: /event/[eventId]/wall[hallId]
 * @param param0
 * @returns
 */
export const WallList = async ({ eventId }: { eventId: string }) => {
  const days = await fetchDays(eventId);
  const halls = await fetchHalls(eventId);
  return (
    <>
      <TitleHeading>壁サークル一覧</TitleHeading>
      {/* <!-- 		壁サークルとは？ --> */}

      <div className="grid grid-cols-2 gap-4">
        {days.map((day) => {
          return (
            <div key={day.id} className="text-center">
              <p className="p-2 font-bold text-xl">{day.count}日目</p>
              <ul>
                {halls.map((hall) => {
                  return (
                    <li key={hall.id}>
                      <LinkButton
                        className="w-full mb-4"
                        href={`/event/${eventId}/day/${day.count}/wall/${hall.id}`}>
                        {hall.name}ホール
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
