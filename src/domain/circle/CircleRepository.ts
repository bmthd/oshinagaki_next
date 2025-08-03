import { Circle } from "@prisma/client";

export interface CircleRepository {
  findById(id: number): Promise<Circle>;
  findAllIds(): Promise<string[]>;
}