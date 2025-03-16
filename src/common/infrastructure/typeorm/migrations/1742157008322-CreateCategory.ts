import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategory1742157008322 implements MigrationInterface {
  name = "CreateCategory1742157008322";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payments_type_enum" AS ENUM('boleto', 'cartão')`
    );

    await queryRunner.query(`CREATE TABLE "payments" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "description" text NOT NULL,
            "type" "public"."payments_type_enum" NOT NULL,
            "day" numeric NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`CREATE TABLE "clients" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "cnpj" text NOT NULL,
            "social_reason" text NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`CREATE TABLE "products" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" text NOT NULL,
            "sku" text NOT NULL,
            "description" text NOT NULL,
            "price" numeric NOT NULL,
            "quantity" numeric NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`CREATE TABLE "categories" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "name" text NOT NULL,
            "description" text NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            "product_id" uuid,
            CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`ALTER TABLE "categories" 
            ADD CONSTRAINT "FK_categories_product_id" 
            FOREIGN KEY ("product_id") 
            REFERENCES "products"("id") 
            ON DELETE CASCADE 
            ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_categories_product_id"`
    );
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "clients"`);
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_type_enum"`);
  }
}
