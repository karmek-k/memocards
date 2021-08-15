import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Deck } from './Deck';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Deck)
  deck!: Deck;

  @CreateDateColumn()
  date!: Date;
}
