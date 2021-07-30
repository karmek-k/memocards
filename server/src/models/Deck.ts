import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Card } from './Card';
import { User } from './User';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('text', { nullable: true })
  description!: string;

  @OneToMany(() => Card, card => card.deck)
  cards!: Card[];

  @ManyToMany(() => User)
  users!: User[];
}
