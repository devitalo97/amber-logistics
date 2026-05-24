import { LogisticsSimulatorForm } from "#/components/forms/logistics/logistics-simulator.form";

export function LogisticsSimulatorPage() {
	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-7xl space-y-6 p-6 border-b">
				{/* Header */}
				<div className="space-y-1">
					<h1 className="text-md font-semibold tracking-tight text-slate-900">
						Simulador de Cenários Logísticos
					</h1>
					<p className="text-xs text-slate-500">
						Simule e compare rotas de transporte multi-etapa para otimizar seus
						envios
					</p>
				</div>
			</div>
			<div className="mx-auto max-w-7xl space-y-6 p-6">
				<LogisticsSimulatorForm />
			</div>
		</div>
	);
}
