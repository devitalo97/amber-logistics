import type { WaypointData } from "@/domain/waypoint/waypoint.entity";

export enum TransportModeType {
	air = "air",
	sea = "sea",
	land = "land",
}

export interface CarrierQuoteInput {
	origin: WaypointData;
	destination: WaypointData;
	mode: TransportModeType;
	weight_kg: number;
	volume_cbm: number;
	packages: {
		dimensions: {
			l: number;
			w: number;
			h: number;
		};
		quantity: number;
	}[];
}

export interface CarrierQuoteOutput {
	carrier_id: string;
	carrier_name: string;
	mode: TransportModeType;
	estimated_freight_cost: number;
	estimated_transit_days: number;
}

export interface ICarrierMarketplaceGateway {
	quote(leg: CarrierQuoteInput): Promise<CarrierQuoteOutput>;
}
