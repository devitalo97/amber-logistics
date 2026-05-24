import { createFileRoute } from "@tanstack/react-router";
import { LogisticsSimulatorForm } from "#/components/forms/logistics/logistics-simulator.form";

export const Route = createFileRoute("/_protected/logistics/simulator")({
	component: LogisticsSimulatorForm,
});
