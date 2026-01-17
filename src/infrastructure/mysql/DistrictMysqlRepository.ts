import { DistrictRepository, DistrictWithHalls } from "@/domain/district/DistrictRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import "server-only";

export class DistrictMysqlRepository implements DistrictRepository {
  @cacheDecorator({
    tags: ["fetchDistricts"],
  })
  async findManyByEvent(eventId: string): Promise<DistrictWithHalls[]> {
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
  }
}
