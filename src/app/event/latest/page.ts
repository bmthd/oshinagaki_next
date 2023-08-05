import { fetchLatestEvent } from "@/services/eventService";
import { redirect } from "next/navigation";

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
