import { cache } from "@/lib/nextCache";
import prisma, { Prisma } from "@/lib/prisma";
import "server-only";

export const fetchEvent = async (id: string) => {
  return cache(
    async (id: string) => {
      const event = await prisma.event.findUniqueOrThrow({
        where: { id },
      });
      return event;
    },
    { tags: ["fetchEvent", `fetchEvent:${id}`] }
  )(id);
};

export const fetchEvents = cache(
  async () => {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    return events;
  },
  { tags: ["fetchEvents"] }
);

export const fetchLatestEvent = cache(
  async () => {
    const event = await prisma.event.findFirstOrThrow({
      orderBy: {
        startDate: "desc",
      },
    });
    return event;
  },
  { tags: ["fetchLatestEvent"] }
);

export const fetchDay = async (eventId: string, dayCount: number) => {
  return cache(
    async (eventId: string, dayCount: number) => {
      const day = await prisma.day.findFirstOrThrow({
        where: {
          event: {
            id: eventId,
          },
          count: dayCount,
        },
      });
      return day;
    },
    { tags: ["fetchDay", `fetchDay:${eventId}:${dayCount}`] }
  )(eventId, dayCount);
};

export const fetchDays = async (eventId: string) => {
  return cache(
    async (eventId: string) => {
      const days = await prisma.day.findMany({
        where: {
          event: {
            id: eventId,
          },
        },
      });
      return days;
    },
    { tags: ["fetchDays", `fetchDays:${eventId}`] }
  )(eventId);
};

export const fetchHall = async (hallId: string) => {
  return cache(
    async (hallId: string) => {
      const hall = await prisma.hall.findUniqueOrThrow({
        where: {
          id: hallId,
        },
      });
      return hall;
    },
    { tags: ["fetchHall", `fetchHall:${hallId}`] }
  )(hallId);
};

export const fetchHalls = async (eventId: string) => {
  return cache(
    async (eventId: string) => {
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
        include: {
          blocks: {
            where: {
              event: {
                id: eventId,
              },
            },
          },
          district: true,
        },
        orderBy: {
          name: "asc",
        },
      });
      return halls;
    },
    { tags: ["fetchHalls", `fetchHalls:${eventId}`] }
  )(eventId);
};

