import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1744490983151 implements MigrationInterface {
    name = 'CreateDatabase1744490983151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."clients_roles_enum" AS ENUM('admin', 'client')`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "roles" "public"."clients_roles_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "roles"`);
        await queryRunner.query(`DROP TYPE "public"."clients_roles_enum"`);
    }

}
