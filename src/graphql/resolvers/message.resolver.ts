import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import RepoService from '../../services/repository/repo.service';
import Message from 'src/db/models/message.entity';
import { MessageInput } from './inputs/user.input';
import User from 'src/db/models/user.entity';

@Resolver(() => Message)
export default class MessageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Message])
  public async messages(): Promise<Message[]> {
    return this.repoService.messageRepo.find();
  }

  @Query(() => Message)
  public async messageFromUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
   this.repoService.messageRepo.find({
      where: { userId: userId },
    }).then(data => console.log(data)).catch(err => console.log(err));
    return await this.repoService.messageRepo.find({
      where: { userId: userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async message(@Args('id') id: number): Promise<Message> {
    return this.repoService.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('messageData') input: MessageInput,
  ): Promise<Message> {
    const message = this.repoService.messageRepo.create();
    message.content = input.content;
    message.userId = input.user.connect.id;
    return this.repoService.messageRepo.save(message);
  }

  @ResolveField(() => User)
  public async user(@Parent() parent): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}
