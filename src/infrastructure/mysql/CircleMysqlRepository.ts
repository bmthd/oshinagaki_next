import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { CircleRepository } from "@/domain/circle/CircleRepository";
import { Circle } from "@prisma/client";
import "server-only";

export class CircleMysqlRepository implements CircleRepository {
  async findById(id: number): Promise<Circle> {
    return cache(
      async (circleId: number) => {
        const circle = await prisma.circle.findUniqueOrThrow({
          where: {
            id: circleId,
          },
        });
        return circle;
      },
      { tags: ["fetchCircle", `fetchCircle:${id}`] }
    )(id);
  }

  async findAllIds(): Promise<string[]> {
    return cache(
      async () => {
        const circles = await prisma.circle.findMany({
          select: {
            id: true,
          },
        });
        return circles.map((circle) => circle.id.toString());
      },
      { tags: ["fetchCircleIds"] }
    )();
  }
}