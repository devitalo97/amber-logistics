import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { WaypointData } from "@/domain/waypoint/waypoint.entity";
import type { IWaypointRepository } from "@/domain/waypoint/waypoint.repository.interface";
import { waypointTable as schema } from "@/infrastructure/db/drizzle/schema/waypoint.table";

export class WaypointRepository implements IWaypointRepository {
	constructor(
		private readonly db: PostgresJsDatabase<{
			waypoint: typeof schema;
		}>,
	) {}

	async create(data: WaypointData): Promise<void> {
		await this.db.insert(schema).values(data);
	}

	async update(id: string, data: WaypointData): Promise<void> {
		await this.db.update(schema).set(data).where(eq(schema.id, id));
	}

	async delete(id: string): Promise<void> {
		await this.db.delete(schema).where(eq(schema.id, id));
	}

	async findOne(id: string): Promise<WaypointData | null> {
		const rows = await this.db.select().from(schema).where(eq(schema.id, id));

		if (!rows || rows.length === 0) {
			return null;
		}

		return rows[0] as WaypointData;
	}
}
