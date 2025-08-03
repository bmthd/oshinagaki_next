import { TweetRepository } from "@/domain/tweet/TweetRepository";
import { cacheDecorator } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import "server-only";

export class TweetMysqlRepository implements TweetRepository {
  @cacheDecorator({
    tags: ["fetchTweetUrl"],
  })
  async findUrlByEventAndCircle(eventId: string, circleName: string): Promise<string | null> {
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
  }
}
