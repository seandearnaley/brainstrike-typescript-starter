import {MigrationInterface, QueryRunner} from "typeorm";

export class Intialize1577956978958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        // console.log('hello');
        
        const buildDateTime = new Date();
        await queryRunner.query(
          `INSERT INTO card (id, number, label, description, created, updated) VALUES
            ('bc1f54d7-b8d7-4e81-85c0-49bbfeab1bc5', 1, 'Card 1', 'Card 1 Description', current_timestamp, current_timestamp),
            ('892ffe70-3c08-430b-a80d-3375a1489e4d', 2, 'Card 2', 'Card 2 Description', current_timestamp, current_timestamp);`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}


