import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Card } from './Card';
import { Review } from './Review';
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

  @ManyToOne(() => User, { cascade: true })
  author!: User;

  @Column({ default: true })
  private!: boolean;

  @OneToMany(() => Review, review => review.deck)
  reviews!: Review[];
}
