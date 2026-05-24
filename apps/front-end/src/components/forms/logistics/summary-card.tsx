import { Box, Package, Play, Scale } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";

interface SummaryCardProps {
	isSimulating: boolean;
	estimatedBoxes: number;
	totalCalculatedWeight: number;
	totalCalculatedCBM: number;
	totalUnits: number;
	canSimulate: boolean;
	handleRunSimulation: () => void;
}

export function SummaryCard({
	isSimulating,
	estimatedBoxes,
	totalCalculatedWeight,
	totalCalculatedCBM,
	totalUnits,
	canSimulate,
	handleRunSimulation,
}: SummaryCardProps) {
	return (
		<Card className="border-slate-200 bg-white shadow-sm">
			<CardHeader className="border-b border-slate-200">
				<CardTitle className="text-base font-semibold text-slate-800">
					Resumo do Carregamento
				</CardTitle>
			</CardHeader>
			<CardContent className="pt-6 space-y-6">
				{/* Cargo Summary Badges */}
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
					<Badge
						variant="outline"
						className="justify-start py-2 px-3 border-emerald-200 bg-emerald-50 text-emerald-700 text-sm"
					>
						<Box className="mr-2 h-4 w-4 shrink-0" />
						{totalCalculatedCBM.toFixed(2)} CBM Total
					</Badge>
					<Badge
						variant="outline"
						className="justify-start py-2 px-3 border-blue-200 bg-blue-50 text-blue-700 text-sm"
					>
						<Scale className="mr-2 h-4 w-4 shrink-0" />
						{totalCalculatedWeight.toFixed(1)} kg Total
					</Badge>
					<Badge
						variant="outline"
						className="justify-start py-2 px-3 border-slate-200 bg-slate-50 text-slate-600 text-sm"
					>
						<Package className="mr-2 h-4 w-4 shrink-0" />
						<span className="truncate">
							{totalUnits} un | ~{estimatedBoxes} caixas
						</span>
					</Badge>
				</div>

				<Separator className="bg-slate-100" />

				{/* Run Simulation Button */}
				<Button
					onClick={handleRunSimulation}
					disabled={!canSimulate || isSimulating}
					className="w-full bg-slate-900 text-white hover:bg-slate-800 py-5 text-sm font-medium"
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
			</CardContent>
		</Card>
	);
}
