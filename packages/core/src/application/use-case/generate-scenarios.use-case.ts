import type { IUseCase } from "@repo/use-case";
import type {
	ICarrierMarketplaceGateway,
	TransportModeType,
} from "../gateway/carrier-marketplace.gateway.interface";
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

export type ScenarioLeg = {
	sequence_order: number;
	origin_name: string;
	destination_name: string;
	mode: TransportModeType;
	carrier_id: string;
	carrier_name: string;
	estimated_freight_cost: number;
	estimated_transit_days: number;
};

export type Scenario = {
	id: string;
	scenario_name: string;
	total_cost: number;
	total_days: number;
	legs: ScenarioLeg[];
};

type Output = Scenario[];

export interface IGenerateScenariosUseCase extends IUseCase<Input, Output> {}

export class GenerateScenariosUseCase implements IGenerateScenariosUseCase {
	constructor(
		private readonly carrierMarketplaceGateway: ICarrierMarketplaceGateway,
	) {}

	async execute(input: Input): Promise<Output> {
		const { routes, volumetry_total } = input;
		const scenarios: Scenario[] = [];

		for (const route of routes) {
			const scenarioLegs: ScenarioLeg[] = [];
			let total_cost = 0;
			let total_days = 0;

			for (const leg of route.legs) {
				const quote = await this.carrierMarketplaceGateway.quote({
					origin: leg.origin,
					destination: leg.destination,
					mode: leg.mode,
					weight_kg: volumetry_total.total_weight_kg,
					volume_cbm: volumetry_total.total_volume_cbm,
					packages: [], // Supresso para abstração de volumetria total
				});

				scenarioLegs.push({
					sequence_order: leg.sequence,
					origin_name: leg.origin.description || "Nó Não Mapeado",
					destination_name: leg.destination.description || "Nó Não Mapeado",
					mode: leg.mode,
					carrier_id: quote.carrier_id,
					carrier_name: quote.carrier_name,
					estimated_freight_cost: quote.estimated_freight_cost,
					estimated_transit_days: quote.estimated_transit_days,
				});

				total_cost += quote.estimated_freight_cost;
				total_days += quote.estimated_transit_days;
			}

			scenarios.push({
				id: route.id,
				scenario_name: route.name,
				total_cost,
				total_days,
				legs: scenarioLegs,
			});
		}

		return scenarios;
	}
}
