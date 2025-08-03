import { BlockRepository } from "./BlockRepository";

export class BlockDomainService {
  constructor(private blockRepository: BlockRepository) {}

  async getBlock(eventId: string, blockName: string) {
    return this.blockRepository.findByEventAndName(eventId, blockName);
  }

  async getBlocksByEvent(eventId: string) {
    return this.blockRepository.findManyByEvent(eventId);
  }

  async getBlockNamesByEvent(eventId: string) {
    return this.blockRepository.findNamesByEvent(eventId);
  }
}