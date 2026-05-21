import type { IGeocodingGateway } from "@/application/gateway/geocoding.gateway.interface";
import { type WaypointData, WaypointTypeEnum } from "@/domain/waypoint/waypoint.entity";

type NominatimAddress = {
	road?: string;
	suburb?: string;
	city?: string;
	town?: string;
	village?: string;
	county?: string;
	state?: string;
	postcode?: string;
	country?: string;
	country_code?: string;
};

type NominatimSearchResult = {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	class: string;
	type: string;
	importance: number;
	address?: NominatimAddress;
};

export class NominatimGeocodingGateway implements IGeocodingGateway {
	private readonly userAgent: string;
	private readonly baseUrl: string;

	constructor(options?: { userAgent?: string; baseUrl?: string }) {
		this.userAgent = options?.userAgent || "AmberLogistics/1.0 (contact: info@amberlogistics.local)";
		this.baseUrl = options?.baseUrl || "https://nominatim.openstreetmap.org/search";
	}

	async geocode(input: string): Promise<WaypointData[]> {
		if (!input || input.trim() === "") {
			return [];
		}

		const url = new URL(this.baseUrl);
		url.searchParams.append("q", input);
		url.searchParams.append("format", "json");
		url.searchParams.append("addressdetails", "1");
		url.searchParams.append("limit", "5");

		try {
			const response = await fetch(url.toString(), {
				headers: {
					"User-Agent": this.userAgent,
					Accept: "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Geocoding request failed with status: ${response.status} ${response.statusText}`);
			}

			const results = (await response.json()) as NominatimSearchResult[];

			return results.map((item) => {
				const address = item.address;
				const city = address?.city || address?.town || address?.village || address?.county || null;
				const countryCode = address?.country_code ? address.country_code.toUpperCase() : null;

				return {
					id: crypto.randomUUID(),
					description: item.display_name || null,
					type: null,
					latitude: Number.parseFloat(item.lat),
					longitude: Number.parseFloat(item.lon),
					country_code: countryCode,
					city: city,
					address_line_1: address?.road || item.display_name || null,
					address_line_2: address?.suburb || null,
					postal_code: address?.postcode || null,
					state: address?.state || null,
					time_zone: null,
					created_at: new Date(),
					updated_at: new Date(),
				};
			});
		} catch (error) {
			console.error("Error in NominatimGeocodingGateway.geocode:", error);
			throw error;
		}
	}
}
