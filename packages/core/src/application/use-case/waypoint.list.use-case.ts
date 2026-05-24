import type { IUseCase } from "@repo/use-case";
import type { WaypointData } from "@/domain/waypoint/waypoint.entity";
import type { IWaypointRepository } from "@/domain/waypoint/waypoint.repository.interface";

interface IListWaypointsUseCase extends IUseCase<void, WaypointData[]> {}

class ListWaypointsUseCase implements IListWaypointsUseCase {
	constructor(private readonly waypointRepository: IWaypointRepository) {}

	async execute(): Promise<WaypointData[]> {
		return await this.waypointRepository.findAll();
	}
}

export { type IListWaypointsUseCase, ListWaypointsUseCase };
