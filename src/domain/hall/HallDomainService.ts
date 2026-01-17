import { HallRepository } from "./HallRepository";

export class HallDomainService {
  constructor(private hallRepository: HallRepository) {}

  async getHall(id: string) {
    return this.hallRepository.findById(id);
  }

  async getHallsByEvent(eventId: string) {
    return this.hallRepository.findManyByEvent(eventId);
  }

  async getHallIdsByEvent(eventId: string) {
    return this.hallRepository.findIdsByEvent(eventId);
  }
}