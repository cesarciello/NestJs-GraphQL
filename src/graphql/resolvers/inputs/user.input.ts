import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UserInput {
    @Field()
    readonly email: string;
}

@InputType()
class UserMessageConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class MessageUserInput {
  @Field({nullable: true})
  readonly connect: UserMessageConnectInput;

  @Field({nullable: true})
  readonly create: UserInput;

}

@InputType()
export class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly user: MessageUserInput;
}
