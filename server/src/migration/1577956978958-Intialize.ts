import { MigrationInterface, QueryRunner } from "typeorm";

export class Intialize1577956978958 implements MigrationInterface {
  name = "Intialize1577956978958";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user"
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          name character varying COLLATE pg_catalog."default" NOT NULL,
          email character varying COLLATE pg_catalog."default" NOT NULL,
          username character varying COLLATE pg_catalog."default" NOT NULL,
          password character varying COLLATE pg_catalog."default" NOT NULL,
          created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          updated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE card
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          "number" integer NOT NULL,
          label character varying COLLATE pg_catalog."default" NOT NULL,
          description text COLLATE pg_catalog."default" NOT NULL,
          created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          updated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE category
      (
          id uuid NOT NULL DEFAULT uuid_generate_v4(),
          name character varying COLLATE pg_catalog."default" NOT NULL,
          created timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          updated timestamp without time zone NOT NULL DEFAULT LOCALTIMESTAMP,
          "parentId" uuid,
          CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id),
          CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId")
              REFERENCES category (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE TABLE category_cards_card
      (
          "categoryId" uuid NOT NULL,
          "cardId" uuid NOT NULL,
          CONSTRAINT "PK_792acbbb01fceb7e4d2f290cd92" PRIMARY KEY ("categoryId", "cardId"),
          CONSTRAINT "FK_2dde47fd384ba7a3de061c7a5ff" FOREIGN KEY ("categoryId")
              REFERENCES category (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE CASCADE,
          CONSTRAINT "FK_ed1c03f6d065efce129513f6a66" FOREIGN KEY ("cardId")
              REFERENCES card (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE CASCADE
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_2dde47fd384ba7a3de061c7a5f"
      ON category_cards_card USING btree
      ("categoryId" ASC NULLS LAST)
      TABLESPACE pg_default;
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_ed1c03f6d065efce129513f6a6"
      ON category_cards_card USING btree
      ("cardId" ASC NULLS LAST)
      TABLESPACE pg_default;
    `);

    await queryRunner.query(`
      CREATE TABLE category_closure
      (
          id_ancestor uuid NOT NULL,
          id_descendant uuid NOT NULL,
          CONSTRAINT "PK_8da8666fc72217687e9b4f4c7e9" PRIMARY KEY (id_ancestor, id_descendant),
          CONSTRAINT "FK_4aa1348fc4b7da9bef0fae8ff48" FOREIGN KEY (id_ancestor)
              REFERENCES category (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION,
          CONSTRAINT "FK_6a22002acac4976977b1efd114a" FOREIGN KEY (id_descendant)
              REFERENCES category (id) MATCH SIMPLE
              ON UPDATE NO ACTION
              ON DELETE NO ACTION
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4"
      ON category_closure USING btree
      (id_ancestor ASC NULLS LAST)
      TABLESPACE pg_default;
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_6a22002acac4976977b1efd114"
      ON category_closure USING btree
      (id_descendant ASC NULLS LAST)
      TABLESPACE pg_default;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_6a22002acac4976977b1efd114"`);
    await queryRunner.query(`DROP INDEX "IDX_4aa1348fc4b7da9bef0fae8ff4"`);
    await queryRunner.query(`DROP TABLE "category_closure"`);
    await queryRunner.query(`DROP INDEX "IDX_ed1c03f6d065efce129513f6a6"`);
    await queryRunner.query(`DROP INDEX "IDX_2dde47fd384ba7a3de061c7a5f"`);
    await queryRunner.query(`DROP TABLE "category_cards_card"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
