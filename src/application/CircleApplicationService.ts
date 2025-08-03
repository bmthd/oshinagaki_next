import { container } from "@/infrastructure/di/Container";
import "server-only";

export const fetchCircle = async (circleId: number) => {
  return container.circleDomainService.getCircle(circleId);
};

export const fetchCircleIds = async () => {
  return container.circleDomainService.getAllCircleIds();
};