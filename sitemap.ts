import { fetchBlocks, fetchDays, fetchEvents } from "@/services/eventService";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
	const domain = "https://oshinagaki.bmth.dev";
	const urls = [
		{ url: `${domain}` },
		{ url: `${domain}/event` },
		{ url: `${domain}/about` },
		{ url: `${domain}/contact` },
	];
	const events = await fetchEvents();

	const eventUrls = Promise.all(
		events.flatMap(async (event) => {
			const days = await fetchDays(event.id);
			const blocks = await fetchBlocks(event.id);

			const dayUrls = days.flatMap((day) => {
				const blockUrls = blocks.map((block) => {
					return {
						url: `${domain}/event/${event.id}/day/${day.dayCount}/block/${block.id}`,
					};
				});

				return [{ url: `${domain}/event/${event.id}/day/${day.dayCount}` }, ...blockUrls];
			});

			return [{ url: `${domain}/event/${event.id}` }, ...dayUrls];
		})
	).then((urls) => urls.flat());

	const allUrls = [...urls, ...(await eventUrls)];

	return allUrls;
};

export default sitemap;
