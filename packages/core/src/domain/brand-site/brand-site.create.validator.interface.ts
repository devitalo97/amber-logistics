import type { ValidatorProvider } from "@/domain/@shared/validator.interface";
import type { BrandSiteEntityInput } from "@/domain/brand-site/brand-site.entity";

export interface IBrandSiteCreateValidator
	extends ValidatorProvider<BrandSiteEntityInput> {}
