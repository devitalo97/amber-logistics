import {
	ArrowRight,
	CheckCircle2,
	Clock,
	DollarSign,
	Info,
	TrendingUp,
} from "lucide-react";
import React from "react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { Separator } from "#/components/ui/separator";
import {
	calculateETA,
	carrierOptionsByMode,
	formatCurrency,
	getModeBadgeStyle,
	getModeIcon,
	getModeLabel,
	type Scenario,
	type TransportModeEnum,
} from "./use-logistics-simulator.form";

interface ScenarioMatrixProps {
	computedScenarios: Scenario[];
	selectedScenario: string | null;
	handleSelectScenario: (id: string) => void;
	/** Callback injetado do hook pai para lidar com a mutação da transportadora */
	handleCarrierChange: (
		scenarioId: string,
		legSequence: number,
		carrierId: string,
	) => void;
}

/**
 * Função utilitária interna para checar se a transportadora atual foi customizada.
 * Compara a escolha atual com o primeiro item (padrão) do catálogo daquele modal.
 */
function checkIsLegCustomized(
	mode: TransportModeEnum,
	currentCarrierId: string,
): boolean {
	const options = carrierOptionsByMode[mode] || [];
	if (options.length === 0) return false;
	return options[0].id !== currentCarrierId;
}

