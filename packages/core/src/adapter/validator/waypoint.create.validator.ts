import z from "zod";
import type { IWaypointCreateValidator } from "@/domain/waypoint/waypoint.create.validator.interface";
import {
	type WaypointEntityInput,
	WaypointTypeEnum,
} from "@/domain/waypoint/waypoint.entity";

class WaypointCreateValidator implements IWaypointCreateValidator {
	private schema = z.object({
		type: z.enum(WaypointTypeEnum).nullable().optional(),
		latitude: z.number(),
		longitude: z.number(),
		country_code: z.string().nullable().optional(),
		city: z.string().nullable().optional(),
		address_line_1: z.string().nullable().optional(),
		address_line_2: z.string().nullable().optional(),
		postal_code: z.string().nullable().optional(),
		state: z.string().nullable().optional(),
		time_zone: z.string().nullable().optional(),
	});
	validate(input: WaypointEntityInput): void {
		this.schema.parse(input);
	}
}

export { WaypointCreateValidator };
