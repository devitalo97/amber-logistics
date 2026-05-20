import type { IUseCase } from "@repo/use-case";
import type { WaypointData } from "@/domain/waypoint/waypoint.entity";
import type { IGeocodingGateway } from "../gateway/geocoding.gateway.interface";

interface IWaypointSearchUseCase extends IUseCase<string, WaypointData[]> {}

class WaypointSearchUseCase implements IWaypointSearchUseCase {
	constructor(private readonly geocodingGateway: IGeocodingGateway) {}

	async execute(query: string): Promise<WaypointData[]> {
		return await this.geocodingGateway.geocode(query);
	}
}

export { type IWaypointSearchUseCase, WaypointSearchUseCase };
