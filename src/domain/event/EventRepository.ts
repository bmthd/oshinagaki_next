import { Event } from "@prisma/client";

export interface EventRepository {
  findById(id: string): Promise<Event>;
  findMany(): Promise<Event[]>;
  findLatest(): Promise<Event>;
}