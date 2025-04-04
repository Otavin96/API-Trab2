import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1743725410388 implements MigrationInterface {
    name = 'CreateDatabase1743725410388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cnpj" text NOT NULL, "social_reason" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
