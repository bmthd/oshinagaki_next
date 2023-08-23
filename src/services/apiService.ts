import { cache } from "@/lib/nextCache";
import prisma from "@/lib/prisma";
import "server-only";

export const fetchTweetUrl = async (eventId: string, circleName: string) => {
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
      return space.tweet?.url;
    },
    { tags: ["fetchTweetUrl", `fetchTweetUrl:${eventId}:${circleName}`] }
  );
};
