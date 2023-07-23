import { H2, LinkButton } from "@/components/common";
import { fetchDays, fetchEvent, fetchHalls } from "@/services/eventService";

export const WallList = async ({ eventId }: { eventId: string }) => {
	const event = await fetchEvent(eventId);
	const days = await fetchDays(eventId);
	const halls = await fetchHalls(eventId);
	return (
		<>
			<H2>壁サークル一覧</H2>
			{/* <!-- 		壁サークルとは？ --> */}

			<div className="flex justify-around">
				{days.map((day) => {
					return (
						<div key={day.id} className="col-6 text-center">
							<span>{day.dayCount}日目</span>
							<ul>
								{halls.map((hall) => {
									return (
										<li key={hall.id} className="d-flex justify-content-center">
											<LinkButton href={`/event/${event!.id}/day/${day.dayCount}/wall/${hall.id}`}>
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
