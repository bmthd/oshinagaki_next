import { fetchLatestEvent } from "@/services/eventService";
import { redirect } from "next/navigation";

/**
 * Redirects to the latest event.
 */
const Page = async () => {
  const event = await fetchLatestEvent();
  const latest = event.id;
  if (latest) {
    redirect(`/event/${latest}/recent`);
  } else {
    redirect(`/`);
  }
};

export default Page;
