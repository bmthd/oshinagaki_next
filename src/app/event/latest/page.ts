import { fetchLatestEvent } from "@/services/eventService";
import { redirect } from "next/navigation";

const page = async () => {
  const latest = await fetchLatestEvent();
  if (latest) {
    redirect(`/event/${latest.id}`);
  } else {
    redirect(`/`);
  }
};

export default page;
