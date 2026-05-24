import { CompositionRoot } from "@repo/core";
import { createServerFn } from "@tanstack/react-start";
import { ensureSession } from "./auth.functions";

// Initialize CompositionRoot
const config = {
	DATABASE_URL: process.env.DATABASE_URL || "",
	GEOC_USER_AGENT: process.env.GEOC_USER_AGENT || "",
	GEOC_BASE_URL: process.env.GEOC_BASE_URL || "",
};

const compositionRoot = new CompositionRoot(config).build();

export const getProductsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		await ensureSession();
		return await compositionRoot.listProductsUseCase.execute();
	},
);

export const getWaypointsFn = createServerFn({ method: "GET" }).handler(
	async () => {
		await ensureSession();
		return await compositionRoot.listWaypointsUseCase.execute();
	},
);

export const runSimulationFn = createServerFn({ method: "POST" }).handler(
	async ({ data }: { data: any }) => {
		const payload = data as {
			products: { id: string; quantity: number }[];
			waypoints: { origin_id: string; destination_id: string };
		};
		await ensureSession();
		return await compositionRoot.simulateLogisticsScenariosUseCase.execute({
			products: payload.products,
			waypoints: payload.waypoints,
		});
	},
);
