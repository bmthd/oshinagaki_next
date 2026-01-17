import { SpaceRepository } from "./SpaceRepository";

export class SpaceDomainService {
  constructor(private spaceRepository: SpaceRepository) {}

  async getSpaceCount(eventId: string) {
    return this.spaceRepository.countByEvent(eventId);
  }

  async getSpacesByBlock(
    eventId: string,
    dayCount: number,
    blockName: string,
    pageNumber = 1,
    pageSize = 38
  ) {
    return this.spaceRepository.findManyByBlock(eventId, dayCount, blockName, pageNumber, pageSize);
  }

  async getSpacesByHall(
    eventId: string,
    dayCount: number,
    hallId: string,
    pageNumber = 1,
    pageSize = 38
  ) {
    return this.spaceRepository.findManyByHall(eventId, dayCount, hallId, pageNumber, pageSize);
  }

  async getSpacesByLanking(eventId: string, pageNumber: number, pageSize: number) {
    return this.spaceRepository.findManyByLanking(eventId, pageNumber, pageSize);
  }

  async getSpacesByUpdate(eventId: string, pageNumber: number, pageSize: number) {
    return this.spaceRepository.findManyByUpdate(eventId, pageNumber, pageSize);
  }

  async getSpacesByCircle(circleId: number) {
    return this.spaceRepository.findManyByCircle(circleId);
  }

  async getSpaceCountByBlock(eventId: string, dayCount: number, blockName: string) {
    return this.spaceRepository.countByBlock(eventId, dayCount, blockName);
  }

  async getSpaceCountByHall(eventId: string, dayCount: number, hallId: string) {
    return this.spaceRepository.countByHall(eventId, dayCount, hallId);
  }

  async getSpaceCountByEvent(eventId: string) {
    return this.spaceRepository.countByEvent(eventId);
  }
}