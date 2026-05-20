CREATE TYPE "public"."brand_site_type" AS ENUM('distribution_center', 'warehouse', 'retail_store');--> statement-breakpoint
CREATE TYPE "public"."operational_status_type" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."waypoint_type" AS ENUM('supplier', 'brand_site', 'seaport', 'airport', 'logistic_hub');--> statement-breakpoint
CREATE TABLE "brand_site" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"point_id" uuid NOT NULL,
	"type" "brand_site_type" NOT NULL,
	"storage_capacity_cbm" numeric(10, 2),
	"operational_status" "operational_status_type" DEFAULT 'active' NOT NULL,
	"description" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "waypoint" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" varchar(255) NOT NULL,
	"type" "waypoint_type" NOT NULL,
	"latitude" numeric(10, 8) NOT NULL,
	"longitude" numeric(11, 8) NOT NULL,
	"country_code" char(2) NOT NULL,
	"city" varchar(150) NOT NULL,
	"address_line_1" varchar(200) NOT NULL,
	"address_line_2" varchar(200),
	"postal_code" varchar(20) NOT NULL,
	"state" varchar(50) NOT NULL,
	"time_zone" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "brand_site" ADD CONSTRAINT "brand_site_point_id_waypoint_id_fk" FOREIGN KEY ("point_id") REFERENCES "public"."waypoint"("id") ON DELETE cascade ON UPDATE no action;