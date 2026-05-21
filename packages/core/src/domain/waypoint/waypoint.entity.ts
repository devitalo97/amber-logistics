import type { ITimestampProvider } from "@/application/provider/timestamp-provider.interface.js";
import type { IIdProvider } from "@/application/provider/uuid-provider.interface.js";
import type { IWaypointCreateValidator } from "./waypoint.create.validator.interface";

enum WaypointTypeEnum {
	supplier = "supplier",
	brand_site = "brand_site",
	seaport = "seaport",
	airport = "airport",
	logistic_hub = "logistic_hub",
}

type WaypointData = {
	id: string;
	description: string | null;
	type: WaypointTypeEnum | null;
	latitude: number;
	longitude: number;
	country_code: string | null;
	city: string | null;
	address_line_1: string | null;
	address_line_2?: string | null;
	postal_code: string | null;
	state: string | null;
	time_zone?: string | null;
	created_at: Date;
	updated_at: Date;
};

type WaypointEntityInput = Omit<
	WaypointData,
	"id" | "created_at" | "updated_at"
>;

type WaypointEntityUpdate = Partial<
	Omit<WaypointData, "id" | "created_at" | "updated_at">
>;

class Waypoint {
	private data: WaypointData;

	private constructor(data: WaypointData) {
		this.data = data;
	}

	static create(
		input: WaypointEntityInput,
		uuidProvider: IIdProvider,
		timestampProvider: ITimestampProvider,
		validator: IWaypointCreateValidator,
	) {
		validator.validate(input);
		const id = uuidProvider.generate();
		const created_at = new Date(timestampProvider.generate());
		const updated_at = new Date(timestampProvider.generate());

		const data: WaypointData = {
			...input,
			id,
			created_at,
			updated_at,
		};
		return new Waypoint(data);
	}

	update(input: WaypointEntityUpdate, dateProvider: ITimestampProvider) {
		const updated_at = new Date(dateProvider.generate());

		const cleanInput = Object.fromEntries(
			Object.entries(input).filter(([_, v]) => v !== undefined),
		);

		const data: WaypointData = {
			...this.data,
			...cleanInput,
			updated_at,
		};
		return new Waypoint(data);
	}

	getId(): string {
		return this.data.id;
	}

	toObject(): WaypointData {
		return {
			...this.data,
		};
	}
}

export {
	Waypoint,
	type WaypointData,
	type WaypointEntityInput,
	WaypointTypeEnum,
};
