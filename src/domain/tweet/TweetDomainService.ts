import { TweetRepository } from "./TweetRepository";

export class TweetDomainService {
  constructor(private tweetRepository: TweetRepository) {}

  async getTweetUrlByEventAndCircle(eventId: string, circleName: string) {
    return this.tweetRepository.findUrlByEventAndCircle(eventId, circleName);
  }
}