import { container } from "@/infrastructure/di/Container";
import "server-only";

export const fetchHall = async (hallId: string) => {
  return container.hallDomainService.getHall(hallId);
};

export const fetchHalls = async (eventId: string) => {
  return container.hallDomainService.getHallsByEvent(eventId);
};

export const fetchHallIds = async (eventId: string) => {
  return container.hallDomainService.getHallIdsByEvent(eventId);
};