import { CircleRepository } from "./CircleRepository";

export class CircleDomainService {
  constructor(private circleRepository: CircleRepository) {}

  async getCircle(id: number) {
    return this.circleRepository.findById(id);
  }

  async getAllCircleIds() {
    return this.circleRepository.findAllIds();
  }
}