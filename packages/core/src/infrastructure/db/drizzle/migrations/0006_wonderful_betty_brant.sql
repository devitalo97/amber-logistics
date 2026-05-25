ALTER TABLE "brand_site" RENAME COLUMN "point_id" TO "waypoint_id";--> statement-breakpoint
ALTER TABLE "brand_site" DROP CONSTRAINT "brand_site_point_id_waypoint_id_fk";
--> statement-breakpoint
ALTER TABLE "brand_site" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "brand_site" ADD COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "brand_site" ADD CONSTRAINT "brand_site_waypoint_id_waypoint_id_fk" FOREIGN KEY ("waypoint_id") REFERENCES "public"."waypoint"("id") ON DELETE cascade ON UPDATE no action;