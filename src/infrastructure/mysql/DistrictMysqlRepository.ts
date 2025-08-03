import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { DistrictRepository, DistrictWithHalls } from "@/domain/district/DistrictRepository";
import "server-only";

export class DistrictMysqlRepository implements DistrictRepository {
  async findManyByEvent(eventId: string): Promise<DistrictWithHalls[]> {
    return cache(
      async (eventId: string) => {
        const districts = await prisma.district.findMany({
          where: {
            halls: {
              some: {
                blocks: {
                  some: {
                    event: {
                      id: eventId,
                    },
                  },
                },
              },
            },
          },
          include: {
            halls: {
              where: {
                blocks: {
                  some: {
                    event: {
                      id: eventId,
                    },
                  },
                },
              },
              include: {
                blocks: {
                  where: {
                    event: {
                      id: eventId,
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            name: "asc",
          },
        });
        return districts;
      },
      { tags: ["fetchDistricts", `fetchDistricts:${eventId}`] }
    )(eventId);
  }
}