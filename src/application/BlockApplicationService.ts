import { container } from "@/infrastructure/di/Container";
import "server-only";

export const fetchBlock = async (eventId: string, blockName: string) => {
  return container.blockDomainService.getBlock(eventId, blockName);
};

export const fetchBlocks = async (eventId: string) => {
  return container.blockDomainService.getBlocksByEvent(eventId);
};

export const fetchBlockNames = async (eventId: string) => {
  return container.blockDomainService.getBlockNamesByEvent(eventId);
};