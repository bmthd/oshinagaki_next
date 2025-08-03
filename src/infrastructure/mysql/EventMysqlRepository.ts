import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { EventRepository } from "@/domain/event/EventRepository";
import { Event } from "@prisma/client";
import "server-only";

export class EventMysqlRepository implements EventRepository {
  async findById(id: string): Promise<Event> {
    return cache(
      async (id: string) => {
        const event = await prisma.event.findUniqueOrThrow({
          where: { id },
        });
        return event;
      },
      { tags: ["fetchEvent", `fetchEvent:${id}`] }
    )(id);
  }

  async findMany(): Promise<Event[]> {
    return cache(
      async () => {
        const events = await prisma.event.findMany({
          orderBy: {
            startDate: "desc",
          },
        });
        return events;
      },
      { tags: ["fetchEvents"] }
    )();
  }

  async findLatest(): Promise<Event> {
    return cache(
      async () => {
        const event = await prisma.event.findFirstOrThrow({
          orderBy: {
            startDate: "desc",
          },
        });
        return event;
      },
      { tags: ["fetchLatestEvent"] }
    )();
  }
}