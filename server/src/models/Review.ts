import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Answer } from './Answer';
import { Deck } from './Deck';
import { User } from './User';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { cascade: true })
  user!: User;

  @ManyToOne(() => Deck)
  deck!: Deck;

  @CreateDateColumn()
  date!: Date;

  @OneToMany(() => Answer, answer => answer.review)
  answers!: Answer[];
}
