import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Deck } from './Deck';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @OneToMany(() => Deck, deck => deck.author)
  @JoinTable()
  decks!: Deck[];
}
