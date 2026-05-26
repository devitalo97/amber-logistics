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

export const getBrandSitesFn = createServerFn({ method: "GET" })
	.inputValidator(
		(data?: {
			cursor?: string;
			limit?: number;
			sortBy?: string;
			sortOrder?: "asc" | "desc";
			name?: string;
			operational_status?: string;
			type?: string;
		}) => data,
	)
	.handler(async ({ data }) => {
		await ensureSession();

		const cursorIndex = data?.cursor ? parseInt(data.cursor, 10) : 0;
		const startIndex = Number.isNaN(cursorIndex) ? 0 : cursorIndex;

		const queryParams = {
			...data,
			cursor: startIndex,
		};

		return await compositionRoot.listBrandSitesUseCase.execute(queryParams);
	});

export const runSimulationFn = createServerFn({ method: "POST" })
	.inputValidator(
		(data: {
			products: { id: string; quantity: number }[];
			waypoints: { origin_id: string; destination_id: string };
		}) => data,
	)
	.handler(async ({ data }) => {
		const payload = data;
		await ensureSession();
		return await compositionRoot.simulateLogisticsScenariosUseCase.execute({
			products: payload.products,
			waypoints: payload.waypoints,
		});
	});
