import type { IRepository } from "../@shared/repository.interface";
import type { WaypointData } from "./waypoint.entity";

interface IWaypointRepository extends IRepository<WaypointData> {}

export type { IWaypointRepository };
