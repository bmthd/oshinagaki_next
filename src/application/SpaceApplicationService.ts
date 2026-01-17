import { container } from "@/infrastructure/di/Container";
import { Prisma } from "@prisma/client";
import "server-only";

export const fetchSpaceCount = async (eventId: string) => {
  return container.spaceDomainService.getSpaceCount(eventId);
};

export const fetchSpacesByBlock = async (
  eventId: string,
  dayCount: number,
  blockName: string,
  pageNumber = 1,
  pageSize = 38
) => {
  return container.spaceDomainService.getSpacesByBlock(
    eventId,
    dayCount,
    blockName,
    pageNumber,
    pageSize
  );
};

export const fetchSpacesByHall = async (
  eventId: string,
  dayCount: number,
  hallId: string,
  pageNumber = 1,
  pageSize = 38
) => {
  return container.spaceDomainService.getSpacesByHall(
    eventId,
    dayCount,
    hallId,
    pageNumber,
    pageSize
  );
};

export const fetchSpacesByLanking = async (
  eventId: string,
  pageNumber: number,
  pageSize: number
) => {
  return container.spaceDomainService.getSpacesByLanking(eventId, pageNumber, pageSize);
};

export const fetchSpacesByUpdate = async (
  eventId: string,
  pageNumber: number,
  pageSize: number
) => {
  return container.spaceDomainService.getSpacesByUpdate(eventId, pageNumber, pageSize);
};

export const fetchSpacesByCircle = async (circleId: number) => {
  return container.spaceDomainService.getSpacesByCircle(circleId);
};

export const fetchSpaceCountByBlock = async (
  eventId: string,
  dayCount: number,
  blockName: string
) => {
  return container.spaceDomainService.getSpaceCountByBlock(eventId, dayCount, blockName);
};

export const fetchSpaceCountByHall = async (eventId: string, dayCount: number, hallId: string) => {
  return container.spaceDomainService.getSpaceCountByHall(eventId, dayCount, hallId);
};

export const fetchSpaceCountByEvent = async (eventId: string) => {
  return container.spaceDomainService.getSpaceCountByEvent(eventId);
};

export type SpacesQueryResult = Prisma.PromiseReturnType<typeof fetchSpacesByBlock>;
export type SpaceQueryResult = SpacesQueryResult[number];