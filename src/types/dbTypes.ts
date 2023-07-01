export type District = {
  id: number;
  name: string;
  halls: string[];
};

export type Block = {
  id: number;
  name?: string | null;
  eventId?: string | null;
  hallId: string;
  isWall: boolean;
  hall: Hall;
  event?: Event | null;
};

export type Circle = {
  id: number;
  author?: string | null;
  hpUrl?: string | null;
  name: string;
  pixivUrl?: string | null;
  twitterId?: string | null;
};

export type Day = {
  id: number;
  dayCount: number;
  eventId?: string | null;
  event?: Event | null;
};

export type Event = {
  id: string;
  eventName: string;
  venueId?: number | null;
  lastDate: Date;
  startDate: Date;
  url: string;
  venue?: Venue;
};

export type FFUser = {
  id: string;
  follower: boolean;
  following: boolean;
  name: string;
  twitterId: string;
  loginUser: LoginUser;
};

export type Hall = {
  id: string;
  name: string;
};

export type LoginUser = {
  id: string;
  displayName: string;
  name: string;
  profileImageUrl: string;
  lastUpdate: string;
};

export type Space = {
  id: number;
  ab?: string | null;
  genre?: string | null;
  spaceNumber: number;
  webCatalogUrl?: string | null;
  blockId?: number | null;
  circleId?: number | null;
  dayId?: number | null;
  block: Block;
  circle: Circle;
  day: Day;
};

export type Tweet = {
  id: number;
  text: string;
  spaceId?: number | null;
  url: string;
  authorName: string;
  authorId: string;
  createdAt: string;
  favs: number;
  retweets: number;
  error: boolean;
  space: Space;
};

export type Venue = {
  id: number;
};

export type Query = {
  blocks?: (Block | null)[] | null;
  circles?: (Circle | null)[] | null;
  days?: (Day | null)[] | null;
  events?: (Event | null)[] | null;
  ffUsers?: (FFUser | null)[] | null;
  halls?: (Hall | null)[] | null;
  loginUsers?: (LoginUser | null)[] | null;
  spaces?: (Space | null)[] | null;
  tweets?: (Tweet | null)[] | null;
  venues?: (Venue | null)[] | null;
};
