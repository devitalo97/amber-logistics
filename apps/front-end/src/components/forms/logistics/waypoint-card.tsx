import { Calendar, DollarSign, MapPin } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Separator } from "#/components/ui/separator";

interface WaypointCardProps {
	origin: string;
	setOrigin: (origin: string) => void;
	origins: { value: string; label: string }[];
	destination: string;
	setDestination: (destination: string) => void;
	destinations: { value: string; label: string }[];
}

export function WaypointCard({
	origin,
	setOrigin,
	origins,
	destination,
	setDestination,
	destinations,
}: WaypointCardProps) {
	return (
		<Card className="border-slate-200 bg-white shadow-sm">
			<CardHeader className="border-b border-slate-200">
				<CardTitle className="text-base font-semibold text-slate-800">
					Rota e Detalhes
				</CardTitle>
				<CardDescription>
					Defina a origem e destino do envio, bem como o incoterm e a moeda
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
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
			</CardContent>
		</Card>
	);
}
