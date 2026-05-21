ALTER TABLE "waypoint" ALTER COLUMN "description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "waypoint" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "waypoint" ALTER COLUMN "country_code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "waypoint" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "waypoint" ALTER COLUMN "address_line_1" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "waypoint" ALTER COLUMN "postal_code" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "waypoint" ALTER COLUMN "state" DROP NOT NULL;