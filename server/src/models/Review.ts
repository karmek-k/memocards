import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Answer } from './Answer';
import { Deck } from './Deck';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Deck)
  deck!: Deck;

  @CreateDateColumn()
  date!: Date;

  @OneToMany(() => Answer, answer => answer.review)
  answers!: Answer[];
}
