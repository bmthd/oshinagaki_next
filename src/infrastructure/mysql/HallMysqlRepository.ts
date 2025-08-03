import { HallRepository, HallWithBlocks } from "@/domain/hall/HallRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { Hall } from "@prisma/client";
import "server-only";

export class HallMysqlRepository implements HallRepository {
  @cacheDecorator({
    tags: ["fetchHall"],
  })
  async findById(id: string): Promise<Hall> {
    const hall = await prisma.hall.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return hall;
  }

  @cacheDecorator({
    tags: ["fetchHalls"],
  })
  async findManyByEvent(eventId: string): Promise<HallWithBlocks[]> {
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
  }

  @cacheDecorator({
    tags: ["fetchHallIds"],
  })
  async findIdsByEvent(eventId: string): Promise<string[]> {
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
  }
}
