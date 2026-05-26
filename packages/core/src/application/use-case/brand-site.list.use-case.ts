import type { IUseCase } from "@repo/use-case";
import type { PaginatedResult } from "@/domain/@shared/query.interface";
import type { BrandSiteData } from "@/domain/brand-site/brand-site.entity";
import type {
	BrandSiteListQueryParams,
	IBrandSiteListQuery,
} from "@/domain/brand-site/brand-site.query.interface";

interface IListBrandSiteUseCase
	extends IUseCase<BrandSiteListQueryParams, PaginatedResult<BrandSiteData>> {}

class ListBrandSiteUseCase implements IListBrandSiteUseCase {
	constructor(private readonly brandSiteListQuery: IBrandSiteListQuery) {}

	async execute(
		params: BrandSiteListQueryParams,
	): Promise<PaginatedResult<BrandSiteData>> {
		return await this.brandSiteListQuery.get(params);
	}
}

export { type IListBrandSiteUseCase, ListBrandSiteUseCase };
