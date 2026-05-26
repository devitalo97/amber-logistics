import type { PgTable } from "drizzle-orm/pg-core";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { IQuery } from "@/domain/@shared/query.interface";

export class QueryAll<TTable extends PgTable, TOutput>
	implements IQuery<void, TOutput[]>
{
	constructor(
		private readonly db: PostgresJsDatabase<Record<string, unknown>>,
		private readonly table: TTable,
	) {}

	async get(): Promise<TOutput[]> {
		const rows = await this.db.select().from(this.table as PgTable);
		return rows as unknown as TOutput[];
	}
}
