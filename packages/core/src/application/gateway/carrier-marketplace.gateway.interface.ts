import type { WaypointData } from "@/domain/waypoint/waypoint.entity";

interface ICarrierMarketplaceGateway {
	quote(leg: {
		origin: WaypointData;
		destination: WaypointData;
		mode: "air" | "ground" | "sea";
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
	}): Promise<{
		carrier_id: string;
		carrier_name: string;
		mode: "air" | "sea" | "ground";
		estimated_freight_cost: number;
		estimated_transit_days: number;
	}>;
}

export type { ICarrierMarketplaceGateway };
