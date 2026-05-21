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

	// Agora o seu toObject apenas expõe os dados puros alinhados com o Drizzle
	toObject(): WaypointData {
		return {
			...this.data,
		};
	}
}

export { Waypoint, type WaypointData, type WaypointEntityInput };
