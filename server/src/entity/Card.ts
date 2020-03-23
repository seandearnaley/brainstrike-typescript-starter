import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  number: number;

  @Column()
  label: string;

  @Column("text")
  description: string;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "LOCALTIMESTAMP",
  })
  created: Date;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "LOCALTIMESTAMP",
  })
  updated: Date;

  @ManyToMany(() => Category, (category) => category.cards)
  categories: Category[];
}
