import { createFileRoute } from "@tanstack/react-router";
import { LogisticsSimulatorPage } from "#/pages/logistics-simulator.page";

export const Route = createFileRoute("/_protected/logistics/simulator")({
	component: LogisticsSimulatorPage,
});
