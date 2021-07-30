import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from './Deck';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('text')
  front!: string;

  @Column('text')
  back!: string;

  @ManyToOne(() => Deck, deck => deck.cards)
  deck!: Deck;
}
