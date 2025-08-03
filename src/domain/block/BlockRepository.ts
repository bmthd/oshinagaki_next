import { Block } from "@prisma/client";

export interface BlockRepository {
  findByEventAndName(eventId: string, blockName: string): Promise<Block>;
  findManyByEvent(eventId: string): Promise<Block[]>;
  findNamesByEvent(eventId: string): Promise<string[]>;
}