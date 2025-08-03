import { container } from "@/infrastructure/di/Container";
import "server-only";

export const fetchEvent = async (id: string) => {
  return container.eventDomainService.getEvent(id);
};

export const fetchEvents = async () => {
  return container.eventDomainService.getAllEvents();
};

export const fetchLatestEvent = async () => {
  return container.eventDomainService.getLatestEvent();
};

export const fetchEventIds = async () => {
  const events = await container.eventDomainService.getAllEvents();
  return events.map((event) => event.id);
};