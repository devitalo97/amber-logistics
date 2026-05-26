import type { IQuery, PaginatedResult } from "../@shared/query.interface";
import type { BrandSiteData } from "./brand-site.entity";

interface BrandSiteListQueryParams {
	name?: string;
	operational_status?: string;
	type?: string;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
	limit?: number;
	cursor?: number;
}

interface IBrandSiteListQuery
	extends IQuery<BrandSiteListQueryParams, PaginatedResult<BrandSiteData>> {}

export type { BrandSiteListQueryParams, IBrandSiteListQuery };
