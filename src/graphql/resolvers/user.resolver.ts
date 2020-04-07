import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import RepoService from '../../services/repository/repo.service';
import User from 'src/db/models/user.entity';
import { UserInput } from './inputs/user.input';

@Resolver(() => User)
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async user(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): Promise<User> {
    const user = this.repoService.userRepo.create({ email: input.email });
    return this.repoService.userRepo.save(user);
  }
}

export default UserResolver;
