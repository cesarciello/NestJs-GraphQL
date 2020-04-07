import { Injectable } from '@nestjs/common';
import RepoService from './services/repository/repo.service';

@Injectable()
export class AppService {
  
  constructor(private readonly repoService: RepoService) {

  }

  async getHello(): Promise<string> { // querying database
    return `Total books are ${await this.repoService.userRepo.count()}`;
  }
}
