import prisma from "@/lib/prisma";

export const fetchEventIds = async () => {
  const events = await prisma.event.findMany({
    select: {
      id: true,
    },
  });
  return events.map((event) => event.id);
};

export const fetchDayCounts = async (eventId: string) => {
  const days = await prisma.day.findMany({
    where: {
      event: {
        id: eventId,
      },
    },
    select: {
      dayCount: true,
    },
  });
  return days.map((day) => day.dayCount);
};

export const fetchBlockNames = async (eventId: string) => {
  const blocks = await prisma.block.findMany({
    where: {
      event: {
        id: eventId,
      },
    },
  });
  return blocks.map((block) => block.name);
};

export const fetchHallIds = async (eventId: string) => {
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
    select: {
      id: true,
    },
  });
  return halls.map((hall) => hall.id);
};
