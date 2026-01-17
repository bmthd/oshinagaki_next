import { DayRepository } from "./DayRepository";

export class DayDomainService {
  constructor(private dayRepository: DayRepository) {}

  async getDay(eventId: string, dayCount: number) {
    return this.dayRepository.findByEventAndCount(eventId, dayCount);
  }

  async getDaysByEvent(eventId: string) {
    return this.dayRepository.findManyByEvent(eventId);
  }

  async getDayCountsByEvent(eventId: string) {
    return this.dayRepository.findCountsByEvent(eventId);
  }
}