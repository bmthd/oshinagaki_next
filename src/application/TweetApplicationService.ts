import { container } from "@/infrastructure/di/Container";
import "server-only";

export const fetchTweetUrl = async (eventId: string, circleName: string) => {
  return container.tweetDomainService.getTweetUrlByEventAndCircle(eventId, circleName);
};