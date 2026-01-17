import { CircleRepository } from "@/domain/circle/CircleRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { Circle } from "@prisma/client";
import "server-only";

export class CircleMysqlRepository implements CircleRepository {
  @cacheDecorator({
    tags: ["fetchCircle"],
  })
  async findById(id: number): Promise<Circle> {
    const circle = await prisma.circle.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return circle;
  }

  @cacheDecorator({
    tags: ["fetchCircleIds"],
  })
  async findAllIds(): Promise<string[]> {
    const circles = await prisma.circle.findMany({
      select: {
        id: true,
      },
    });
    return circles.map((circle) => circle.id.toString());
  }
}
