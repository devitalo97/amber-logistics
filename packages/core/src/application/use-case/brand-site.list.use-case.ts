import type { IUseCase } from "@repo/use-case";
import type { BrandSiteData } from "@/domain/brand-site/brand-site.entity";
import type { IBrandSiteRepository } from "@/domain/brand-site/brand-site.repository.interface";

interface IListBrandSiteUseCase extends IUseCase<void, BrandSiteData[]> {}

class ListBrandSiteUseCase implements IListBrandSiteUseCase {
	constructor(private readonly brandSiteRepository: IBrandSiteRepository) {}

	async execute(): Promise<BrandSiteData[]> {
		return await this.brandSiteRepository.findAll();
	}
}

export { type IListBrandSiteUseCase, ListBrandSiteUseCase };
