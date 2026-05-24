import { createFileRoute } from "@tanstack/react-router";
import { LogisticsSimulatorPage } from "#/pages/logistics-simulator.page";

import { getProductsFn, getWaypointsFn } from "@/lib/logistics.functions";

export const Route = createFileRoute("/_protected/logistics/simulator")({
	loader: async () => {
		const [products, waypoints] = await Promise.all([
			getProductsFn(),
			getWaypointsFn(),
		]);
		return { products, waypoints };
	},
	component: LogisticsSimulatorPage,
});
