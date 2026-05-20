import type { WaypointData } from "@/domain/waypoint/waypoint.entity";

interface IGeocodingGateway {
	geocode(input: string): Promise<WaypointData[]>;
}

export type { IGeocodingGateway };
