import type { IUseCase } from "@repo/use-case";
import type { WaypointData } from "@/domain/waypoint/waypoint.entity";
import { TransportModeType } from "../gateway/carrier-marketplace.gateway.interface";

export interface Leg {
	sequence: number;
	mode: TransportModeType;
	origin: WaypointData;
	destination: WaypointData;
}

export interface Route {
	id: string;
	name: string;
	legs: Leg[];
}

type Input = {
	origin: WaypointData;
	destination: WaypointData;
};

type Output = Route[];

export interface IGenerateRoutesUseCase extends IUseCase<Input, Output> {}

export class GenerateRoutesUseCase implements IGenerateRoutesUseCase {
	async execute(input: Input): Promise<Output> {
		const { origin, destination } = input;

		// Mock de infraestrutura intermodal abstrata baseada nas coordenadas reais
		const portOrigin: WaypointData = {
			...origin,
			id: crypto.randomUUID(),
			description: `Terminal Portuário (${origin.city || "Origem"})`,
		};
		const portDest: WaypointData = {
			...destination,
			id: crypto.randomUUID(),
			description: `Terminal Portuário (${destination.city || "Destino"})`,
		};
		const airportOrigin: WaypointData = {
			...origin,
			id: crypto.randomUUID(),
			description: `Hub de Carga Aérea (${origin.city || "Origem"})`,
		};
		const airportDest: WaypointData = {
			...destination,
			id: crypto.randomUUID(),
			description: `Hub de Carga Aérea (${destination.city || "Destino"})`,
		};
		const railTerminal: WaypointData = {
			...destination,
			id: crypto.randomUUID(),
			description: `Terminal Ferroviário Regional`,
		};

		return [
			{
				id: crypto.randomUUID(),
				name: "Opção 1: Combo Mar-Terra Mais Rápido",
				legs: [
					{
						sequence: 1,
						mode: TransportModeType.sea,
						origin: portOrigin,
						destination: portDest,
					},
					{
						sequence: 2,
						mode: TransportModeType.land,
						origin: portDest,
						destination: railTerminal,
					},
					{
						sequence: 3,
						mode: TransportModeType.land,
						origin: railTerminal,
						destination: destination,
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Opção 2: Rota Oceânica Econômica",
				legs: [
					{
						sequence: 1,
						mode: TransportModeType.sea,
						origin: portOrigin,
						destination: portDest,
					},
					{
						sequence: 2,
						mode: TransportModeType.land,
						origin: portDest,
						destination: destination,
					},
				],
			},
			{
				id: crypto.randomUUID(),
				name: "Opção 3: Expresso Aéreo Premium",
				legs: [
					{
						sequence: 1,
						mode: TransportModeType.air,
						origin: airportOrigin,
						destination: airportDest,
					},
					{
						sequence: 2,
						mode: TransportModeType.land,
						origin: airportDest,
						destination: destination,
					},
				],
			},
		];
	}
}
