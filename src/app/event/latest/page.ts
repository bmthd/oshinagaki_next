import { fetchLatestEvent } from "@/services/eventService";
import { redirect } from "next/navigation";

/**
 * Redirects to the latest event.
 */
const page = async () => {
  const event = await fetchLatestEvent();
  const latest = event.id;
  if (latest) {
    redirect(`/event/${latest}`);
  } else {
    redirect(`/`);
  }
};

export default page;
