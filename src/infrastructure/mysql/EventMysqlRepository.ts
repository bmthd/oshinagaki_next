import { EventRepository } from "@/domain/event/EventRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { Event } from "@prisma/client";
import "server-only";

export class EventMysqlRepository implements EventRepository {
  @cacheDecorator({
    tags: ["fetchEvent"],
  })
  async findById(id: string): Promise<Event> {
    const event = await prisma.event.findUniqueOrThrow({
      where: { id },
    });
    return event;
  }

  @cacheDecorator({
    tags: ["fetchEvents"],
  })
  async findMany(): Promise<Event[]> {
    const events = await prisma.event.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    return events;
  }

  @cacheDecorator({
    tags: ["fetchLatestEvent"],
  })
  async findLatest(): Promise<Event> {
    const event = await prisma.event.findFirstOrThrow({
      orderBy: {
        startDate: "desc",
      },
    });
    return event;
  }
}
