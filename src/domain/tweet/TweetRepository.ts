export interface TweetRepository {
  findUrlByEventAndCircle(eventId: string, circleName: string): Promise<string | null>;
}