import { fetchTweetUrl } from "@/services/apiService";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  // parameterとしてサークル名を受け取り、そのサークルのツイートURLを返す。
  const { searchParams } = new URL(req.url);
  const circleName = searchParams.get("circleName");
  const eventId = searchParams.get("eventId");
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
