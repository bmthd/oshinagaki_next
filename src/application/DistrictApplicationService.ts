import { container } from "@/infrastructure/di/Container";
import { Prisma } from "@prisma/client";
import "server-only";

export const fetchDistricts = async (eventId: string) => {
  return container.districtDomainService.getDistrictsByEvent(eventId);
};

export type BlocksWithDistrict = Prisma.PromiseReturnType<typeof fetchDistricts>;