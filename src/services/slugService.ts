import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";

export const fetchEventIds = cache(async () => {
  const events = await prisma.event.findMany({
    select: {
      id: true,
    },
  });
  return events.map((event) => event.id);
});

export const fetchDayCounts = cache(async (eventId: string) => {
  const days = await prisma.day.findMany({
    select: {
      dayCount: true,
    },
    where: {
      event: {
        id: eventId,
      },
    },
  });
  return days.map((day) => day.dayCount.toString());
});

export const fetchBlockNames = cache(async (eventId: string) => {
  const blocks = await prisma.block.findMany({
    select: {
      name: true,
    },
    where: {
      event: {
        id: eventId,
      },
    },
  });
  return blocks.map((block) => block.name);
});

export const fetchHallIds = cache(async (eventId: string) => {
  const halls = await prisma.hall.findMany({
    select: {
      id: true,
    },
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
  });
  return halls.map((hall) => hall.id);
});

export const fetchCircleIds = cache(async () => {
  const circles = await prisma.circle.findMany({
    select: {
      id: true,
    },
  });
  return circles.map((circle) => circle.id.toString());
});
