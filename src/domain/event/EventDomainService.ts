import { EventRepository } from "./EventRepository";

export class EventDomainService {
  constructor(private eventRepository: EventRepository) {}

  async getEvent(id: string) {
    return this.eventRepository.findById(id);
  }

  async getAllEvents() {
    return this.eventRepository.findMany();
  }

  async getLatestEvent() {
    return this.eventRepository.findLatest();
  }
}