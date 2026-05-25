import {
	char,
	decimal,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { waypointTypeEnum } from "./enums";

export const waypointTable = pgTable("waypoint", {
	id: uuid().primaryKey().defaultRandom(),
	type: waypointTypeEnum(),

	latitude: decimal({ precision: 10, scale: 8 }).$type<number>().notNull(),
	longitude: decimal({ precision: 11, scale: 8 }).$type<number>().notNull(),

	country_code: char({ length: 2 }),
	city: varchar({ length: 150 }),
	address_line_1: varchar({ length: 200 }),
	address_line_2: varchar({ length: 200 }),
	postal_code: varchar({ length: 20 }),
	state: varchar({ length: 50 }),
	time_zone: varchar({ length: 50 }),

	created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
