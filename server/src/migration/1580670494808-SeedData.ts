import { MigrationInterface, QueryRunner } from "typeorm";

import { Card } from "../entity/Card";
import { Category } from "../entity/Category";
import * as fakeCategories from "../seed-data/fakeCategories.json";
import * as fakeCards from "../seed-data/fakeCards.json";

interface CategoryData {
  id: string;
  name: string;
  created: string;
  updated: string;
}

interface CardData {
  id: string;
  number: number;
  label: string;
  description: string;
  created: string;
  updated: string;
  category: { id: string; name: string } | null;
}

export class SeedData1580670494808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      // Use direct SQL for inserting categories
      for (const value of (
        fakeCategories as unknown as { default: CategoryData[] }
      ).default) {
        await queryRunner.query(
          `
          INSERT INTO category (id, name, created, updated)
          VALUES ($1, $2, $3, $4)
        `,
          [
            value.id,
            value.name,
            new Date(value.created),
            new Date(value.updated),
          ],
        );
      }

      // Use direct SQL for inserting cards
      for (const value of (fakeCards as unknown as { default: CardData[] })
        .default) {
        await queryRunner.query(
          `
          INSERT INTO card (id, number, label, description, created, updated)
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
          [
            value.id,
            value.number,
            value.label,
            value.description,
            new Date(value.created),
            new Date(value.updated),
          ],
        );

        // If card has a category, insert the relationship
        if (value.category) {
          await queryRunner.query(
            `
            INSERT INTO category_cards_card ("categoryId", "cardId")
            VALUES ($1, $2)
          `,
            [value.category.id, value.id],
          );
        }
      }

      console.log("Seed data inserted successfully");
    } catch (error) {
      console.error("Error in migration:", error);
    }
  }

  public async down(): Promise<void> {
    console.log("do nothing");
  }
}
