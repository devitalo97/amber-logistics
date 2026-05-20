import type { TimestampProvider } from "@/application/timestamp-provider.interface.js";
import type { UUIDProvider } from "@/application/uuid-provider.interface.js";

export enum BrandTypeEnum {
	distribution_center = "distribution_center",
	warehouse = "warehouse",
	retail_store = "retail_store",
}

export enum OperationStatusEnum {
	active = "active",
	inactive = "inactive",
}

export interface IBrandSiteData {
	id: string;
	point_id: string;
	type: BrandTypeEnum;
	storage_capacity_cbm: number;
	operational_status: OperationStatusEnum;
	created_at: number;
	updated_at: number;
	description: string;
}

export type BrandSiteEntityInput = Omit<
	IBrandSiteData,
	"id" | "created_at" | "updated_at"
>;

export type BrandSiteEntityUpdate = Partial<IBrandSiteData>;

export class BrandSiteEntity {
	private data: IBrandSiteData;

	private constructor(data: IBrandSiteData) {
		this.data = data;
	}

	static create(
		input: BrandSiteEntityInput,
		uuidProvider: UUIDProvider,
		timestampProvider: TimestampProvider,
	) {
		const id = uuidProvider.generate();
		const created_at = timestampProvider.generate();
		const updated_at = timestampProvider.generate();
		const data: IBrandSiteData = {
			...input,
			id,
			created_at,
			updated_at,
		};
		return new BrandSiteEntity(data);
	}

	update(input: BrandSiteEntityUpdate, dateProvider: TimestampProvider) {
		const updated_at = dateProvider.generate();
		const data: IBrandSiteData = {
			...this.data,
			...input,
			updated_at,
		};
		return new BrandSiteEntity(data);
	}

	toObject() {
		return {
			...this.data,
			created_at: new Date(this.data.created_at),
			updated_at: new Date(this.data.updated_at),
		};
	}
}
