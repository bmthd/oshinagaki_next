import { Day } from "@prisma/client";

export interface DayRepository {
  findByEventAndCount(eventId: string, dayCount: number): Promise<Day>;
  findManyByEvent(eventId: string): Promise<Day[]>;
  findCountsByEvent(eventId: string): Promise<string[]>;
}