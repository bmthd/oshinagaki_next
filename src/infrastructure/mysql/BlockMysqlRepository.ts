import { BlockRepository } from "@/domain/block/BlockRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { Block } from "@prisma/client";
import "server-only";

export class BlockMysqlRepository implements BlockRepository {
  @cacheDecorator({
    tags: ["fetchBlock"],
  })
  async findByEventAndName(eventId: string, blockName: string): Promise<Block> {
    const block = await prisma.block.findFirstOrThrow({
      where: {
        event: {
          id: eventId,
        },
        name: blockName,
      },
    });
    return block;
  }

  @cacheDecorator({
    tags: ["fetchBlocks"],
  })
  async findManyByEvent(eventId: string): Promise<Block[]> {
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
  }

  @cacheDecorator({
    tags: ["fetchBlockNames"],
  })
  async findNamesByEvent(eventId: string): Promise<string[]> {
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
  }
}
