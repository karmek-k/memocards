import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './Card';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Card, card => card.deck)
  cards!: Card[];
}
