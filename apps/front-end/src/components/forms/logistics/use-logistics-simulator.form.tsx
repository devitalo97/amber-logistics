import { Plane, Ship, Truck } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { runSimulationFn } from "@/lib/logistics.functions";
import { Route } from "@/routes/_protected/logistics/simulator";

// TypeScript Contracts
enum TransportModeEnum {
	sea = "sea",
	air = "air",
	land = "land",
}

interface CarrierOption {
	id: string;
	name: string;
	cost: number;
	transit_days: number;
}

interface SimulatedLeg {
	sequence_order: number;
	origin_name: string;
	destination_name: string;
	mode: TransportModeEnum;
	carrier_id: string;
	carrier_name: string;
	estimated_freight_cost: number;
	estimated_transit_days: number;
}

interface Scenario {
	id: string;
	scenario_name: string;
	total_cost: number;
	total_days: number;
	legs: SimulatedLeg[];
}

// Removed Mock Product Catalog
// Carrier Options Dictionary by Transport Mode
const carrierOptionsByMode: Record<TransportModeEnum, CarrierOption[]> = {
	[TransportModeEnum.sea]: [
		{ id: "maersk", name: "Maersk Line", cost: 3200, transit_days: 14 },
		{ id: "cosco", name: "COSCO Shipping", cost: 2900, transit_days: 16 },
		{ id: "msc", name: "MSC", cost: 3500, transit_days: 12 },
		{ id: "evergreen", name: "Evergreen Marine", cost: 2750, transit_days: 18 },
		{ id: "hapag", name: "Hapag-Lloyd", cost: 3100, transit_days: 15 },
	],
	[TransportModeEnum.air]: [
		{ id: "dhl", name: "DHL Express", cost: 11200, transit_days: 3 },
		{
			id: "fedex-air",
			name: "FedEx International",
			cost: 10500,
			transit_days: 4,
		},
		{
			id: "ups-air",
			name: "UPS Worldwide Express",
			cost: 11800,
			transit_days: 2,
		},
		{ id: "cathay", name: "Cathay Cargo", cost: 9800, transit_days: 5 },
	],
	[TransportModeEnum.land]: [
		{
			id: "union-pacific",
			name: "Union Pacific Railroad",
			cost: 950,
			transit_days: 2,
		},
		{ id: "fedex-freight", name: "FedEx Freight", cost: 1100, transit_days: 1 },
		{ id: "jb-hunt", name: "JB Hunt", cost: 800, transit_days: 3 },
		{ id: "xpo", name: "XPO Logistics", cost: 700, transit_days: 2 },
		{ id: "ups-freight", name: "UPS Freight", cost: 1300, transit_days: 2 },
		{ id: "schneider", name: "Schneider National", cost: 850, transit_days: 2 },
	],
};

// Removed static origins and destinations
function getModeIcon(mode: TransportModeEnum) {
	switch (mode) {
		case TransportModeEnum.sea:
			return <Ship className="h-4 w-4" />;
		case TransportModeEnum.air:
			return <Plane className="h-4 w-4" />;
		case TransportModeEnum.land:
			return <Truck className="h-4 w-4" />;
	}
}

function getModeBadgeStyle(mode: TransportModeEnum) {
	switch (mode) {
		case TransportModeEnum.sea:
			return "bg-blue-50 text-blue-700 border-blue-200";
		case TransportModeEnum.air:
			return "bg-sky-50 text-sky-700 border-sky-200";
		case TransportModeEnum.land:
			return "bg-amber-50 text-amber-700 border-amber-200";
	}
}

function getModeLabel(mode: TransportModeEnum) {
	switch (mode) {
		case TransportModeEnum.sea:
			return "Marítimo";
		case TransportModeEnum.air:
			return "Aéreo";
		case TransportModeEnum.land:
			return "Terrestre";
	}
}

function formatCurrency(amount: number) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "USD",
	}).format(amount);
}

