import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { brandSiteTable } from "./schema/brand-site.table";
import { productTable } from "./schema/product.table";
import { waypointTable } from "./schema/waypoint.table";

async function main() {
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) {
		throw new Error("DATABASE_URL is not set");
	}

	const client = postgres(connectionString, { max: 1 });
	const db = drizzle(client);

	console.log("Seeding waypoints...");
	const waypoints = await db
		.insert(waypointTable)
		.values([
			{
				type: "brand_site",
				latitude: 40.7128,
				longitude: -74.006,
				country_code: "US",
				city: "New York",
				address_line_1: "123 Commerce St",
				postal_code: "10001",
				state: "NY",
				time_zone: "America/New_York",
			},
			{
				type: "brand_site",
				latitude: 34.0522,
				longitude: -118.2437,
				country_code: "US",
				city: "Los Angeles",
				address_line_1: "456 Logistics Blvd",
				postal_code: "90001",
				state: "CA",
				time_zone: "America/Los_Angeles",
			},
			{
				type: "brand_site",
				latitude: 25.7617,
				longitude: -80.1918,
				country_code: "US",
				city: "Miami",
				address_line_1: "789 Ocean Dr",
				postal_code: "33101",
				state: "FL",
				time_zone: "America/New_York",
			},
			{
				type: "supplier",
				latitude: 22.5431,
				longitude: 114.0579,
				country_code: "CN",
				city: "Shenzhen",
				address_line_1: "100 Tech Park Road",
				postal_code: "518057",
				state: "Guangdong",
				time_zone: "Asia/Shanghai",
			},
			{
				type: "seaport",
				latitude: 33.7541,
				longitude: -118.2165,
				country_code: "US",
				city: "Long Beach",
				address_line_1: "925 Harbor Plaza",
				postal_code: "90802",
				state: "CA",
				time_zone: "America/Los_Angeles",
			},
			{
				type: "airport",
				latitude: 40.6413,
				longitude: -73.7781,
				country_code: "US",
				city: "New York",
				address_line_1: "Queens",
				postal_code: "11430",
				state: "NY",
				time_zone: "America/New_York",
			},
			{
				type: "logistic_hub",
				latitude: 41.8781,
				longitude: -87.6298,
				country_code: "US",
				city: "Chicago",
				address_line_1: "200 West Adams St",
				postal_code: "60606",
				state: "IL",
				time_zone: "America/Chicago",
			},
		])
		.returning({ id: waypointTable.id });

	console.log("Seeding brand sites...");
	await db.insert(brandSiteTable).values([
		{
			waypoint_id: waypoints[0]!.id,
			type: "warehouse",
			storage_capacity_cbm: 15000.0,
			operational_status: "active",
			name: "Main New York Warehouse",
		},
		{
			waypoint_id: waypoints[1]!.id,
			type: "distribution_center",
			storage_capacity_cbm: 25000.5,
			operational_status: "active",
			name: "West Coast Distribution Center",
		},
		{
			waypoint_id: waypoints[2]!.id,
			type: "retail_store",
			storage_capacity_cbm: 1200.0,
			operational_status: "active",
			name: "Miami Flagship Store",
		},
	]);

	console.log("Seeding products...");
	await db.insert(productTable).values([
		{
			name: "Ergonomic Office Chair",
			volume_cbm_per_unit: 0.15,
			weight_kg_per_unit: 15.5,
			sku: "FURN-CHAIR-001",
			thumbnail: "https://example.com/images/chair.png",
		},
		{
			name: "Standing Desk Pro",
			volume_cbm_per_unit: 0.25,
			weight_kg_per_unit: 32.0,
			sku: "FURN-DESK-002",
			thumbnail: "https://example.com/images/desk.png",
		},
		{
			name: "Wireless Mechanical Keyboard",
			volume_cbm_per_unit: 0.005,
			weight_kg_per_unit: 1.2,
			sku: "TECH-KEYB-001",
			thumbnail: "https://example.com/images/keyboard.png",
		},
		{
			name: 'Ultra-wide Monitor 34"',
			volume_cbm_per_unit: 0.08,
			weight_kg_per_unit: 8.5,
			sku: "TECH-MON-001",
			thumbnail: "https://example.com/images/monitor.png",
		},
	]);

	console.log("Seeding complete!");
	process.exit(0);
}

main().catch((err) => {
	console.error("Seed failed!");
	console.error(err);
	process.exit(1);
});
