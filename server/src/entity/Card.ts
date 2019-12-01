import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
    default: () => "LOCALTIMESTAMP"
  })
  created: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  updated: Date;
}
