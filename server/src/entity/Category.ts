import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  ManyToMany,
  JoinTable
  // TreeLevelColumn
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
  children: Category[];

  @TreeParent()
  parent: Category;

  @ManyToMany(
    () => Card,
    card => card.categories
  )
  @JoinTable()
  cards: Card[];
}
