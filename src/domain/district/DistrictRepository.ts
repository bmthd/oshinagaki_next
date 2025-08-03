import { District } from "@prisma/client";

export interface DistrictRepository {
  findManyByEvent(eventId: string): Promise<DistrictWithHalls[]>;
}

export type DistrictWithHalls = District & {
  halls: Array<{
    id: string;
    name: string;
    blocks: Array<{ name: string }>;
  }>;
};