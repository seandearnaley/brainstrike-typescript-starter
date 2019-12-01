import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "timestamp",
    nullable: false,
    default: () => "LOCALTIMESTAMP"
  })
  created: Date;

  @Column({ type: "timestamp", nullable: true, default: null })
  updated: Date;

  // @BeforeInsert()
  // async hashPasswordBeforeInsert() {
  //   this.password = await argon2.hash(this.password, { hashLength: 12 });
  // }
}
