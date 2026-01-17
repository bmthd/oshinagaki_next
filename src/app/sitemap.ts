import { fetchEventIds } from "@/application/EventApplicationService";
import { fetchBlocks } from "@/application/BlockApplicationService";
import { fetchDays } from "@/application/DayApplicationService";
import { fetchCircleIds } from "@/application/CircleApplicationService";
import { fetchHallIds } from "@/application/HallApplicationService";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const domain = "https://oshinagaki.bmth.dev";
  const urls = [
    { url: `${domain}` },
    { url: `${domain}/event` },
    { url: `${domain}/about` },
    { url: `${domain}/form` },
  ];
  const eventIds = await fetchEventIds();

  const eventUrls = Promise.all(
    eventIds.flatMap(async (eventId) => {
      const [days, blocks, halls] = await Promise.all([
        fetchDays(eventId),
        fetchBlocks(eventId),
        fetchHallIds(eventId),
      ]);

      const dayUrls = days.flatMap((day) => {
        const dayCount = day.count;
        const blockUrls = blocks.map((block) => {
          return {
            url: `${domain}/event/${eventId}/day/${dayCount}/block/${block.name}`,
          };
        });

        const hallUrls = halls.map((hallId) => {
          return {
            url: `${domain}/event/${eventId}/day/${dayCount}/wall/${hallId}`,
          };
        });

        return [{ url: `${domain}/event/${eventId}/day/${dayCount}` }, ...blockUrls, ...hallUrls];
      });

      return [
        { url: `${domain}/event/${eventId}` },
        { url: `${domain}/event/${eventId}/lanking` },
        { url: `${domain}/event/${eventId}/recent` },
        ...dayUrls,
      ];
    })
  ).then((urls) => urls.flat());

  const circles = await fetchCircleIds();

  const circleUrls = circles.map((circleId) => {
    return { url: `${domain}/circle/${circleId}` };
  });

  const allUrls = [...urls, ...(await eventUrls), ...circleUrls];

  return allUrls;
};

export default sitemap;
