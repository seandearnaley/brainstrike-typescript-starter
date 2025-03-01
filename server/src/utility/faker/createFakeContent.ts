import { faker } from "@faker-js/faker";
import fs = require("fs");

faker.seed(12345); // ensures reproducible results

const fakeCategories = [];
const fakeCards = [];

const numberOfCategories = 1000;
const numberOfCards = 10000;

for (let i = 0; i < numberOfCategories; i++) {
  const createdUpdated = faker.date.recent();

  fakeCategories.push({
    id: faker.string.uuid(),
    name: `${faker.commerce.department()} ${faker.number.int(1000)}`,
    created: createdUpdated,
    updated: createdUpdated,
  });
}

for (let i = 0; i < numberOfCards; i++) {
  const createdUpdated = faker.date.recent();

  fakeCards.push({
    id: faker.string.uuid(),
    number: faker.number.int(1000),
    label: faker.lorem.words(),
    description: faker.lorem.sentence(),
    created: createdUpdated,
    updated: createdUpdated,
    category:
      i % 15 === 0 // if divisible by 15 set to null, random null distribution
        ? null
        : fakeCategories[
            Math.floor(Math.random() * Math.floor(numberOfCategories - 1)) // associate with a random category ID
          ],
  });
}

fs.writeFile(
  "seed-data/fakeCategories.json",
  JSON.stringify(fakeCategories),
  (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("fakeCategories.json was saved!");
  },
);

fs.writeFile("seed-data/fakeCards.json", JSON.stringify(fakeCards), (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("fakeCards.json file was saved!");
});
