import { DistrictRepository } from "./DistrictRepository";

export class DistrictDomainService {
  constructor(private districtRepository: DistrictRepository) {}

  async getDistrictsByEvent(eventId: string) {
    return this.districtRepository.findManyByEvent(eventId);
  }
}