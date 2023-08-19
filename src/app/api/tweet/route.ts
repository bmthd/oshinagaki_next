import { fetchTweetUrl } from "@/services/apiService";
import { NextResponse } from "next/server";

/**
 * イベントIDとサークル名を受け取り、そのサークルのツイートURLを返す。
 * @param req
 * @returns
 */
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const circleName = searchParams.get("circle_name");
  const eventId = searchParams.get("event_id");
  if (!circleName || !eventId) {
    return NextResponse.json({
      error: true,
      message: "circleName or eventId is not specified",
    });
  }
  const tweetUrl = await fetchTweetUrl(eventId, circleName);
  if (!tweetUrl) {
    return NextResponse.json({
      error: true,
      message: "tweetUrl is not found",
    });
  }
  return new Response(tweetUrl, {
    headers: {
      "content-type": "text/plain",
    },
  });
};
