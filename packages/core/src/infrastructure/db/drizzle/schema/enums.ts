import { pgEnum } from "drizzle-orm/pg-core";

export const waypointTypeEnum = pgEnum("waypoint_type", [
	"supplier",
	"brand_site",
	"seaport",
	"airport",
	"logistic_hub",
]);

export const brandSiteTypeEnum = pgEnum("brand_site_type", [
	"distribution_center",
	"warehouse",
	"retail_store",
]);

export const operationalStatusEnum = pgEnum("operational_status_type", [
	"active",
	"inactive",
]);
