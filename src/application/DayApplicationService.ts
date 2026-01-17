import { container } from "@/infrastructure/di/Container";
import "server-only";

export const fetchDay = async (eventId: string, dayCount: number) => {
  return container.dayDomainService.getDay(eventId, dayCount);
};

export const fetchDays = async (eventId: string) => {
  return container.dayDomainService.getDaysByEvent(eventId);
};

export const fetchDayCounts = async (eventId: string) => {
  return container.dayDomainService.getDayCountsByEvent(eventId);
};