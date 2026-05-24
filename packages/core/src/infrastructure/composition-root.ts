import { drizzle } from "drizzle-orm/postgres-js";
import { MockCarrierMarketplaceGateway } from "@/adapter/gateway/mock-carrier-marketplace.gateway";
import { NominatimGeocodingGateway } from "@/adapter/gateway/nominatim-geocoding.gateway";
import { IdProvider } from "@/adapter/provider/id.provider";
import { TimestampProvider } from "@/adapter/provider/timestamp.provider";
import { BrandSiteRepository } from "@/adapter/repository/brand-site.repository";
import { ProductRepository } from "@/adapter/repository/product.repository";
import { UnitOfWork } from "@/adapter/repository/uow.repository";
import { WaypointRepository } from "@/adapter/repository/waypoint.repository";
import { BrandSiteCreateValidator } from "@/adapter/validator/brand-site.create.validator";
import { WaypointCreateValidator } from "@/adapter/validator/waypoint.create.validator";
import { BrandSiteCreateUseCase } from "@/application/use-case/brand-site.create.use-case";
import { GenerateRoutesUseCase } from "@/application/use-case/generate-routes.use-case";
import { GenerateScenariosUseCase } from "@/application/use-case/generate-scenarios.use-case";
import { SimulateLogisticsScenariosUseCase } from "@/application/use-case/simulate-logistics-scenarios.use-case";
import { WaypointSearchUseCase } from "@/application/use-case/waypoint.search.use-case";
import type * as schemas from "./db/drizzle/schema";

type Config = {
	DATABASE_URL: string;
	GEOC_USER_AGENT?: string;
	GEOC_BASE_URL?: string;
};

class CompositionRoot {
	constructor(readonly config: Config) {}

	build() {
		const db = drizzle<typeof schemas>(this.config.DATABASE_URL);

		// Providers & Validators
		const idProvider = new IdProvider();
		const timestampProvider = new TimestampProvider();
		const brandSiteCreateValidator = new BrandSiteCreateValidator();
		const waypointCreateValidator = new WaypointCreateValidator();

		// Gateways
		const geocodingGateway = new NominatimGeocodingGateway({
			userAgent: this.config.GEOC_USER_AGENT,
			baseUrl: this.config.GEOC_BASE_URL,
		});
		const carrierMarketplaceGateway = new MockCarrierMarketplaceGateway();

		// Repositories
		const productRepository = new ProductRepository(db);
		const waypointRepository = new WaypointRepository(db);

		const uof = new UnitOfWork(db, (tx) => {
			return {
				brandSiteRepository: new BrandSiteRepository(tx),
				waypointRepository: new WaypointRepository(tx),
			};
		});

		// Use Cases
		const brandSiteCreateUseCase = new BrandSiteCreateUseCase(
			uof,
			timestampProvider,
			idProvider,
			brandSiteCreateValidator,
			waypointCreateValidator,
		);
		const waypointSearchUseCase = new WaypointSearchUseCase(geocodingGateway);

		const generateRoutesUseCase = new GenerateRoutesUseCase();
		const generateScenariosUseCase = new GenerateScenariosUseCase(
			carrierMarketplaceGateway,
		);

		const simulateLogisticsScenariosUseCase =
			new SimulateLogisticsScenariosUseCase(
				productRepository,
				waypointRepository,
				generateRoutesUseCase,
				generateScenariosUseCase,
			);

		return {
			brandSiteCreateUseCase,
			waypointSearchUseCase,
			simulateLogisticsScenariosUseCase,
		};
	}
}

export { CompositionRoot };
