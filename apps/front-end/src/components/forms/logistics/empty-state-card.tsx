import { Package } from "lucide-react";
import { Card, CardContent } from "#/components/ui/card";

export function EmptyStateCard() {
	return (
		<Card className="border-slate-200 shadow-sm">
			<CardContent className="flex flex-col items-center justify-center py-16">
				<div className="mb-4 rounded-full bg-slate-100 p-4">
					<Package className="h-8 w-8 text-slate-400" />
				</div>
				<h3 className="mb-2 text-lg font-medium text-slate-700">
					Nenhuma simulação executada
				</h3>
				<p className="max-w-sm text-center text-sm text-slate-500">
					Preencha os parâmetros de origem, destino e adicione os produtos do
					envio acima para gerar opções de roteamento otimizadas.
				</p>
			</CardContent>
		</Card>
	);
}
