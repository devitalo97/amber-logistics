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
	id: uuid("id").primaryKey().defaultRandom(),
	pointId: uuid("point_id")
		.notNull()
		.references(() => waypointTable.id, {
			onDelete: "cascade",
		}),
	type: brandSiteTypeEnum("type").notNull(),

	storageCapacityCbm: decimal("storage_capacity_cbm", {
		precision: 10,
		scale: 2,
	}).$type<number>(),

	operationalStatus: operationalStatusEnum("operational_status")
		.notNull()
		.default("active"),

	description: varchar("description", { length: 255 }).notNull(),

	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
