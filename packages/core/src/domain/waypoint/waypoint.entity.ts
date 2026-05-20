import type { TimestampProvider } from "@/application/timestamp-provider.interface.js";
import type { UUIDProvider } from "@/application/uuid-provider.interface.js";

enum WaypointTypeEnum {
	supplier = "supplier",
	brand_site = "brand_site",
	seaport = "seaport",
	airport = "airport",
	logistic_hub = "logistic_hub",
}

type WaypointData = {
	id: string;
	description: string;
	type: WaypointTypeEnum;
	latitude: number;
	longitude: number;
	country_code: string;
	city: string;
	address_line_1: string;
	address_line_2?: string;
	postal_code: string;
	state: string;
	time_zone?: string;
	created_at: number;
	updated_at: number;
};

type WaypointEntityInput = Omit<
	WaypointData,
	"id" | "created_at" | "updated_at"
>;

type WaypointEntityUpdate = Partial<WaypointData>;

class Waypoint {
	private data: WaypointData;

	private constructor(data: WaypointData) {
		this.data = data;
	}

	static create(
		input: WaypointEntityInput,
		uuidProvider: UUIDProvider,
		timestampProvider: TimestampProvider,
	) {
		const id = uuidProvider.generate();
		const created_at = timestampProvider.generate();
		const updated_at = timestampProvider.generate();
		const data: WaypointData = {
			...input,
			id,
			created_at,
			updated_at,
		};
		return new Waypoint(data);
	}

	update(input: WaypointEntityUpdate, dateProvider: TimestampProvider) {
		const updated_at = dateProvider.generate();
		const data: WaypointData = {
			...this.data,
			...input,
			updated_at,
		};
		return new Waypoint(data);
	}

	toObject() {
		return {
			...this.data,
			created_at: new Date(this.data.created_at),
			updated_at: new Date(this.data.updated_at),
		};
	}
}

export { Waypoint, type WaypointData, WaypointTypeEnum };
