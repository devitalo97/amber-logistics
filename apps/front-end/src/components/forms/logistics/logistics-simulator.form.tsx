import {
	ArrowRight,
	Box,
	Calendar,
	CheckCircle2,
	Clock,
	DollarSign,
	MapPin,
	Package,
	Play,
	Plus,
	Scale,
	Trash2,
} from "lucide-react";
import { Label } from "#/components/ui/label";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
	calculateETA,
	carrierOptionsByMode,
	destinations,
	formatCurrency,
	getModeBadgeStyle,
	getModeIcon,
	getModeLabel,
	mockProductsCatalog,
	origins,
	useLogisticsSimulatorForm,
} from "./use-logistics-simulator.form";

export function LogisticsSimulatorForm() {
	const {
		selectedScenario,
		isSimulating,
		estimatedBoxes,
		computedScenarios,
		scenarios,
		destination,
		selectedProducts,
		handleAddProduct,
		handleRemoveProduct,
		handleProductChange,
		handleQuantityChange,
		getPartialCBM,
		handleRunSimulation,
		handleSelectRoute,
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
		<div className="min-h-screen bg-slate-50 p-6">
			<div className="mx-auto max-w-7xl space-y-6">
				{/* Header */}
				<div className="space-y-1">
					<h1 className="text-2xl font-semibold tracking-tight text-slate-900">
						Simulador de Cenários Logísticos
					</h1>
					<p className="text-sm text-slate-500">
						Simule e compare rotas de transporte multi-etapa para otimizar seus
						envios
					</p>
				</div>

				{/* Control Panel */}
				<Card className="border-slate-200 bg-white shadow-sm">
					<CardContent className="pt-6">
						<div className="flex flex-col gap-6">
							{/* Origin/Destination Row */}
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label className="text-sm font-medium text-slate-700">
										Ponto de Origem
									</Label>
									<Select value={origin} onValueChange={setOrigin}>
										<SelectTrigger className="border-slate-200 bg-white">
											<SelectValue placeholder="Selecione a origem" />
										</SelectTrigger>
										<SelectContent>
											{origins.map((o) => (
												<SelectItem key={o.value} value={o.value}>
													{o.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label className="text-sm font-medium text-slate-700">
										Site de Destino da Marca
									</Label>
									<Select value={destination} onValueChange={setDestination}>
										<SelectTrigger className="border-slate-200 bg-white">
											<SelectValue placeholder="Selecione o destino" />
										</SelectTrigger>
										<SelectContent>
											{destinations.map((d) => (
												<SelectItem key={d.value} value={d.value}>
													{d.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							<Separator className="bg-slate-100" />

							{/* Shipment Items Section */}
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="text-sm font-semibold text-slate-800">
											Itens do Envio
										</h3>
										<p className="text-xs text-slate-500">
											Adicione os produtos e quantidades para calcular o volume
											automaticamente
										</p>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={handleAddProduct}
										className="border-slate-200 text-slate-700 hover:bg-slate-50"
									>
										<Plus className="mr-1 h-4 w-4" />
										Adicionar Produto
									</Button>
								</div>

								{/* Product Items List */}
								<div className="space-y-3">
									{selectedProducts.map((item, index) => {
										const product = mockProductsCatalog.find(
											(p) => p.id === item.productId,
										);
										const partialCBM = getPartialCBM(
											item.productId,
											item.quantity,
										);

										return (
											<div
												key={item.productId}
												className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3"
											>
												{/* Product Select */}
												<div className="flex-1 min-w-0">
													<Select
														value={item.productId}
														onValueChange={(value) =>
															handleProductChange(index, value)
														}
													>
														<SelectTrigger className="border-slate-200 bg-white">
															<SelectValue placeholder="Selecione um produto" />
														</SelectTrigger>
														<SelectContent>
															{mockProductsCatalog.map((prod) => (
																<SelectItem key={prod.id} value={prod.id}>
																	<span className="flex items-center gap-2">
																		<span className="font-medium">
																			{prod.name}
																		</span>
																		<span className="text-xs text-slate-500">
																			({prod.sku})
																		</span>
																	</span>
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													{product && (
														<div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
															<span>{product.volume_cbm_per_unit} CBM/un</span>
															<span>{product.weight_kg_per_unit} kg/un</span>
														</div>
													)}
												</div>

												{/* Quantity Input */}
												<div className="w-24">
													<Input
														type="number"
														min={0}
														value={item.quantity}
														onChange={(e) =>
															handleQuantityChange(
																index,
																parseInt(e.target.value, 2) || 0,
															)
														}
														placeholder="Qtd"
														className="border-slate-200 text-center"
													/>
												</div>

												{/* Partial CBM Badge */}
												<div className="w-24 text-right">
													{item.productId && item.quantity > 0 ? (
														<Badge
															variant="outline"
															className="border-slate-200 bg-white text-slate-600"
														>
															{partialCBM.toFixed(2)} CBM
														</Badge>
													) : (
														<span className="text-xs text-slate-400">-</span>
													)}
												</div>

												{/* Delete Button */}
												<Button
													variant="ghost"
													size="icon"
													onClick={() => handleRemoveProduct(index)}
													disabled={selectedProducts.length === 1}
													className="h-8 w-8 text-slate-400 hover:text-red-500 disabled:opacity-50"
												>
													<Trash2 className="h-4 w-4" />
												</Button>
											</div>
										);
									})}
								</div>
							</div>

							<Separator className="bg-slate-100" />

							{/* Summary and Action Row */}
							<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
								{/* Cargo Summary Badges */}
								<div className="flex flex-wrap items-center gap-3">
									<Badge
										variant="outline"
										className="border-emerald-200 bg-emerald-50 text-emerald-700"
									>
										<Box className="mr-1 h-3 w-3" />
										{totalCalculatedCBM.toFixed(2)} CBM Total
									</Badge>
									<Badge
										variant="outline"
										className="border-blue-200 bg-blue-50 text-blue-700"
									>
										<Scale className="mr-1 h-3 w-3" />
										{totalCalculatedWeight.toFixed(1)} kg Total
									</Badge>
									<Badge
										variant="outline"
										className="border-slate-200 bg-slate-50 text-slate-600"
									>
										<Package className="mr-1 h-3 w-3" />
										{totalUnits} unidades | ~{estimatedBoxes} caixas
									</Badge>
								</div>

								{/* Run Simulation Button */}
								<Button
									onClick={handleRunSimulation}
									disabled={!canSimulate || isSimulating}
									className="w-full bg-slate-900 text-white hover:bg-slate-800 md:w-auto"
								>
									{isSimulating ? (
										<>
											<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
											Simulando...
										</>
									) : (
										<>
											<Play className="mr-2 h-4 w-4" />
											Executar Simulação
										</>
									)}
								</Button>
							</div>

							{/* Metadata Badges */}
							<div className="flex flex-wrap items-center gap-3">
								<Badge
									variant="outline"
									className="border-slate-200 bg-slate-50 text-slate-600"
								>
									<DollarSign className="mr-1 h-3 w-3" />
									Moeda: USD
								</Badge>
								<Badge
									variant="outline"
									className="border-slate-200 bg-slate-50 text-slate-600"
								>
									<MapPin className="mr-1 h-3 w-3" />
									Incoterm Padrão: FOB
								</Badge>
								<Badge
									variant="outline"
									className="border-slate-200 bg-slate-50 text-slate-600"
								>
									<Calendar className="mr-1 h-3 w-3" />
									Data de Saída: Hoje
								</Badge>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Scenario Comparison Grid */}
				{computedScenarios.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-lg font-medium text-slate-900">
							Opções de Roteamento Geradas
						</h2>

						<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
							{computedScenarios.map((scenario) => (
								<Card
									key={scenario.id}
									className={`border transition-all duration-200 ${
										selectedScenario === scenario.id
											? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500"
											: "border-slate-200 bg-white hover:border-slate-300"
									}`}
								>
									<CardHeader className="pb-4">
										<div className="flex items-start justify-between">
											<CardTitle className="text-base font-semibold text-slate-900">
												{scenario.scenario_name}
											</CardTitle>
											{selectedScenario === scenario.id && (
												<CheckCircle2 className="h-5 w-5 text-emerald-600" />
											)}
										</div>
									</CardHeader>

									<CardContent className="space-y-4">
										{/* Key Metrics - Now computed dynamically */}
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-1">
												<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
													Custo Total
												</p>
												<p className="text-2xl font-bold text-slate-900">
													{formatCurrency(scenario.total_cost)}
												</p>
											</div>
											<div className="space-y-1">
												<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
													Dias de Trânsito
												</p>
												<p className="text-2xl font-bold text-slate-900">
													{scenario.total_days} dias
												</p>
											</div>
										</div>

										<div className="rounded-lg bg-slate-50 p-3">
											<div className="flex items-center gap-2 text-sm">
												<Clock className="h-4 w-4 text-slate-500" />
												<span className="text-slate-600">ETA Estimado:</span>
												<span className="font-medium text-slate-900">
													{calculateETA(scenario.total_days)}
												</span>
											</div>
										</div>

										<Separator className="bg-slate-100" />

										{/* Multi-Leg Breakdown */}
										<Accordion type="single" collapsible className="w-full">
											<AccordionItem value="legs" className="border-none">
												<AccordionTrigger className="py-2 text-sm font-medium text-slate-700 hover:no-underline">
													Ver {scenario.legs.length} Etapas de Transporte
												</AccordionTrigger>
												<AccordionContent>
													<div className="space-y-3 pt-2">
														{scenario.legs.map((leg, index) => (
															<div
																key={leg.sequence_order}
																className="relative pl-6"
															>
																{/* Timeline connector */}
																{index < scenario.legs.length - 1 && (
																	<div className="absolute left-[11px] top-8 h-[calc(100%+12px)] w-0.5 bg-slate-200" />
																)}

																{/* Timeline dot */}
																<div
																	className={`absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white ${getModeBadgeStyle(leg.mode)}`}
																>
																	{getModeIcon(leg.mode)}
																</div>

																{/* Leg Content */}
																<div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
																	<div className="mb-2 flex items-center gap-2">
																		<Badge
																			variant="outline"
																			className={`${getModeBadgeStyle(leg.mode)} text-xs`}
																		>
																			{getModeIcon(leg.mode)}
																			<span className="ml-1">
																				{getModeLabel(leg.mode)}
																			</span>
																		</Badge>
																		<span className="text-xs text-slate-500">
																			Etapa {leg.sequence_order}
																		</span>
																	</div>

																	<div className="mb-2 flex items-center gap-1 text-sm">
																		<span className="font-medium text-slate-800">
																			{leg.origin_name}
																		</span>
																		<ArrowRight className="h-3 w-3 text-slate-400" />
																		<span className="font-medium text-slate-800">
																			{leg.destination_name}
																		</span>
																	</div>

																	{/* Interactive Carrier Select */}
																	<div className="mb-2">
																		<Label className="text-xs text-slate-500">
																			Transportadora:
																		</Label>
																		<Select
																			value={leg.carrier_id}
																			onValueChange={(value) =>
																				handleCarrierChange(
																					scenario.id,
																					leg.sequence_order,
																					value,
																				)
																			}
																		>
																			<SelectTrigger className="mt-1 h-8 w-full border-slate-200 bg-white text-sm">
																				<SelectValue placeholder="Selecione a transportadora" />
																			</SelectTrigger>
																			<SelectContent>
																				{carrierOptionsByMode[leg.mode].map(
																					(carrier) => (
																						<SelectItem
																							key={carrier.id}
																							value={carrier.id}
																						>
																							<span className="flex items-center justify-between gap-2">
																								<span>{carrier.name}</span>
																								<span className="text-xs text-slate-500">
																									(
																									{formatCurrency(carrier.cost)}{" "}
																									| {carrier.transit_days} dias)
																								</span>
																							</span>
																						</SelectItem>
																					),
																				)}
																			</SelectContent>
																		</Select>
																	</div>

																	<div className="flex items-center justify-between text-xs">
																		<span className="text-slate-500">
																			Custo:{" "}
																			<span className="font-semibold text-slate-900">
																				{formatCurrency(
																					leg.estimated_freight_cost,
																				)}
																			</span>
																		</span>
																		<span className="text-slate-500">
																			Trânsito:{" "}
																			<span className="font-semibold text-slate-900">
																				{leg.estimated_transit_days} dias
																			</span>
																		</span>
																	</div>
																</div>
															</div>
														))}
													</div>
												</AccordionContent>
											</AccordionItem>
										</Accordion>

										<Button
											onClick={() => handleSelectRoute(scenario.id)}
											variant={
												selectedScenario === scenario.id ? "default" : "outline"
											}
											className={`w-full ${
												selectedScenario === scenario.id
													? "bg-emerald-600 text-white hover:bg-emerald-700"
													: "border-slate-200 text-slate-700 hover:bg-slate-50"
											}`}
										>
											{selectedScenario === scenario.id
												? "Rota Selecionada"
												: "Selecionar Rota"}
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* Empty State */}
				{scenarios.length === 0 && !isSimulating && (
					<Card className="border-dashed border-slate-300 bg-slate-50/50">
						<CardContent className="flex flex-col items-center justify-center py-16">
							<div className="mb-4 rounded-full bg-slate-100 p-4">
								<Package className="h-8 w-8 text-slate-400" />
							</div>
							<h3 className="mb-2 text-lg font-medium text-slate-700">
								Nenhuma simulação executada
							</h3>
							<p className="max-w-sm text-center text-sm text-slate-500">
								Preencha os parâmetros de origem, destino e adicione os produtos
								do envio acima para gerar opções de roteamento otimizadas.
							</p>
						</CardContent>
					</Card>
				)}

				{/* Loading State */}
				{isSimulating && (
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{[1, 2, 3].map((i) => (
							<Card key={i} className="border-slate-200 bg-white">
								<CardContent className="pt-6">
									<div className="animate-pulse space-y-4">
										<div className="h-5 w-3/4 rounded bg-slate-200" />
										<div className="grid grid-cols-2 gap-4">
											<div className="space-y-2">
												<div className="h-3 w-16 rounded bg-slate-200" />
												<div className="h-8 w-24 rounded bg-slate-200" />
											</div>
											<div className="space-y-2">
												<div className="h-3 w-16 rounded bg-slate-200" />
												<div className="h-8 w-20 rounded bg-slate-200" />
											</div>
										</div>
										<div className="h-12 rounded bg-slate-100" />
										<div className="h-10 rounded bg-slate-200" />
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
