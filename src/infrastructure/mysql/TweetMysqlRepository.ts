import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import { TweetRepository } from "@/domain/tweet/TweetRepository";
import "server-only";

export class TweetMysqlRepository implements TweetRepository {
  async findUrlByEventAndCircle(eventId: string, circleName: string): Promise<string | null> {
    return cache(
      async () => {
        const space = await prisma.spaceView.findFirstOrThrow({
          select: {
            tweet: {
              select: {
                url: true,
              },
            },
          },
          where: {
            day: {
              event: {
                id: eventId,
              },
            },
            circle: {
              name: circleName,
            },
          },
        });
        return space.tweet?.url ?? null;
      },
      { tags: ["fetchTweetUrl", `fetchTweetUrl:${eventId}:${circleName}`] }
    )();
  }
}