import { DayRepository } from "@/domain/day/DayRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { Day } from "@prisma/client";
import "server-only";

export class DayMysqlRepository implements DayRepository {
  @cacheDecorator({
    tags: ["fetchDay"],
  })
  async findByEventAndCount(eventId: string, dayCount: number): Promise<Day> {
    const day = await prisma.day.findFirstOrThrow({
      where: {
        event: {
          id: eventId,
        },
        count: dayCount,
      },
    });
    return day;
  }

  @cacheDecorator({
    tags: ["fetchDays"],
  })
  async findManyByEvent(eventId: string): Promise<Day[]> {
    const days = await prisma.day.findMany({
      where: {
        event: {
          id: eventId,
        },
      },
    });
    return days;
  }

  @cacheDecorator({
    tags: ["fetchDayCounts"],
  })
  async findCountsByEvent(eventId: string): Promise<string[]> {
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
  }
}
