import { MigrationInterface, QueryRunner } from "typeorm";

export class Lastnamenull1683584464947 implements MigrationInterface {
    name = 'Lastnamenull1683584464947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persons" ALTER COLUMN "lastName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "persons" ALTER COLUMN "address" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persons" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "persons" ALTER COLUMN "lastName" SET NOT NULL`);
    }

}
