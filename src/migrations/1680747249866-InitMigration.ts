import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1680747249866 implements MigrationInterface {
    name = 'InitMigration1680747249866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Profile" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "age" integer NOT NULL, "phone" character varying NOT NULL, CONSTRAINT "PK_89dff233f744d59758158aca1d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Auth" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "profileId" integer, CONSTRAINT "REL_0f395e74ee03f742a9f2d60302" UNIQUE ("profileId"), CONSTRAINT "PK_fee4a2ee6693dbef79c39ff336d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "File" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "originalname" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, "createdAt" TIMESTAMP, "essenceTable" character varying, "essenceId" integer, CONSTRAINT "PK_b287aa0a177c20740f3d917e38f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "TextBlock" ("id" SERIAL NOT NULL, "uniqueName" character varying NOT NULL, "title" character varying NOT NULL, "image" character varying, "text" character varying NOT NULL, "group" character varying NOT NULL, CONSTRAINT "PK_015793a3ed0564f96f4e4e0d057" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Auth" ADD CONSTRAINT "FK_0f395e74ee03f742a9f2d603028" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Auth" DROP CONSTRAINT "FK_0f395e74ee03f742a9f2d603028"`);
        await queryRunner.query(`DROP TABLE "TextBlock"`);
        await queryRunner.query(`DROP TABLE "File"`);
        await queryRunner.query(`DROP TABLE "Auth"`);
        await queryRunner.query(`DROP TABLE "Profile"`);
    }

}
