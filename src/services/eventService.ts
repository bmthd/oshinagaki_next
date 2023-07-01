import prisma from "@/lib/prisma";

const fetchEvent = async (id: string) => {
  const event = await prisma.event.findUnique({
    where: { id },
  });
  return event;
};

const fetchEvents = async () => {
  const events = await prisma.event.findMany();
  return events;
};

const fetchLatestEvent = async () => {
  const event = await prisma.event.findFirst({
    orderBy: {
      startDate: "desc",
    },
  });
  return event;
};

const fetchHalls = async (eventId: string) => {
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

const fetchDays = async (eventId: string) => {
    const days = await prisma.day.findMany({
        where: {
            event: {
                id: eventId,
            },
        },
    });
    return days;
};

const fetchSpaceCount = async (eventId: string) => {
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

export { fetchEvent, fetchEvents, fetchLatestEvent, fetchHalls, fetchDays, fetchSpaceCount };
