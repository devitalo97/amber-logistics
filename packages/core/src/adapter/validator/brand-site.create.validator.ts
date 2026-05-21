import z from "zod";
import type { IBrandSiteCreateValidator } from "@/domain/brand-site/brand-site.create.validator.interface";
import {
	type BrandSiteEntityInput,
	BrandTypeEnum,
	OperationStatusEnum,
} from "@/domain/brand-site/brand-site.entity";

class BrandSiteCreateValidator implements IBrandSiteCreateValidator {
	private schema = z.object({
		type: z.enum(BrandTypeEnum),
		point_id: z.uuid(),
		storage_capacity_cbm: z.number().optional(),
		operational_status: z.enum(OperationStatusEnum),
		description: z.string(),
	});
	validate(input: BrandSiteEntityInput): void {
		this.schema.parse(input);
	}
}

export { BrandSiteCreateValidator };
