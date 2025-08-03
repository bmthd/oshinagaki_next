import { EventDomainService } from "@/domain/event/EventDomainService";
import { DayDomainService } from "@/domain/day/DayDomainService";
import { HallDomainService } from "@/domain/hall/HallDomainService";
import { BlockDomainService } from "@/domain/block/BlockDomainService";
import { DistrictDomainService } from "@/domain/district/DistrictDomainService";
import { CircleDomainService } from "@/domain/circle/CircleDomainService";
import { SpaceDomainService } from "@/domain/space/SpaceDomainService";
import { TweetDomainService } from "@/domain/tweet/TweetDomainService";

import { EventMysqlRepository } from "@/infrastructure/mysql/EventMysqlRepository";
import { DayMysqlRepository } from "@/infrastructure/mysql/DayMysqlRepository";
import { HallMysqlRepository } from "@/infrastructure/mysql/HallMysqlRepository";
import { BlockMysqlRepository } from "@/infrastructure/mysql/BlockMysqlRepository";
import { DistrictMysqlRepository } from "@/infrastructure/mysql/DistrictMysqlRepository";
import { CircleMysqlRepository } from "@/infrastructure/mysql/CircleMysqlRepository";
import { SpaceMysqlRepository } from "@/infrastructure/mysql/SpaceMysqlRepository";
import { TweetMysqlRepository } from "@/infrastructure/mysql/TweetMysqlRepository";

class Container {
  // Repositories
  private eventRepository = new EventMysqlRepository();
  private dayRepository = new DayMysqlRepository();
  private hallRepository = new HallMysqlRepository();
  private blockRepository = new BlockMysqlRepository();
  private districtRepository = new DistrictMysqlRepository();
  private circleRepository = new CircleMysqlRepository();
  private spaceRepository = new SpaceMysqlRepository();
  private tweetRepository = new TweetMysqlRepository();

  // Domain Services
  public readonly eventDomainService = new EventDomainService(this.eventRepository);
  public readonly dayDomainService = new DayDomainService(this.dayRepository);
  public readonly hallDomainService = new HallDomainService(this.hallRepository);
  public readonly blockDomainService = new BlockDomainService(this.blockRepository);
  public readonly districtDomainService = new DistrictDomainService(this.districtRepository);
  public readonly circleDomainService = new CircleDomainService(this.circleRepository);
  public readonly spaceDomainService = new SpaceDomainService(this.spaceRepository);
  public readonly tweetDomainService = new TweetDomainService(this.tweetRepository);
}

export const container = new Container();