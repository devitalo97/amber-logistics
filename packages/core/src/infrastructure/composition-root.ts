import { drizzle } from "drizzle-orm/postgres-js";
import { IdProvider } from "@/adapter/provider/id.provider";
import { TimestampProvider } from "@/adapter/provider/timestamp.provider";
import { BrandSiteRepository } from "@/adapter/repository/brand-site.repository";
import { UnitOfWork } from "@/adapter/repository/uow.repository";
import { WaypointRepository } from "@/adapter/repository/waypoint.repository";
import { BrandSiteCreateValidator } from "@/adapter/validator/brand-site.create.validator";
import { WaypointCreateValidator } from "@/adapter/validator/waypoint.create.validator";
import { BrandSiteCreateUseCase } from "@/application/use-case/brand-site.create.use-case";
import type * as schemas from "./db/drizzle/schema";

type Config = {
	DATABASE_URL: string;
};

class CompositionRoot {
	constructor(readonly config: Config) {}
	build() {
		const db = drizzle<typeof schemas>(this.config.DATABASE_URL);

		const idProvider = new IdProvider();
		const timestampProvider = new TimestampProvider();
		const brandSiteCreateValidator = new BrandSiteCreateValidator();
		const waypointCreateValidator = new WaypointCreateValidator();
		const uof = new UnitOfWork(db, (tx) => {
			return {
				brandSiteRepository: new BrandSiteRepository(tx),
				waypointRepository: new WaypointRepository(tx),
			};
		});
		const brandSiteCreateUseCase = new BrandSiteCreateUseCase(
			uof,
			timestampProvider,
			idProvider,
			brandSiteCreateValidator,
			waypointCreateValidator,
		);
		return {
			brandSiteCreateUseCase,
		};
	}
}

export { CompositionRoot };