export const fetchDistricts = async (eventId: string) => {
  return cache(
    async (eventId: string) => {
      const districts = await prisma.district.findMany({
        where: {
          halls: {
            some: {
              blocks: {
                some: {
                  event: {
                    id: eventId,
                  },
                },
              },
            },
          },
        },
        include: {
          halls: {
            where: {
              blocks: {
                some: {
                  event: {
                    id: eventId,
                  },
                },
              },
            },
            include: {
              blocks: {
                where: {
                  event: {
                    id: eventId,
                  },
                },
              },
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });
      return districts;
    },
    { tags: ["fetchDistricts", `fetchDistricts:${eventId}`] }
  )(eventId);
};

export type BlocksWithDistrict = Prisma.PromiseReturnType<typeof fetchDistricts>;

export const fetchBlock = async (eventId: string, blockName: string) => {
  return cache(
    async (eventId: string, blockName: string) => {
      const block = await prisma.block.findFirstOrThrow({
        where: {
          event: {
            id: eventId,
          },
          name: blockName,
        },
      });
      return block;
    },
    { tags: ["fetchBlock", `fetchBlock:${eventId}:${blockName}`] }
  )(eventId, blockName);
};

export const fetchBlocks = async (eventId: string) => {
  return cache(
    async (eventId: string) => {
      const blocks = await prisma.block.findMany({
        where: {
          event: {
            id: eventId,
          },
        },
        orderBy: {
          name: "asc",
        },
      });
      return blocks;
    },
    { tags: ["fetchBlocks", `fetchBlocks:${eventId}`] }
  )(eventId);
};

export const fetchCircle = async (circleId: number) => {
  return cache(
    async (circleId: number) => {
      const circle = await prisma.circle.findUniqueOrThrow({
        where: {
          id: circleId,
        },
      });
      return circle;
    },
    { tags: ["fetchCircle", `fetchCircle:${circleId}`] }
  )(circleId);
};

export const fetchSpaceCount = async (eventId: string) => {
  return cache(
    async (eventId: string) => {
      const count = await prisma.spaceView.count({
        where: {
          day: {
            event: {
              id: eventId,
            },
          },
        },
      });
      return count;
    },
    { tags: ["fetchSpaceCount", `fetchSpaceCount:${eventId}`] }
  )(eventId);
};

export const fetchSpacesByBlock = async (
  eventId: string,
  dayCount: number,
  blockName: string,
  pageNumber = 1,
  pageSize = 38
) => {
  return cache(
    async (eventId: string, dayCount: number, blockName: string, pageNumber = 1, pageSize = 38) => {
      const spaces = await prisma.spaceView.findMany({
        where: {
          day: {
            event: {
              id: eventId,
            },
            count: dayCount,
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
          tweet: true,
        },
        orderBy: [{ block: { name: "asc" } }, { spaceNumber: "asc" }, { ab: "asc" }],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return spaces;
    },
    {
      tags: [
        "fetchSpacesByBlock",
        `fetchSpacesByBlock:${eventId}:${dayCount}:${blockName}:${pageNumber}:${pageSize}`,
      ],
    }
  )(eventId, dayCount, blockName, pageNumber, pageSize);
};

// export const fetchSpacesByHall = async (
//   eventId: string,
//   dayCount: number,
//   hallId: string,
//   pageNumber = 1,
//   pageSize = 38
// ) => {
//   return cache(
//     async (eventId: string, dayCount: number, hallId: string, pageNumber = 1, pageSize = 38) => {
//       const { blockName, start, end } = generateWallParams(hallId);
//       const spaces = await prisma.spaceView.findMany({
//         where: {
//           day: {
//             event: {
//               id: eventId,
//             },
//             count: dayCount,
//           },
//           block: {
//             name: blockName,
//           },
//           spaceNumber: {
//             gte: start,
//             lte: end,
//           },
//         },
//         include: {
//           block: {
//             include: {
//               hall: true,
//             },
//           },
//           circle: true,
//           day: true,
//           tweet: true,
//         },
//         orderBy: [{ block: { name: "asc" } }, { spaceNumber: "asc" }, { ab: "asc" }],
//         skip: (pageNumber - 1) * pageSize,
//         take: pageSize,
//       });
//       return spaces;
//     },
//     {
//       tags: [
//         "fetchSpacesByHall",
//         `fetchSpacesByHall:${eventId}:${dayCount}:${hallId}:${pageNumber}:${pageSize}`,
//       ],
//     }
//   )(eventId, dayCount, hallId, pageNumber, pageSize);
// };

export const fetchSpacesByHall = async (
  eventId: string,
  dayCount: number,
  hallId: string,
  pageNumber = 1,
  pageSize = 38
) => {
  return cache(
    async (eventId: string, dayCount: number, hallId: string, pageNumber = 1, pageSize = 38) => {
      const { blockName, start, end } = generateWallParams(hallId);
      const spaces = await prisma.space.findMany({
        select: {
          id: true,
        },
        where: {
          day: {
            event: {
              id: eventId,
            },
            count: dayCount,
          },
          block: {
            name: blockName,
          },
          spaceNumber: {
            gte: start,
            lte: end,
          },
        },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });

      const spaceIds = spaces.flatMap((space) => space.id);
      console.log(spaceIds);

      const spaceWithTweet = spaceIds.map(async (spaceId) => {
        return await prisma.tweet
          .findFirst({
            where: {
              spaceId: spaceId,
            },
            orderBy: {
              createdAt: "desc",
            },
          })
          .space({
            include: {
              block: {
                include: {
                  hall: true,
                },
              },
              circle: true,
              day: true,
            },
          });
      });
      return await Promise.all(spaceWithTweet);
    },
    {
      tags: [
        "fetchSpacesByHall",
        `fetchSpacesByHall:${eventId}:${dayCount}:${hallId}:${pageNumber}:${pageSize}`,
      ],
    }
  )(eventId, dayCount, hallId, pageNumber, pageSize);
};

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

export const fetchSpacesByLanking = async (
  eventId: string,
  pageNumber: number,
  pageSize: number
) => {
  return cache(
    async (eventId: string, pageNumber: number, pageSize: number) => {
      const spaces = await prisma.spaceView.findMany({
        where: {
          day: {
            event: {
              id: eventId,
            },
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
          tweet: true,
        },
        orderBy: [
          {
            tweet: {
              retweets: "desc",
            },
          },
        ],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return spaces;
    },
    { tags: ["fetchSpacesByLanking", `fetchSpacesByLanking:${eventId}:${pageNumber}:${pageSize}`] }
  )(eventId, pageNumber, pageSize);
};

export const fetchSpacesByUpdate = async (
  eventId: string,
  pageNumber: number,
  pageSize: number
) => {
  return cache(
    async (eventId: string, pageNumber: number, pageSize: number) => {
      const spaces = await prisma.spaceView.findMany({
        where: {
          day: {
            event: {
              id: eventId,
            },
          },
          tweet: {
            createdAt: {
              not: null,
            },
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
          tweet: true,
        },
        orderBy: [
          {
            tweet: {
              createdAt: "desc",
            },
          },
        ],
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });
      return spaces;
    },
    { tags: ["fetchSpacesByUpdate", `fetchSpacesByUpdate:${eventId}:${pageNumber}:${pageSize}`] }
  )(eventId, pageNumber, pageSize);
};

export const fetchSpacesByCircle = async (circleId: number) => {
  return cache(
    async (circleId: number) => {
      const spaces = await prisma.spaceView.findMany({
        where: {
          circleId: circleId,
        },
        include: {
          block: {
            include: {
              hall: true,
            },
          },
          circle: true,
          day: {
            include: {
              event: true,
            },
          },
          tweet: true,
        },
        orderBy: {
          block: {
            event: {
              startDate: "desc",
            },
          },
        },
      });
      return spaces;
    },
    { tags: ["fetchSpacesByCircle", `fetchSpacesByCircle:${circleId}`] }
  )(circleId);
};

export const fetchSpaceCountByBlock = async (
  eventId: string,
  dayCount: number,
  blockName: string
) => {
  return cache(
    async (eventId: string, dayCount: number, blockName: string) => {
      const count = await prisma.spaceView.count({
        where: {
          day: {
            event: {
              id: eventId,
            },
            count: dayCount,
          },
          block: {
            name: blockName,
          },
        },
      });
      return count;
    },
    {
      tags: [
        "fetchSpaceCountByBlock",
        `fetchSpaceCountByBlock:${eventId}:${dayCount}:${blockName}`,
      ],
    }
  )(eventId, dayCount, blockName);
};

export const fetchSpaceCountByHall = async (eventId: string, dayCount: number, hallId: string) => {
  return cache(
    async (eventId: string, dayCount: number, hallId: string) => {
      const { blockName, start, end } = generateWallParams(hallId);
      const count = await prisma.spaceView.count({
        where: {
          day: {
            event: {
              id: eventId,
            },
            count: dayCount,
          },
          block: {
            name: blockName,
          },
          spaceNumber: {
            gte: start,
            lte: end,
          },
        },
      });
      return count;
    },
    { tags: ["fetchSpaceCountByHall", `fetchSpaceCountByHall:${eventId}:${dayCount}:${hallId}`] }
  )(eventId, dayCount, hallId);
};

export const fetchSpaceCountByEvent = async (eventId: string) => {
  return cache(
    async (eventId: string) => {
      const count = await prisma.spaceView.count({
        where: {
          day: {
            event: {
              id: eventId,
            },
          },
          tweet: {
            createdAt: {
              not: null,
            },
          },
        },
      });
      return count;
    },
    { tags: ["fetchSpaceCountByEvent", `fetchSpaceCountByEvent:${eventId}`] }
  )(eventId);
};

export type SpacesQueryResult = Prisma.PromiseReturnType<typeof fetchSpacesByBlock>;
export type SpaceQueryResult = SpacesQueryResult[number];
