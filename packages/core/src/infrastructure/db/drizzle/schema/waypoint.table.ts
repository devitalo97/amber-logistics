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
	id: uuid("id").primaryKey().defaultRandom(),
	description: varchar("description", { length: 255 }).notNull(),
	type: waypointTypeEnum("type").notNull(),

	latitude: decimal("latitude", { precision: 10, scale: 8 })
		.$type<number>()
		.notNull(),
	longitude: decimal("longitude", { precision: 11, scale: 8 })
		.$type<number>()
		.notNull(),

	countryCode: char("country_code", { length: 2 }).notNull(),
	city: varchar("city", { length: 150 }).notNull(),
	addressLine1: varchar("address_line_1", { length: 200 }).notNull(),
	addressLine2: varchar("address_line_2", { length: 200 }),
	postalCode: varchar("postal_code", { length: 20 }).notNull(),
	state: varchar("state", { length: 50 }).notNull(),
	timeZone: varchar("time_zone", { length: 50 }),

	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
