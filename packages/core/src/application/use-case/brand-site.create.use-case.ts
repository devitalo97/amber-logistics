import type { IUseCase } from "@repo/use-case";
import type { IUnitOfWork } from "@/domain/@shared/unit-of-work.repository.interface";
import type { IBrandSiteCreateValidator } from "@/domain/brand-site/brand-site.create.validator.interface";
import {
	BrandSite,
	type BrandSiteData,
	type BrandSiteEntityInput,
} from "@/domain/brand-site/brand-site.entity";
import type { IBrandSiteRepository } from "@/domain/brand-site/brand-site.repository.interface";
import type { IWaypointCreateValidator } from "@/domain/waypoint/waypoint.create.validator.interface";
import {
	Waypoint,
	type WaypointEntityInput,
} from "@/domain/waypoint/waypoint.entity";
import type { IWaypointRepository } from "@/domain/waypoint/waypoint.repository.interface";
import type { ITimestampProvider } from "../provider/timestamp-provider.interface";
import type { IIdProvider } from "../provider/uuid-provider.interface";

interface UseCaseInput {
	brandSite: BrandSiteEntityInput;
	waypoint: WaypointEntityInput;
}

interface IBrandSiteCreateUseCase
	extends IUseCase<UseCaseInput, BrandSiteData> {}

interface IBrandSiteAndWaypointUow
	extends IUnitOfWork<{
		brandSiteRepository: IBrandSiteRepository;
		waypointRepository: IWaypointRepository;
	}> {}

class BrandSiteCreateUseCase implements IBrandSiteCreateUseCase {
	constructor(
		private readonly uow: IBrandSiteAndWaypointUow,
		private readonly dateProvider: ITimestampProvider,
		private readonly idProvider: IIdProvider,
		private readonly brandSiteValidator: IBrandSiteCreateValidator,
		private readonly waypointValidator: IWaypointCreateValidator,
	) {}

	async execute(input: UseCaseInput): Promise<BrandSiteData> {
		const { brandSite, waypoint } = input;
		const waypointEntity = Waypoint.create(
			waypoint,
			this.idProvider,
			this.dateProvider,
			this.waypointValidator,
		);
		const brandSiteEntity = BrandSite.create(
			brandSite,
			this.idProvider,
			this.dateProvider,
			this.brandSiteValidator,
		);
		brandSiteEntity.syncWaypoint(waypointEntity.getId(), this.dateProvider);

		await this.uow.transaction(async (context) => {
			await context.brandSiteRepository.create(brandSiteEntity.toObject());
			await context.waypointRepository.create(waypointEntity.toObject());
		});
		return brandSiteEntity.toObject();
	}
}

export { BrandSiteCreateUseCase, type IBrandSiteCreateUseCase };
