import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { DayRepository } from "@/domain/day/DayRepository";
import { Day } from "@prisma/client";
import "server-only";

export class DayMysqlRepository implements DayRepository {
  async findByEventAndCount(eventId: string, dayCount: number): Promise<Day> {
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
  }

  async findManyByEvent(eventId: string): Promise<Day[]> {
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
  }

  async findCountsByEvent(eventId: string): Promise<string[]> {
    return cache(
      async (eventId: string) => {
        const days = await prisma.day.findMany({
          select: {
            count: true,
          },
          where: {
            event: {
              id: eventId,
            },
          },
        });
        return days.map((day) => day.count.toString());
      },
      { tags: ["fetchDayCounts", `fetchDayCounts:${eventId}`] }
    )(eventId);
  }
}