import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1727483552092 implements MigrationInterface {
    name = 'Migration1727483552092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`task\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`date\` datetime NOT NULL,
                \`status\` varchar(255) NOT NULL DEFAULT 'PENDIENTE',
                UNIQUE INDEX \`IDX_20f1f21d6853d9d20d501636eb\` (\`name\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`ability\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`ability\` varchar(255) NOT NULL,
                \`personId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`person\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`fullname\` varchar(255) NOT NULL,
                \`age\` int NOT NULL,
                \`taskId\` int NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`ability\`
            ADD CONSTRAINT \`FK_2b507205d16a298b14b0a9cce44\` FOREIGN KEY (\`personId\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`person\`
            ADD CONSTRAINT \`FK_465efdc03146aa620a45ae2eb5b\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`person\` DROP FOREIGN KEY \`FK_465efdc03146aa620a45ae2eb5b\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`ability\` DROP FOREIGN KEY \`FK_2b507205d16a298b14b0a9cce44\`
        `);
        await queryRunner.query(`
            DROP TABLE \`person\`
        `);
        await queryRunner.query(`
            DROP TABLE \`ability\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_20f1f21d6853d9d20d501636eb\` ON \`task\`
        `);
        await queryRunner.query(`
            DROP TABLE \`task\`
        `);
    }

}
