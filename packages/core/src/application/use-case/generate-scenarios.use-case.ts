import type { IUseCase } from "@repo/use-case";
import type { ICarrierMarketplaceGateway } from "../gateway/carrier-marketplace.gateway.interface";
import type { Route } from "./generate-routes.use-case";

type Input = {
	routes: Route[];
	volumetry_per_product: {
		product_id: string;
		boxes: number;
		volume_cbm: number;
		weight_kg: number;
	}[];
	volumetry_total: {
		total_boxes: number;
		total_volume_cbm: number;
		total_weight_kg: number;
	};
};

type ScenarioLeg = {
	sequence_order: number;
	origin_name: string;
	destination_name: string;
	mode: "air" | "sea" | "ground";
	carriers: {
		id: string;
		name: string;
		estimated_freight_cost: number;
		estimated_transit_days: number;
	}[];
};

type Scenario = {
	id: string;
	scenario_name: string;
	total_cost: number;
	total_days: number;
	legs: ScenarioLeg[];
};

type Output = Scenario[];

interface IGenerateScenariosUseCase extends IUseCase<Input, Output> {}

class GenerateScenariosUseCase implements IGenerateScenariosUseCase {
	constructor(readonly carrierMarketplaceGateway: ICarrierMarketplaceGateway) {}
	async execute(input: Input): Promise<Output> {
		throw new Error("Method not implemented.");
	}
}

export { GenerateScenariosUseCase, type IGenerateScenariosUseCase };
