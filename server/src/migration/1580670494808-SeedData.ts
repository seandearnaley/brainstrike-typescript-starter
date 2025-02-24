import { MigrationInterface, QueryRunner } from "typeorm";

import { Card, Category } from "../entity";
import * as fakeCategories from "../seed-data/fakeCategories.json";
import * as fakeCards from "../seed-data/fakeCards.json";

export class SeedData1580670494808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const categoryRepo = queryRunner.manager.getRepository(Category);
    const cardRepo = queryRunner.manager.getRepository(Card);

    const CategorySeed = fakeCategories.reduce((acc, value) => {
      const category = new Category();
      category.id = value.id;
      category.name = value.name;
      category.created = new Date(value.created);
      category.updated = new Date(value.updated);
      return [...acc, category];
    }, [] as Category[]);

    const CardSeed = fakeCards.reduce((acc, value) => {
      const card = new Card();
      card.id = value.id;
      card.number = value.number;
      card.label = value.label;
      card.description = value.description;
      card.created = new Date(value.created);
      card.updated = new Date(value.updated);

      const category = value.category
        ? CategorySeed.find(
            (category: Category) => category.id === value.category.id
          )
        : null;

      card.categories = category ? [category] : [];

      return [...acc, card];
    }, [] as Card[]);

    await categoryRepo.save(CategorySeed);
    await cardRepo.save(CardSeed);
  }

  public async down(): Promise<void> {
    console.log("do nothing");
  }
}
