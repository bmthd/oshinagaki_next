import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { HallRepository, HallWithBlocks } from "@/domain/hall/HallRepository";
import { Hall } from "@prisma/client";
import "server-only";

export class HallMysqlRepository implements HallRepository {
  async findById(id: string): Promise<Hall> {
    return cache(
      async (hallId: string) => {
        const hall = await prisma.hall.findUniqueOrThrow({
          where: {
            id: hallId,
          },
        });
        return hall;
      },
      { tags: ["fetchHall", `fetchHall:${id}`] }
    )(id);
  }

  async findManyByEvent(eventId: string): Promise<HallWithBlocks[]> {
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
  }

  async findIdsByEvent(eventId: string): Promise<string[]> {
    return cache(
      async (eventId: string) => {
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
      },
      { tags: ["fetchHallIds", `fetchHallIds:${eventId}`] }
    )(eventId);
  }
}