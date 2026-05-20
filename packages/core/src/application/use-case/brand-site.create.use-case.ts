import type { IUseCase } from "@repo/use-case";
import {
	BrandSite,
	type BrandSiteData,
} from "@/domain/brand-site/brand-site.entity";
import type { IBrandSiteRepository } from "@/domain/brand-site/brand-site.repository.interface";
import { Waypoint, type WaypointData } from "@/domain/waypoint/waypoint.entity";
import type { IWaypointRepository } from "@/domain/waypoint/waypoint.repository.interface";
import type { ITimestampProvider } from "../provider/timestamp-provider.interface";
import type { IIdProvider } from "../provider/uuid-provider.interface";

interface BrandSiteCreateInput {
	brandSite: BrandSiteData;
	waypoint: WaypointData;
}

interface IBrandSiteCreateUseCase
	extends IUseCase<BrandSiteCreateInput, BrandSiteData> {}

class BrandSiteCreateUseCase implements IBrandSiteCreateUseCase {
	constructor(
		private readonly brandSiteRepository: IBrandSiteRepository,
		private readonly waypointRepository: IWaypointRepository,
		private readonly dateProvider: ITimestampProvider,
		private readonly idProvider: IIdProvider,
	) {}

	async execute(input: BrandSiteCreateInput): Promise<BrandSiteData> {
		const { brandSite, waypoint } = input;
		const brandSiteEntity = BrandSite.create(
			brandSite,
			this.idProvider,
			this.dateProvider,
		);
		const waypointEntity = Waypoint.create(
			waypoint,
			this.idProvider,
			this.dateProvider,
		);
		return brandSiteEntity.toObject();
	}
}

export { BrandSiteCreateUseCase, type IBrandSiteCreateUseCase };
