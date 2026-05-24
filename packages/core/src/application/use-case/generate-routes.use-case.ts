import type { IUseCase } from "@repo/use-case";
import type { WaypointData } from "@/domain/waypoint/waypoint.entity";

type ModeType = "air" | "sea" | "ground";

export interface Route {
	id: string;
	name: string;
	legs: Leg[];
}

interface Leg {
	sequence: number;
	mode: ModeType;
	origin: WaypointData;
	destination: WaypointData;
}

type Input = {
	origin: WaypointData;
	destination: WaypointData;
};

type Output = Route[];

interface IGenerateRoutesUseCase extends IUseCase<Input, Output> {}

export type { IGenerateRoutesUseCase };
