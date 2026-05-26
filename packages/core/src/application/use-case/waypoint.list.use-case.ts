import type { IUseCase } from "@repo/use-case";
import type { IQuery } from "@/domain/@shared/query.interface";
import type { WaypointData } from "@/domain/waypoint/waypoint.entity";

interface IListWaypointsUseCase extends IUseCase<void, WaypointData[]> {}

class ListWaypointsUseCase implements IListWaypointsUseCase {
	constructor(private readonly queryAll: IQuery<void, WaypointData[]>) {}

	async execute(): Promise<WaypointData[]> {
		return await this.queryAll.get();
	}
}

export { type IListWaypointsUseCase, ListWaypointsUseCase };