export function ScenarioComparisonMatrix({
	computedScenarios,
	selectedScenario,
	handleSelectScenario,
	handleCarrierChange,
}: ScenarioMatrixProps) {
	return (
		<div className="space-y-4">
			{/* Informações de Cabeçalho do Bloco */}
			<div className="flex flex-col gap-1">
				<h2 className="text-base font-semibold text-slate-900 dark:text-white">
					Opções de Roteamento Geradas
				</h2>
				<p className="text-xs text-muted-foreground">
					Compare métricas críticas lado a lado. Clique em qualquer etapa para
					customizar as transportadoras de trecho.
				</p>
			</div>

			{/* Container Principal com Scroll Horizontal Controlado */}
			<div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
				<div className="min-w-[900px] divide-y divide-slate-100 dark:divide-zinc-800">
					{/* ROW 0: Cabeçalhos, Nomes dos Cenários e Badges de Destaque */}
					<div className="grid grid-cols-4 items-end bg-slate-50/70 p-4 dark:bg-zinc-900/50">
						<div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 pb-2">
							Parâmetros Comparativos
						</div>
						{computedScenarios.map((scenario, index) => {
							const isFastest = index === 2;
							const isCheapest = index === 1;

							return (
								<div key={scenario.id} className="px-4 space-y-1.5">
									<div className="h-5 flex items-center gap-1">
										{isCheapest && (
											<Badge
												variant="default"
												className="bg-emerald-600 text-white hover:bg-emerald-600"
											>
												Melhor Custo
											</Badge>
										)}
										{isFastest && (
											<Badge
												variant="default"
												className="bg-sky-600 text-white hover:bg-sky-600"
											>
												Mais Rápido
											</Badge>
										)}
									</div>
									<h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100 line-clamp-1">
										{scenario.scenario_name.split(":")[1] ||
											scenario.scenario_name}
									</h3>
								</div>
							);
						})}
					</div>

					{/* ROW 1: Custo Total (Reativo a mudanças de percurso) */}
					<div className="grid grid-cols-4 items-center p-4 hover:bg-slate-50/30 dark:hover:bg-zinc-900/10 transition-colors">
						<div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-zinc-400">
							<DollarSign className="h-4 w-4 text-slate-400" />
							<span>Custo Total de Frete</span>
						</div>
						{computedScenarios.map((scenario) => {
							const isSelected = selectedScenario === scenario.id;
							return (
								<div key={scenario.id} className="px-4">
									<span
										className={`text-lg font-extrabold tracking-tight transition-all ${
											isSelected
												? "text-emerald-600 dark:text-emerald-400"
												: "text-slate-900 dark:text-zinc-50"
										}`}
									>
										{formatCurrency(scenario.total_cost)}
									</span>
								</div>
							);
						})}
					</div>

					{/* ROW 2: Tempo de Trânsito Total */}
					<div className="grid grid-cols-4 items-center p-4 hover:bg-slate-50/30 dark:hover:bg-zinc-900/10 transition-colors">
						<div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-zinc-400">
							<Clock className="h-4 w-4 text-slate-400" />
							<span>Tempo de Trânsito</span>
						</div>
						{computedScenarios.map((scenario) => (
							<div
								key={scenario.id}
								className="px-4 text-sm font-semibold text-slate-800 dark:text-zinc-200"
							>
								{scenario.total_days} dias
							</div>
						))}
					</div>

					{/* ROW 3: Previsão Dinâmica de Chegada (ETA) */}
					<div className="grid grid-cols-4 items-center p-4 hover:bg-slate-50/30 dark:hover:bg-zinc-900/10 transition-colors">
						<div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-zinc-400">
							<TrendingUp className="h-4 w-4 text-slate-400" />
							<span>ETA Estimado</span>
						</div>
						{computedScenarios.map((scenario) => (
							<div
								key={scenario.id}
								className="px-4 text-xs text-muted-foreground font-medium"
							>
								{calculateETA(scenario.total_days)}
							</div>
						))}
					</div>

					{/* ROW 4: INTERATIVO - Fluxo de Etapas, Modais e Seleção de Transportadoras */}
					<div className="grid grid-cols-4 items-center p-4 hover:bg-slate-50/30 dark:hover:bg-zinc-900/10 transition-colors">
						<div className="flex flex-col gap-0.5 text-xs font-medium text-slate-600 dark:text-zinc-400">
							<span>Fluxo de Etapas</span>
							<span className="text-[10px] text-slate-400 flex items-center gap-1">
								<Info className="h-2.5 w-2.5" /> Clique para editar
							</span>
						</div>
						{computedScenarios.map((scenario) => (
							<div
								key={scenario.id}
								className="px-4 flex items-center gap-2 flex-wrap"
							>
								{scenario.legs.map((leg, lIdx) => {
									const isCustomized = checkIsLegCustomized(
										leg.mode,
										leg.carrier_id,
									);
									const carriersList = carrierOptionsByMode[leg.mode] || [];

									return (
										<React.Fragment key={leg.sequence_order}>
											<Popover>
												<PopoverTrigger asChild>
													<button
														type="button"
														className={`group relative flex items-center gap-1.5 p-1.5 rounded-lg border text-left transition-all outline-hidden cursor-pointer select-none ${
															isCustomized
																? "bg-amber-50/60 border-amber-400 dark:bg-amber-950/20 dark:border-amber-500/50"
																: "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800"
														}`}
													>
														{/* Elemento Indicador Visual de Customização */}
														{isCustomized && (
															<span className="absolute -top-1 -right-1 flex h-2 w-2">
																<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
																<span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
															</span>
														)}

														<div
															className={`p-1 rounded ${getModeBadgeStyle(leg.mode)}`}
														>
															{getModeIcon(leg.mode)}
														</div>

														<div className="text-[11px] leading-tight pr-1">
															<p className="font-semibold text-slate-800 dark:text-zinc-200 max-w-[80px] truncate">
																{leg.carrier_name}
															</p>
															<p className="text-[10px] text-muted-foreground">
																{leg.estimated_transit_days}d |{" "}
																{formatCurrency(leg.estimated_freight_cost)}
															</p>
														</div>
													</button>
												</PopoverTrigger>

												{/* Dropdown Flutuante de Gestão de Transportadoras */}
												<PopoverContent className="w-80 p-4 border border-slate-200 bg-white shadow-xl rounded-xl dark:border-zinc-800 dark:bg-zinc-950 z-50">
													<div className="space-y-3">
														<div>
															<div className="flex items-center gap-2 mb-1">
																<Badge
																	variant="outline"
																	className={`${getModeBadgeStyle(leg.mode)} text-[10px]`}
																>
																	{getModeLabel(leg.mode)}
																</Badge>
																<span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
																	Etapa {leg.sequence_order}
																</span>
															</div>
															<h4 className="text-xs font-bold text-slate-900 dark:text-zinc-50 flex items-center gap-1">
																<span className="truncate max-w-[120px]">
																	{leg.origin_name}
																</span>
																<ArrowRight className="h-3 w-3 shrink-0 text-slate-400" />
																<span className="truncate max-w-[120px]">
																	{leg.destination_name}
																</span>
															</h4>
														</div>

														<Separator className="bg-slate-100 dark:bg-zinc-800" />

														{/* Grid de Transportadoras Disponíveis */}
														<div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
															<p className="text-[11px] font-medium text-muted-foreground pb-1">
																Selecione a transportadora parceira:
															</p>
															{carriersList.map((carrier) => {
																const isCurrent = carrier.id === leg.carrier_id;
																return (
																	<button
																		key={carrier.id}
																		type="button"
																		onClick={() =>
																			handleCarrierChange(
																				scenario.id,
																				leg.sequence_order,
																				carrier.id,
																			)
																		}
																		className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${
																			isCurrent
																				? "bg-slate-900 border-slate-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950"
																				: "bg-slate-50/50 border-slate-100 hover:bg-slate-100 hover:border-slate-200 dark:bg-zinc-900/50 dark:border-zinc-800 dark:hover:bg-zinc-800"
																		}`}
																	>
																		<div className="space-y-0.5">
																			<p className="text-xs font-bold leading-none">
																				{carrier.name}
																			</p>
																			<p
																				className={`text-[10px] ${isCurrent ? "text-slate-300 dark:text-zinc-500" : "text-muted-foreground"}`}
																			>
																				Tempo de trânsito:{" "}
																				{carrier.transit_days} dias
																			</p>
																		</div>
																		<span className="text-xs font-extrabold tracking-tight">
																			{formatCurrency(carrier.cost)}
																		</span>
																	</button>
																);
															})}
														</div>
													</div>
												</PopoverContent>
											</Popover>

											{/* Conector Visual entre os Cards de Trecho */}
											{lIdx < scenario.legs.length - 1 && (
												<ArrowRight className="h-3.5 w-3.5 text-slate-300 shrink-0 dark:text-zinc-700" />
											)}
										</React.Fragment>
									);
								})}
							</div>
						))}
					</div>

					{/* ROW 5: Status da Seleção do Cenário e Disparadores de Ação */}
					<div className="grid grid-cols-4 items-center p-4 bg-slate-50/30 dark:bg-zinc-900/10">
						<div className="text-xs text-slate-400 italic font-medium">
							Status do Cenário
						</div>
						{computedScenarios.map((scenario) => {
							const isSelected = selectedScenario === scenario.id;
							return (
								<div key={scenario.id} className="px-4">
									<Button
										onClick={() => handleSelectScenario(scenario.id)}
										variant={isSelected ? "default" : "outline"}
										className={`w-full transition-all text-xs font-semibold h-8 rounded-lg ${
											isSelected
												? "bg-emerald-600 text-white hover:bg-emerald-700 border-transparent shadow-xs"
												: "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
										}`}
									>
										{isSelected ? (
											<span className="flex items-center justify-center gap-1.5">
												<CheckCircle2 className="h-4 w-4" />
												Rota Selecionada
											</span>
										) : (
											"Utilizar Esta Rota"
										)}
									</Button>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