function calculateETA(days: number) {
	const eta = new Date();
	eta.setDate(eta.getDate() + days);
	return eta.toLocaleDateString("pt-BR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

const useLogisticsSimulatorForm = () => {
	const { products: productsCatalog, waypoints } = Route.useLoaderData();

	const origins = waypoints
		.filter((w) => w.type !== "brand_site")
		.map((w) => ({ value: w.id, label: w.description || w.id }));

	const destinations = waypoints
		.filter((w) => w.type === "brand_site")
		.map((w) => ({ value: w.id, label: w.description || w.id }));

	const [origin, setOrigin] = useState<string>("");
	const [destination, setDestination] = useState<string>("");
	const [selectedProducts, setSelectedProducts] = useState<
		{ productId: string; quantity: number }[]
	>([{ productId: "", quantity: 1 }]);
	const [scenarios, setScenarios] = useState<Scenario[]>([]);
	const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
	const [isSimulating, setIsSimulating] = useState(false);

	// Compute total CBM and weight from selected products
	const { totalCalculatedCBM, totalCalculatedWeight, totalUnits } =
		useMemo(() => {
			let cbm = 0;
			let weight = 0;
			let units = 0;

			selectedProducts.forEach((item) => {
				const prod = productsCatalog.find((p) => p.id === item.productId);
				if (prod && item.quantity > 0) {
					cbm += prod.volume_cbm_per_unit * item.quantity;
					weight += prod.weight_kg_per_unit * item.quantity;
					units += item.quantity;
				}
			});

			return {
				totalCalculatedCBM: cbm,
				totalCalculatedWeight: weight,
				totalUnits: units,
			};
		}, [selectedProducts, productsCatalog]);

	// Estimated boxes (assuming ~0.05 CBM per box average)
	const estimatedBoxes = Math.ceil(totalCalculatedCBM / 0.05);

	// Check if simulation can be executed
	const canSimulate = useMemo(() => {
		if (!origin || !destination) return false;
		const hasValidProduct = selectedProducts.some((item) => {
			const prod = productsCatalog.find((p) => p.id === item.productId);
			return prod && item.quantity > 0;
		});
		return hasValidProduct;
	}, [origin, destination, selectedProducts, productsCatalog]);

	// Compute dynamic totals for each scenario
	const computedScenarios = useMemo(() => {
		return scenarios.map((scenario) => {
			const total_cost = scenario.legs.reduce(
				(sum, leg) => sum + leg.estimated_freight_cost,
				0,
			);
			const total_days = scenario.legs.reduce(
				(sum, leg) => sum + leg.estimated_transit_days,
				0,
			);
			return {
				...scenario,
				total_cost,
				total_days,
			};
		});
	}, [scenarios]);

	const handleAddProduct = () => {
		setSelectedProducts((prev) => [...prev, { productId: "", quantity: 1 }]);
	};

	const handleRemoveProduct = (index: number) => {
		setSelectedProducts((prev) => prev.filter((_, i) => i !== index));
	};

	const handleProductChange = (index: number, productId: string) => {
		setSelectedProducts((prev) =>
			prev.map((item, i) => (i === index ? { ...item, productId } : item)),
		);
	};

	const handleQuantityChange = (index: number, quantity: number) => {
		setSelectedProducts((prev) =>
			prev.map((item, i) =>
				i === index ? { ...item, quantity: Math.max(0, quantity) } : item,
			),
		);
	};

	const getPartialCBM = (productId: string, quantity: number) => {
		const prod = productsCatalog.find((p) => p.id === productId);
		if (!prod) return 0;
		return prod.volume_cbm_per_unit * quantity;
	};

	const handleRunSimulation = async () => {
		if (!canSimulate) return;

		setIsSimulating(true);
		setSelectedScenario(null);

		try {
			const result = await runSimulationFn({
				data: {
					products: selectedProducts.map((p) => ({
						id: p.productId,
						quantity: p.quantity,
					})),
					waypoints: { origin_id: origin, destination_id: destination },
				},
			});
			setScenarios(result.scenarios as unknown as Scenario[]);
		} catch (error) {
			console.error("Simulation failed:", error);
		} finally {
			setIsSimulating(false);
		}
	};

	const handleSelectScenario = (scenarioId: string) => {
		setSelectedScenario(scenarioId);
	};

	const handleCarrierChange = useCallback(
		(scenarioId: string, legSequence: number, carrierId: string) => {
			setScenarios((prevScenarios) =>
				prevScenarios.map((scenario) => {
					if (scenario.id !== scenarioId) return scenario;

					return {
						...scenario,
						legs: scenario.legs.map((leg) => {
							if (leg.sequence_order !== legSequence) return leg;

							const carrierOptions = carrierOptionsByMode[leg.mode];
							const newCarrier = carrierOptions.find((c) => c.id === carrierId);

							if (!newCarrier) return leg;

							return {
								...leg,
								carrier_id: newCarrier.id,
								carrier_name: newCarrier.name,
								estimated_freight_cost: newCarrier.cost,
								estimated_transit_days: newCarrier.transit_days,
							};
						}),
					};
				}),
			);
		},
		[],
	);

	return {
		selectedScenario,
		isSimulating,
		estimatedBoxes,
		computedScenarios,
		scenarios,
		destination,
		origin,
		selectedProducts,
		productsCatalog,
		origins,
		destinations,
		handleAddProduct,
		handleRemoveProduct,
		handleProductChange,
		handleQuantityChange,
		getPartialCBM,
		handleRunSimulation,
		handleSelectScenario,
		handleCarrierChange,
		setOrigin,
		setDestination,
		totalCalculatedCBM,
		totalCalculatedWeight,
		totalUnits,
		canSimulate,
	};
};

export {
	calculateETA,
	carrierOptionsByMode,
	formatCurrency,
	getModeBadgeStyle,
	getModeIcon,
	getModeLabel,
	type Scenario,
	TransportModeEnum,
	useLogisticsSimulatorForm,
};
