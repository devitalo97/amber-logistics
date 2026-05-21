import {
	decimal,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";
import { brandSiteTypeEnum, operationalStatusEnum } from "./enums";
import { waypointTable } from "./waypoint.table";

export const brandSiteTable = pgTable("brand_site", {
	id: uuid().primaryKey().defaultRandom(),
	point_id: uuid()
		.notNull()
		.references(() => waypointTable.id, {
			onDelete: "cascade",
		}),
	type: brandSiteTypeEnum().notNull(),

	storage_capacity_cbm: decimal({ precision: 10, scale: 2 }).$type<number>(),

	operational_status: operationalStatusEnum().notNull().default("active"),

	description: varchar({ length: 255 }).notNull(),

	created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updated_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
