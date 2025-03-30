import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1743296555152 implements MigrationInterface {
    name = 'CreateDatabase1743296555152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item-orders" DROP CONSTRAINT "FK_2e7c2a7e80526a59b1b522fe2f5"`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "valueTotal" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item-orders" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1457f286d91f271313fded23e53" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item-orders" ADD CONSTRAINT "FK_2e7c2a7e80526a59b1b522fe2f5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "item-orders" ADD CONSTRAINT "FK_7ab23c548a8d12f4cc1dff2070f" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item-orders" DROP CONSTRAINT "FK_7ab23c548a8d12f4cc1dff2070f"`);
        await queryRunner.query(`ALTER TABLE "item-orders" DROP CONSTRAINT "FK_2e7c2a7e80526a59b1b522fe2f5"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1457f286d91f271313fded23e53"`);
        await queryRunner.query(`ALTER TABLE "item-orders" DROP COLUMN "order_id"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`ALTER TABLE "item-orders" ADD CONSTRAINT "FK_2e7c2a7e80526a59b1b522fe2f5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
