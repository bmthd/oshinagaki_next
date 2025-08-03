import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { SpaceRepository, SpaceWithRelations } from "@/domain/space/SpaceRepository";
import "server-only";

export class SpaceMysqlRepository implements SpaceRepository {
  async findManyByBlock(
    eventId: string,
    dayCount: number,
    blockName: string,
    pageNumber = 1,
    pageSize = 38
  ): Promise<SpaceWithRelations[]> {
    return cache(
      async (eventId: string, dayCount: number, blockName: string, pageNumber = 1, pageSize = 38) => {
        const spaces = await prisma.spaceView.findMany({
          where: {
            day: {
              event: {
                id: eventId,
              },
              count: dayCount,
            },
            block: {
              name: blockName,
            },
          },
          include: {
            block: {
              include: {
                hall: true,
              },
            },
            circle: true,
            day: {
              include: {
                event: true,
              },
            },
            tweet: true,
          },
          orderBy: [{ block: { name: "asc" } }, { spaceNumber: "asc" }, { ab: "asc" }],
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        });
        return spaces;
      },
      {
        tags: [
          "fetchSpacesByBlock",
          `fetchSpacesByBlock:${eventId}:${dayCount}:${blockName}:${pageNumber}:${pageSize}`,
        ],
      }
    )(eventId, dayCount, blockName, pageNumber, pageSize);
  }

  async findManyByHall(
    eventId: string,
    dayCount: number,
    hallId: string,
    pageNumber = 1,
    pageSize = 38
  ): Promise<SpaceWithRelations[]> {
    return cache(
      async (eventId: string, dayCount: number, hallId: string, pageNumber = 1, pageSize = 38) => {
        const { blockName, start, end } = this.generateWallParams(hallId);
        const spaces = await prisma.spaceView.findMany({
          where: {
            day: {
              event: {
                id: eventId,
              },
              count: dayCount,
            },
            block: {
              name: blockName,
            },
            spaceNumber: {
              gte: start,
              lte: end,
            },
          },
          include: {
            block: {
              include: {
                hall: true,
              },
            },
            circle: true,
            day: {
              include: {
                event: true,
              },
            },
            tweet: true,
          },
          orderBy: [{ block: { name: "asc" } }, { spaceNumber: "asc" }, { ab: "asc" }],
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        });
        return spaces;
      },
      {
        tags: [
          "fetchSpacesByHall",
          `fetchSpacesByHall:${eventId}:${dayCount}:${hallId}:${pageNumber}:${pageSize}`,
        ],
      }
    )(eventId, dayCount, hallId, pageNumber, pageSize);
  }

  async findManyByLanking(
    eventId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<SpaceWithRelations[]> {
    return cache(
      async (eventId: string, pageNumber: number, pageSize: number) => {
        const spaces = await prisma.spaceView.findMany({
          where: {
            day: {
              event: {
                id: eventId,
              },
            },
            tweet: {
              NOT: {
                retweets: 0,
              },
            },
          },
          include: {
            block: {
              include: {
                hall: true,
              },
            },
            circle: true,
            day: {
              include: {
                event: true,
              },
            },
            tweet: true,
          },
          orderBy: [
            {
              tweet: {
                retweets: "desc",
              },
            },
          ],
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        });
        return spaces;
      },
      { tags: ["fetchSpacesByLanking", `fetchSpacesByLanking:${eventId}:${pageNumber}:${pageSize}`] }
    )(eventId, pageNumber, pageSize);
  }

  async findManyByUpdate(
    eventId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<SpaceWithRelations[]> {
    return cache(
      async (eventId: string, pageNumber: number, pageSize: number) => {
        const spaces = await prisma.spaceView.findMany({
          where: {
            day: {
              event: {
                id: eventId,
              },
            },
            tweet: {
              createdAt: {
                not: null,
              },
            },
          },
          include: {
            block: {
              include: {
                hall: true,
              },
            },
            circle: true,
            day: {
              include: {
                event: true,
              },
            },
            tweet: true,
          },
          orderBy: [
            {
              tweet: {
                createdAt: "desc",
              },
            },
          ],
          skip: (pageNumber - 1) * pageSize,
          take: pageSize,
        });
        return spaces;
      },
      { tags: ["fetchSpacesByUpdate", `fetchSpacesByUpdate:${eventId}:${pageNumber}:${pageSize}`] }
    )(eventId, pageNumber, pageSize);
  }

  async findManyByCircle(circleId: number): Promise<SpaceWithRelations[]> {
    return cache(
      async (circleId: number) => {
        const spaces = await prisma.spaceView.findMany({
          where: {
            circleId: circleId,
          },
          include: {
            block: {
              include: {
                hall: true,
              },
            },
            circle: true,
            day: {
              include: {
                event: true,
              },
            },
            tweet: true,
          },
          orderBy: {
            block: {
              event: {
                startDate: "desc",
              },
            },
          },
        });
        return spaces;
      },
      { tags: ["fetchSpacesByCircle", `fetchSpacesByCircle:${circleId}`] }
    )(circleId);
  }

  async countByBlock(eventId: string, dayCount: number, blockName: string): Promise<number> {
    return cache(
      async (eventId: string, dayCount: number, blockName: string) => {
        const count = await prisma.spaceView.count({
          where: {
            day: {
              event: {
                id: eventId,
              },
              count: dayCount,
            },
            block: {
              name: blockName,
            },
          },
        });
        return count;
      },
      {
        tags: [
          "fetchSpaceCountByBlock",
          `fetchSpaceCountByBlock:${eventId}:${dayCount}:${blockName}`,
        ],
      }
    )(eventId, dayCount, blockName);
  }

  async countByHall(eventId: string, dayCount: number, hallId: string): Promise<number> {
    return cache(
      async (eventId: string, dayCount: number, hallId: string) => {
        const { blockName, start, end } = this.generateWallParams(hallId);
        const count = await prisma.spaceView.count({
          where: {
            day: {
              event: {
                id: eventId,
              },
              count: dayCount,
            },
            block: {
              name: blockName,
            },
            spaceNumber: {
              gte: start,
              lte: end,
            },
          },
        });
        return count;
      },
      { tags: ["fetchSpaceCountByHall", `fetchSpaceCountByHall:${eventId}:${dayCount}:${hallId}`] }
    )(eventId, dayCount, hallId);
  }

  async countByEvent(eventId: string): Promise<number> {
    return cache(
      async (eventId: string) => {
        const count = await prisma.spaceView.count({
          where: {
            day: {
              event: {
                id: eventId,
              },
            },
            tweet: {
              createdAt: {
                not: null,
              },
            },
          },
        });
        return count;
      },
      { tags: ["fetchSpaceCountByEvent", `fetchSpaceCountByEvent:${eventId}`] }
    )(eventId);
  }

  private generateWallParams(hallId: string): { blockName: string; start: number; end: number } {
    const blockInfo: { [key: string]: { blockName: string; start: number; end: number } } = {
      east1: { blockName: "A", start: 1, end: 37 },
      east2: { blockName: "A", start: 38, end: 54 },
      east3: { blockName: "A", start: 55, end: 99 },
      east4: { blockName: "シ", start: 1, end: 37 },
      east5: { blockName: "シ", start: 38, end: 54 },
      east6: { blockName: "シ", start: 55, end: 99 },
      west1: { blockName: "め", start: 1, end: 99 },
      west2: { blockName: "あ", start: 1, end: 99 },
    };

    const { blockName, start, end } = blockInfo[hallId];

    if (!blockName) {
      throw new Error("Invalid hallId");
    }

    return { blockName, start, end };
  }
}