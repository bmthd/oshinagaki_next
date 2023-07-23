import prisma, { Prisma } from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const fetchEvent = async (id: string) => {
	const event = await prisma.event.findUniqueOrThrow({
		where: { id },
	});
	return event;
};

export const fetchEvents = async () => {
	const events = await prisma.event.findMany({
		orderBy: {
			startDate: "desc",
		},
	});
	return events;
};

export const fetchLatestEvent = async () => {
	const event = await prisma.event.findFirstOrThrow({
		orderBy: {
			startDate: "desc",
		},
	});
	return event;
};

export const fetchDay = async (eventId: string, dayCount: number) => {
	const day = await prisma.day.findFirstOrThrow({
		where: {
			event: {
				id: eventId,
			},
			dayCount: dayCount,
		},
	});
	return day;
};

export const fetchDays = async (eventId: string) => {
	const days = await prisma.day.findMany({
		where: {
			event: {
				id: eventId,
			},
		},
	});
	return days;
};

export const fetchHall = async (hallId: string) => {
	const hall = await prisma.hall.findUniqueOrThrow({
		where: {
			id: hallId,
		},
	});
	return hall;
};

export const fetchHalls = async (eventId: string) => {
	const halls = await prisma.hall.findMany({
		where: {
			blocks: {
				some: {
					event: {
						id: eventId,
					},
				},
			},
			use: true,
		},
		orderBy: {
			name: "asc",
		},
	});
	return halls;
};

export const fetchBlock = async (eventId: string, blockName: string) => {
	const block = await prisma.block.findFirstOrThrow({
		where: {
			event: {
				id: eventId,
			},
			name: blockName,
		},
	});
	return block;
};

export const fetchBlocks = async (eventId: string) => {
	const blocks = await prisma.block.findMany({
		where: {
			event: {
				id: eventId,
			},
		},
	});
	return blocks;
};

export const fetchSpaceCount = async (eventId: string) => {
	const count = await prisma.space.count({
		where: {
			day: {
				event: {
					id: eventId,
				},
			},
		},
	});
	return count;
};

export const fetchSpacesByBlock = cache(
	async (eventId: string, dayCount: number, blockName: string, pageNumber = 1, pageSize = 38) => {
		const spaces = await prisma.space.findMany({
			where: {
				day: {
					event: {
						id: eventId,
					},
					dayCount: dayCount,
				},
				block: {
					name: blockName,
				},
			},
			include: {
				block: {
					include: {
						hall: true,
					},
				},
				circle: true,
				day: true,
				tweets: {
					orderBy: {
						createdAt: "desc",
					},
					take: 1,
				},
			},
			orderBy: [{ block: { name: "asc" } }, { spaceNumber: "asc" }, { ab: "asc" }],
			skip: (pageNumber - 1) * pageSize,
			take: pageSize,
		});
		return spaces;
	}
);

export const fetchSpacesByHall = cache(
	async (eventId: string, dayCount: number, hallId: string, pageNumber = 1, pageSize = 38) => {
		const { blockName, start, end } = generateWallParams(hallId);
		const spaces = await prisma.space.findMany({
			where: {
				day: {
					event: {
						id: eventId,
					},
					dayCount: dayCount,
				},
				block: {
					name: blockName,
				},
				spaceNumber: {
					gte: start,
					lte: end,
				},
			},
			include: {
				block: {
					include: {
						hall: true,
					},
				},
				circle: true,
				day: true,
				tweets: {
					orderBy: {
						createdAt: "desc",
					},
					take: 1,
				},
			},
			orderBy: [{ block: { name: "asc" } }, { spaceNumber: "asc" }, { ab: "asc" }],
			skip: (pageNumber - 1) * pageSize,
			take: pageSize,
		});
		return spaces;
	}
);

const generateWallParams = (hallId: string): { blockName: string; start: number; end: number } => {
	const blockInfo: { [key: string]: { blockName: string; start: number; end: number } } = {
		east1: { blockName: "A", start: 1, end: 37 },
		east2: { blockName: "A", start: 38, end: 54 },
		east3: { blockName: "A", start: 55, end: 99 },
		east4: { blockName: "シ", start: 1, end: 37 },
		east5: { blockName: "シ", start: 38, end: 54 },
		east6: { blockName: "シ", start: 55, end: 99 },
		west1: { blockName: "め", start: 1, end: 99 },
		west2: { blockName: "あ", start: 1, end: 99 },
	};

	const { blockName, start, end } = blockInfo[hallId];

	if (!blockName) {
		throw new Error("Invalid hallId");
	}

	return { blockName, start, end };
};

export const fetchSpaceCountByBlock = cache(
	async (eventId: string, dayCount: number, blockName: string) => {
		const count = await prisma.space.count({
			where: {
				day: {
					event: {
						id: eventId,
					},
					dayCount: dayCount,
				},
				block: {
					name: blockName,
				},
			},
		});
		return count;
	}
);

export const fetchSpaceCountByHall = cache(
	async (eventId: string, dayCount: number, hallId: string) => {
		const count = await prisma.space.count({
			where: {
				day: {
					event: {
						id: eventId,
					},
					dayCount: dayCount,
				},
				block: {
					hallId: hallId,
				},
			},
		});
		return count;
	}
);

export type SpacesQueryResult = Prisma.PromiseReturnType<typeof fetchSpacesByBlock>;
export type SpaceQueryResult = SpacesQueryResult[number];
