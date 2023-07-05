import prisma, { Prisma } from "@/lib/prisma";

export const fetchEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });
  return event;
};

export const fetchEvents = async () => {
  const events = await prisma.event.findMany();
  return events;
};

export const fetchLatestEvent = async () => {
  const event = await prisma.event.findFirst({
    orderBy: {
      startDate: "desc",
    },
  });
  return event;
};

export const fetchDay = async (eventId: string, dayCount: number) => {
  const day = await prisma.day.findFirst({
    where: {
      event: {
        id: eventId,
      },
      dayCount: dayCount,
    },
  });
  if(!day){
    throw new Error('Day not found'); 
  }
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
  const hall = await prisma.hall.findUnique({
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
  const block = await prisma.block.findFirst({
    where: {
      event: {
        id: eventId,
      },
      name: blockName,
    },
  });
  if (!block) {
    throw new Error('Block not found'); 
  }
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

export const fetchSpace = async (
  eventId: string,
  dayCount: number,
  blockName: string
) => {
  const space = await prisma.space.findFirst({
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
    orderBy: {
      spaceNumber: "asc",
    },
    include: {
      block: true,
      circle: true,
      day: true,
      tweets: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });
  return space;
};

export const fetchSpaces = async (
  eventId: string,
  dayCount: number,
  blockName: string
) => {
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
    orderBy: [
      { block: { name: 'asc' } },
      { spaceNumber: 'asc' },
      { ab: 'asc' },
    ],
    include: {
      block: true,
      circle: true,
      day: true,
      tweets: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });
  return spaces;
};

export type SpaceQueryResult = Prisma.PromiseReturnType<typeof fetchSpace>;
export type SpacesQueryResult = Prisma.PromiseReturnType<typeof fetchSpaces>;
