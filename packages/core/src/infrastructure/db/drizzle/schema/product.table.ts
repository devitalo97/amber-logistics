import {
	decimal,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const productTable = pgTable("product", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	volume_cbm_per_unit: decimal({ precision: 10, scale: 4 })
		.$type<number>()
		.notNull(),
	weight_kg_per_unit: decimal({ precision: 10, scale: 3 })
		.$type<number>()
		.notNull(),
	thumbnail: text(),
	sku: varchar({ length: 100 }).notNull().unique(),

	created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
