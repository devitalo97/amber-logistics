import type { ITimestampProvider } from "@/application/provider/timestamp-provider.interface";
import type { IIdProvider } from "@/application/provider/uuid-provider.interface";

export enum BrandTypeEnum {
	distribution_center = "distribution_center",
	warehouse = "warehouse",
	retail_store = "retail_store",
}

export enum OperationStatusEnum {
	active = "active",
	inactive = "inactive",
}

export type BrandSiteData = {
	id: string;
	point_id: string;
	type: BrandTypeEnum;
	storage_capacity_cbm?: number;
	operational_status: OperationStatusEnum;
	description: string;
	created_at: Date;
	updated_at: Date;
};

export type BrandSiteEntityInput = Omit<
	BrandSiteData,
	"id" | "created_at" | "updated_at"
>;

export type BrandSiteEntityUpdate = Partial<
	Omit<BrandSiteData, "id" | "created_at" | "updated_at">
>;

export class BrandSite {
	private data: BrandSiteData;

	private constructor(data: BrandSiteData) {
		this.data = data;
	}

	static create(
		input: BrandSiteEntityInput,
		uuidProvider: IIdProvider,
		timestampProvider: ITimestampProvider,
	) {
		const id = uuidProvider.generate();
		const created_at = new Date(timestampProvider.generate());
		const updated_at = new Date(timestampProvider.generate());

		const data: BrandSiteData = {
			...input,
			id,
			created_at,
			updated_at,
		};
		return new BrandSite(data);
	}

	update(input: BrandSiteEntityUpdate, dateProvider: ITimestampProvider) {
		const updated_at = new Date(dateProvider.generate());

		const cleanInput = Object.fromEntries(
			Object.entries(input).filter(([_, v]) => v !== undefined),
		);

		const data: BrandSiteData = {
			...this.data,
			...cleanInput,
			updated_at,
		};
		return new BrandSite(data);
	}

	toObject(): BrandSiteData {
		return {
			...this.data,
		};
	}
}
