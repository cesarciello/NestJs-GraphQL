import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import User from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'message' })
export default class Message {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column()
  content: string;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => User)
  user: User;

  // Associations

  @ManyToOne(
    () => User,
    user => user.messageConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  userConnection: Promise<User>;
}
