import prisma from "@/lib/prisma";

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

export const fetchHall = async ( hallId: string) => {
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

export const fetchDay = async (eventId: string,dayCount:number) => {
    const day = await prisma.day.findFirst({
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