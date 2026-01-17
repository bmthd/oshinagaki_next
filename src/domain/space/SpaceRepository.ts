export interface SpaceRepository {
  countByEvent(eventId: string): Promise<number>;
  findManyByBlock(
    eventId: string,
    dayCount: number,
    blockName: string,
    pageNumber: number,
    pageSize: number
  ): Promise<SpaceWithRelations[]>;
  findManyByHall(
    eventId: string,
    dayCount: number,
    hallId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<SpaceWithRelations[]>;
  findManyByLanking(
    eventId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<SpaceWithRelations[]>;
  findManyByUpdate(
    eventId: string,
    pageNumber: number,
    pageSize: number
  ): Promise<SpaceWithRelations[]>;
  findManyByCircle(circleId: number): Promise<SpaceWithRelations[]>;
  countByBlock(eventId: string, dayCount: number, blockName: string): Promise<number>;
  countByHall(eventId: string, dayCount: number, hallId: string): Promise<number>;
  countByEvent(eventId: string): Promise<number>;
}

export type SpaceWithRelations = {
  id: number;
  spaceNumber: number;
  ab: string | null;
  circleId: number | null;
  block: {
    name: string;
    hall: {
      id: string;
      name: string;
    } | null;
  } | null;
  circle: {
    id: number;
    name: string | null;
    author: string | null;
    pixivUrl: string | null;
    hpUrl: string | null;
    twitterId: string | null;
  } | null;
  day: {
    id: number;
    count: number;
    event: {
      id: string;
      name: string;
    };
  } | null;
  tweet: {
    id: number;
    url: string | null;
    retweets: number;
    createdAt: Date | null;
    text: string | null;
    spaceId: number | null;
    authorName: string | null;
    authorId: string | null;
    favs: number;
    error: boolean;
  } | null;
};