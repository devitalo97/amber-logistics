import type { IUseCase } from "@repo/use-case";
import type { IProductRepository } from "@/domain/product/product.repository.interface";
import type { IWaypointRepository } from "@/domain/waypoint/waypoint.repository.interface";
import type { IGenerateRoutesUseCase } from "./generate-routes.use-case";
import type { IGenerateScenariosUseCase } from "./generate-scenarios.use-case";

type Input = {
	products: {
		id: string;
		quantity: number;
	}[];
	waypoints: {
		origin_id: string;
		destination_id: string;
	};
};

type Output = {};

interface ISimulateLogisticsScenariosUseCase extends IUseCase<Input, Output> {}

class SimulateLogisticsScenariosUseCase
	implements ISimulateLogisticsScenariosUseCase
{
	constructor(
		private readonly productRepository: IProductRepository,
		private readonly waypointRepository: IWaypointRepository,
		private readonly generateRoutes: IGenerateRoutesUseCase,
		private readonly generateScenarios: IGenerateScenariosUseCase,
	) {}

	async execute(input: Input): Promise<Output> {
		const products = await this.productRepository.findManyById(
			input.products.map((p) => p.id),
		);
		const waypoints = await this.waypointRepository.findManyById([
			input.waypoints.origin_id,
			input.waypoints.destination_id,
		]);

		const volumetry_per_product = products.map((p) => {
			const quantity = input.products.find((x) => x.id === p.id)?.quantity || 0;
			const volume_cbm = p.volume_cbm_per_unit * quantity;
			const weight_kg = p.weight_kg_per_unit * quantity;

			return {
				product_id: p.id,
				boxes: volume_cbm * 0.05,
				volume_cbm,
				weight_kg,
			};
		});

		const volumetry_total = volumetry_per_product.reduce(
			(acc, p) => {
				return {
					total_boxes: acc.total_boxes + p.boxes,
					total_volume_cbm: acc.total_volume_cbm + p.volume_cbm,
					total_weight_kg: acc.total_weight_kg + p.weight_kg,
				};
			},
			{ total_boxes: 0, total_volume_cbm: 0, total_weight_kg: 0 },
		);

		const routes = await this.generateRoutes.execute({
			origin: waypoints[0]!,
			destination: waypoints[1]!,
		});
		const scenarios = await this.generateScenarios.execute({
			volumetry_per_product,
			volumetry_total,
			routes,
		});
		return { products, waypoints, scenarios };
	}
}

export {
	type ISimulateLogisticsScenariosUseCase,
	SimulateLogisticsScenariosUseCase,
};
