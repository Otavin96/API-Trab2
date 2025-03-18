import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1742257841613 implements MigrationInterface {
    name = 'CreateProducts1742257841613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Criando tabela de categorias
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "name" text NOT NULL, 
                "description" text NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
            )
        `);

        // Criando tabela de produtos
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "name" text NOT NULL, 
                "sku" text NOT NULL, 
                "description" text NOT NULL, 
                "price" numeric(10,2) NOT NULL, 
                "quantity" integer NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "categoryId" uuid,
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);

        // Criando tabela de clientes
        await queryRunner.query(`
            CREATE TABLE "clients" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "cnpj" text NOT NULL, 
                "social_reason" text NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id")
            )
        `);

        // Criando ENUM para tipo de pagamento
        await queryRunner.query(`
            CREATE TYPE "public"."payments_type_enum" AS ENUM('boleto', 'cartão')
        `);

        // Criando tabela de pagamentos
        await queryRunner.query(`
            CREATE TABLE "payments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "description" text NOT NULL, 
                "type" "public"."payments_type_enum" NOT NULL, 
                "day" numeric NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id")
            )
        `);

        // Adicionando chave estrangeira correta (products → categories)
        await queryRunner.query(`
            ALTER TABLE "products" 
            ADD CONSTRAINT "FK_products_category" 
            FOREIGN KEY ("categoryId") 
            REFERENCES "categories"("id") 
            ON DELETE SET NULL 
            ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Removendo chave estrangeira de products → categories
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_products_category"`);

        // Removendo tabelas
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TYPE "public"."payments_type_enum"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }
}
