import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { BlockRepository } from "@/domain/block/BlockRepository";
import { Block } from "@prisma/client";
import "server-only";

export class BlockMysqlRepository implements BlockRepository {
  async findByEventAndName(eventId: string, blockName: string): Promise<Block> {
    return cache(
      async (eventId: string, blockName: string) => {
        const block = await prisma.block.findFirstOrThrow({
          where: {
            event: {
              id: eventId,
            },
            name: blockName,
          },
        });
        return block;
      },
      { tags: ["fetchBlock", `fetchBlock:${eventId}:${blockName}`] }
    )(eventId, blockName);
  }

  async findManyByEvent(eventId: string): Promise<Block[]> {
    return cache(
      async (eventId: string) => {
        const blocks = await prisma.block.findMany({
          where: {
            event: {
              id: eventId,
            },
          },
          orderBy: {
            name: "asc",
          },
        });
        return blocks;
      },
      { tags: ["fetchBlocks", `fetchBlocks:${eventId}`] }
    )(eventId);
  }

  async findNamesByEvent(eventId: string): Promise<string[]> {
    return cache(
      async (eventId: string) => {
        const blocks = await prisma.block.findMany({
          select: {
            name: true,
          },
          where: {
            event: {
              id: eventId,
            },
          },
        });
        return blocks.map((block) => block.name);
      },
      { tags: ["fetchBlockNames", `fetchBlockNames:${eventId}`] }
    )(eventId);
  }
}