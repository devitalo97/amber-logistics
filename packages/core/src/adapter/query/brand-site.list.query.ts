import {
	type AnyColumn,
	and,
	asc,
	desc,
	eq,
	ilike,
	type SQL,
	sql,
} from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { PaginatedResult } from "@/domain/@shared/query.interface";
import type { BrandSiteData } from "@/domain/brand-site/brand-site.entity";
import type {
	BrandSiteListQueryParams,
	IBrandSiteListQuery,
} from "@/domain/brand-site/brand-site.query.interface";
import { waypointTable } from "@/infrastructure/db/drizzle/schema";
import { brandSiteTable as schema } from "@/infrastructure/db/drizzle/schema/brand-site.table";

export class BrandSiteListQuery implements IBrandSiteListQuery {
	constructor(
		private readonly db: PostgresJsDatabase<{
			brandSiteTable: typeof schema;
		}>,
	) {}

	async get(
		params: BrandSiteListQueryParams,
	): Promise<PaginatedResult<BrandSiteData>> {
		const conditions = [];

		if (params.name) {
			conditions.push(ilike(schema.name, `%${params.name}%`));
		}
		if (params.operational_status) {
			conditions.push(
				eq(
					schema.operational_status,
					params.operational_status as "active" | "inactive",
				),
			);
		}
		if (params.type) {
			conditions.push(
				eq(
					schema.type,
					params.type as "distribution_center" | "warehouse" | "retail_store",
				),
			);
		}

		const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

		let orderByClause: SQL | undefined;
		if (params.sortBy) {
			const column = schema[params.sortBy as keyof typeof schema] as AnyColumn;
			if (column) {
				orderByClause =
					params.sortOrder === "desc" ? desc(column) : asc(column);
			}
		}

		const countResult = await this.db
			.select({ count: sql<number>`cast(count(${schema.id}) as int)` })
			.from(schema)
			.where(whereClause);

		const count = countResult[0]?.count ?? 0;

		const limit = params.limit ?? 25;
		const offset = params.cursor ?? 0;

		const rows = await this.db
			.select({
				brandSite: schema,
				waypoint: waypointTable,
			})
			.from(schema)
			.leftJoin(waypointTable, eq(schema.waypoint_id, waypointTable.id))
			.where(whereClause)
			.orderBy(orderByClause ? orderByClause : asc(schema.created_at))
			.limit(limit)
			.offset(offset);

		const data = rows.map(({ brandSite, waypoint }) => ({
			...brandSite,
			waypoint: waypoint || null,
		})) as BrandSiteData[];

		const nextCursor =
			offset + limit < count ? (offset + limit).toString() : null;
		const previousCursor =
			offset - limit >= 0
				? (offset - limit).toString()
				: offset > 0
					? "0"
					: null;

		return {
			data,
			totalCount: count,
			nextCursor,
			previousCursor,
		};
	}
}
