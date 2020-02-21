import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  ManyToMany,
  JoinTable
} from "typeorm";

import { Card } from "./Card";

@Entity()
@Tree("closure-table")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @TreeChildren()
  children?: Category[];

  @TreeParent()
  parent: Category;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "LOCALTIMESTAMP"
  })
  created: Date;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "LOCALTIMESTAMP"
  })
  updated: Date;

  @ManyToMany(
    () => Card,
    card => card.categories
  )
  @JoinTable()
  cards: Card[];
}
