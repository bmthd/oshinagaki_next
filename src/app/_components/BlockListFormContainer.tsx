import { fetchDays, fetchDistricts, fetchEvent } from "@/services/eventService";
import { BlockListForm } from "./BlockListForm";

/**
 * ブロック一覧を選択するフォームを表示するコンポーネント
 * @param param0
 * @returns
 */
export const BlockListFormContainer = async ({ eventId }: { eventId: string }) => {
  const event = await fetchEvent(eventId);
  const days = await fetchDays(eventId);
  const districts = await fetchDistricts(eventId);
  return <BlockListForm event={event} days={days} districts={districts} />;
};
