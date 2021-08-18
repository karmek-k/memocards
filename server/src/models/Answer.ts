import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './Card';
import { Review } from './Review';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Review, { cascade: true })
  review!: Review;

  @ManyToOne(() => Card)
  card!: Card;

  @Column()
  correct!: boolean;
}
