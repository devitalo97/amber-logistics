import type { ValidatorProvider } from "@/domain/@shared/validator.interface";
import type { WaypointEntityInput } from "./waypoint.entity";

export interface IWaypointCreateValidator
	extends ValidatorProvider<WaypointEntityInput> {}
