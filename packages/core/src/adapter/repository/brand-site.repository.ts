import { eq, inArray } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { BrandSiteData } from "@/domain/brand-site/brand-site.entity";
import type { IBrandSiteRepository } from "@/domain/brand-site/brand-site.repository.interface";
import { waypointTable } from "@/infrastructure/db/drizzle/schema";
import { brandSiteTable as schema } from "@/infrastructure/db/drizzle/schema/brand-site.table";

export class BrandSiteRepository implements IBrandSiteRepository {
	constructor(
		private readonly db: PostgresJsDatabase<{
			brandSiteTable: typeof schema;
		}>,
	) {}

	async create(data: BrandSiteData): Promise<void> {
		await this.db.insert(schema).values(data);
	}

	async update(id: string, data: BrandSiteData): Promise<void> {
		await this.db.update(schema).set(data).where(eq(schema.id, id));
	}

	async delete(id: string): Promise<void> {
		await this.db.delete(schema).where(eq(schema.id, id));
	}

	async findOneById(id: string): Promise<BrandSiteData | null> {
		const rows = await this.db
			.select({
				brandSite: schema,
				waypoint: waypointTable,
			})
			.from(schema)
			.leftJoin(waypointTable, eq(schema.waypoint_id, waypointTable.id))
			.where(eq(schema.id, id));

		const row = rows[0];

		if (!row) {
			return null;
		}

		const { brandSite, waypoint } = row;

		return {
			...brandSite,
			waypoint: waypoint || null,
		} as BrandSiteData;
	}

	async findManyById(ids: string[]): Promise<BrandSiteData[]> {
		const rows = await this.db
			.select({
				brandSite: schema,
				waypoint: waypointTable,
			})
			.from(schema)
			.leftJoin(waypointTable, eq(schema.waypoint_id, waypointTable.id))
			.where(inArray(schema.id, ids));

		if (!rows || rows.length === 0) {
			return [];
		}

		return rows.map(({ brandSite, waypoint }) => ({
			...brandSite,
			waypoint: waypoint || null,
		})) as BrandSiteData[];
	}
}
