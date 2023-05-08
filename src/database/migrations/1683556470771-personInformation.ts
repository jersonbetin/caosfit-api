import { MigrationInterface, QueryRunner } from "typeorm";

export class PersonInformation1683556470771 implements MigrationInterface {
    name = 'PersonInformation1683556470771'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "persons" ("create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "address" character varying(255) NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "REL_114ed4a43ad36502663f8fde31" UNIQUE ("user_id"), CONSTRAINT "PK_74278d8812a049233ce41440ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "persons" ADD CONSTRAINT "FK_114ed4a43ad36502663f8fde31a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "persons" DROP CONSTRAINT "FK_114ed4a43ad36502663f8fde31a"`);
        await queryRunner.query(`DROP TABLE "persons"`);
    }

}
