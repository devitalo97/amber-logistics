import { EmptyStateCard } from "./empty-state-card";
import { ProductsCard } from "./products-card";
import { ScenarioComparisonMatrix } from "./scenario-comparison-matrix";
import { SkeletonCard } from "./skeleton-card";
import { SummaryCard } from "./summary-card";
import { useLogisticsSimulatorForm } from "./use-logistics-simulator.form";
import { WaypointCard } from "./waypoint-card";

export function LogisticsSimulatorForm() {
	const {
		selectedScenario,
		isSimulating,
		estimatedBoxes,
		computedScenarios,
		scenarios,
		destination,
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
		origin,
	} = useLogisticsSimulatorForm();

	return (
		<>
			{/* Control Panel */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 space-y-6">
					<ProductsCard
						getPartialCBM={getPartialCBM}
						handleQuantityChange={handleQuantityChange}
						handleRemoveProduct={handleRemoveProduct}
						handleProductChange={handleProductChange}
						handleAddProduct={handleAddProduct}
						selectedProducts={selectedProducts}
						productsCatalog={productsCatalog}
					/>
					<WaypointCard
						origin={origin}
						destination={destination}
						setOrigin={setOrigin}
						setDestination={setDestination}
						destinations={destinations}
						origins={origins}
					/>
				</div>
				<div className="lg:col-span-1">
					<div className="sticky top-6">
						<SummaryCard
							isSimulating={isSimulating}
							estimatedBoxes={estimatedBoxes}
							totalCalculatedWeight={totalCalculatedWeight}
							totalCalculatedCBM={totalCalculatedCBM}
							totalUnits={totalUnits}
							canSimulate={canSimulate}
							handleRunSimulation={handleRunSimulation}
						/>
					</div>
				</div>
			</div>

			{/* Scenario Comparison Grid */}
			{computedScenarios.length > 0 && (
				<div className="space-y-4">
					<h2 className="text-lg font-medium text-slate-900">
						Opções de Roteamento Geradas
					</h2>

					<ScenarioComparisonMatrix
						computedScenarios={scenarios}
						handleSelectScenario={handleSelectScenario}
						selectedScenario={selectedScenario}
						handleCarrierChange={handleCarrierChange}
					/>
				</div>
			)}

			{/* Empty State */}
			{scenarios.length === 0 && !isSimulating && <EmptyStateCard />}

			{/* Loading State */}
			{isSimulating && (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					{[1, 2, 3].map((i) => (
						<SkeletonCard key={i} />
					))}
				</div>
			)}
		</>
	);
}
