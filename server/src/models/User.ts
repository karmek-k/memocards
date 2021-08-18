import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Deck } from './Deck';
import { Review } from './Review';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ select: false })
  password!: string;

  @OneToMany(() => Deck, deck => deck.author)
  @JoinTable()
  decks!: Deck[];

  @OneToMany(() => Review, review => review.user)
  reviews!: Review[];
}
