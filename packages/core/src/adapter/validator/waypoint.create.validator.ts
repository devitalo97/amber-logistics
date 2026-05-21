import z from "zod";
import type { IWaypointCreateValidator } from "@/domain/waypoint/waypoint.create.validator.interface";
import {
	type WaypointEntityInput,
	WaypointTypeEnum,
} from "@/domain/waypoint/waypoint.entity";

class WaypointCreateValidator implements IWaypointCreateValidator {
	private schema = z.object({
		type: z.enum(WaypointTypeEnum),
		description: z.string(),
		latitude: z.number(),
		longitude: z.number(),
		country_code: z.string(),
		city: z.string(),
		address_line_1: z.string(),
		address_line_2: z.string().optional(),
		postal_code: z.string(),
		state: z.string(),
		time_zone: z.string().optional(),
	});
	validate(input: WaypointEntityInput): void {
		this.schema.parse(input);
	}
}

export { WaypointCreateValidator };
