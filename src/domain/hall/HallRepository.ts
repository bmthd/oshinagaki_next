import { Hall } from "@prisma/client";

export interface HallRepository {
  findById(id: string): Promise<Hall>;
  findManyByEvent(eventId: string): Promise<HallWithBlocks[]>;
  findIdsByEvent(eventId: string): Promise<string[]>;
}

export type HallWithBlocks = Hall & {
  blocks: Array<{ name: string; eventId: string }>;
  district: { name: string } | null;
};