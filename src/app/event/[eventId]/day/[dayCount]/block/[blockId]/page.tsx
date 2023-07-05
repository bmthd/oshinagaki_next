import { SpaceList } from "@/components/SpaceList";
import { fetchBlock, fetchDay, fetchEvent, fetchSpaces } from "@/services/eventService";

/**
 * ブロックごとのサークル一覧を表示するページ
 * URL: /event/[eventId]/day/[dayCount]/block/[blockId]
 * @param param0 
 * @returns 
 */
const Page = async ({params}:{params:{eventId:string,dayCount:string,blockName:string}}) => {
    const dayCount = parseInt(params.dayCount);
    const event = await fetchEvent(params.eventId);
    const day = await fetchDay(params.eventId, dayCount);
    const block = await fetchBlock(params.eventId,params.blockName);
    const spaces = await fetchSpaces(params.eventId,dayCount,params.blockName);
    console.log('spaces:',spaces )
    return (
      <>
      <span>{event?.eventName}</span>
      <span>{day?.dayCount}日目</span>
      <span>{block?.name}</span>
      <SpaceList spaces={spaces} />
      </>
    );
}
export default Page;