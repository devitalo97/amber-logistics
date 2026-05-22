export enum BrandTypeEnum {
	distribution_center = "distribution_center",
	warehouse = "warehouse",
	retail_store = "retail_store",
}

export enum OperationStatusEnum {
	active = "active",
	inactive = "inactive",
}

export enum WaypointTypeEnum {
	supplier = "supplier",
	brand_site = "brand_site",
	seaport = "seaport",
	airport = "airport",
	logistic_hub = "logistic_hub",
}

export interface UseCaseInput {
	brandSite: {
		type: BrandTypeEnum;
		storage_capacity_cbm?: number;
		operational_status: OperationStatusEnum;
		description: string;
	};
	waypoint: {
		description: string | null;
		type: WaypointTypeEnum;
		latitude: number;
		longitude: number;
		country_code: string | null;
		city: string | null;
		address_line_1: string | null;
		address_line_2?: string | null;
		postal_code: string | null;
		state: string | null;
		time_zone?: string | null;
	};
}

export const BRAND_TYPE_LABELS: Record<BrandTypeEnum, string> = {
	[BrandTypeEnum.distribution_center]: "Centro de Distribuição",
	[BrandTypeEnum.warehouse]: "Armazém",
	[BrandTypeEnum.retail_store]: "Loja de Varejo",
};

export const OPERATION_STATUS_LABELS: Record<OperationStatusEnum, string> = {
	[OperationStatusEnum.active]: "Ativo",
	[OperationStatusEnum.inactive]: "Inativo",
};
