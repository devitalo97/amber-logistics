import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "#/components/ui/accordion";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";
import {
	calculateETA,
	carrierOptionsByMode,
	formatCurrency,
	getModeBadgeStyle,
	getModeIcon,
	getModeLabel,
	type Scenario,
} from "./use-logistics-simulator.form";

interface ScenarioCardProps {
	isSelected: boolean;
	scenario: Scenario;
	handleCarrierChange: (
		scenarioId: string,
		legSequence: number,
		carrierId: string,
	) => void;
	handleSelectScenario: (scenarioId: string) => void;
}
export function ScenarioCard({
	isSelected,
	scenario,
	handleCarrierChange,
	handleSelectScenario,
}: ScenarioCardProps) {
	return (
		<Card
			className={`border transition-all duration-200 ${
				isSelected
					? "border-emerald-500 bg-emerald-50/30 ring-1 ring-emerald-500"
					: "border-slate-200 bg-white hover:border-slate-300"
			}`}
		>
			<CardHeader className="pb-4">
				<div className="flex items-start justify-between">
					<CardTitle className="text-base font-semibold text-slate-900">
						{scenario.scenario_name}
					</CardTitle>
					{isSelected && <CheckCircle2 className="h-5 w-5 text-emerald-600" />}
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
									<div key={leg.sequence_order} className="relative pl-6">
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
													<span className="ml-1">{getModeLabel(leg.mode)}</span>
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
														{carrierOptionsByMode[leg.mode].map((carrier) => (
															<SelectItem key={carrier.id} value={carrier.id}>
																<span className="flex items-center justify-between gap-2">
																	<span>{carrier.name}</span>
																	<span className="text-xs text-slate-500">
																		({formatCurrency(carrier.cost)} |{" "}
																		{carrier.transit_days} dias)
																	</span>
																</span>
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="flex items-center justify-between text-xs">
												<span className="text-slate-500">
													Custo:{" "}
													<span className="font-semibold text-slate-900">
														{formatCurrency(leg.estimated_freight_cost)}
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
					onClick={() => handleSelectScenario(scenario.id)}
					variant={isSelected ? "default" : "outline"}
					className={`w-full ${
						isSelected
							? "bg-emerald-600 text-white hover:bg-emerald-700"
							: "border-slate-200 text-slate-700 hover:bg-slate-50"
					}`}
				>
					{isSelected ? "Rota Selecionada" : "Selecionar Rota"}
				</Button>
			</CardContent>
		</Card>
	);
}
