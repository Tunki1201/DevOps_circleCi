import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable("courses")
    .addColumn("id", "integer", (col) => col.autoIncrement().primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("file", "varchar(255)")
    .execute();

  await db
    .insertInto("courses")
    .values({
      name: "Course 1",
    })
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable("courses").execute();
}
