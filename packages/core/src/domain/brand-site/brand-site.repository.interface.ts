import type { IRepository } from "../@shared/repository.interface";
import type { BrandSiteData } from "./brand-site.entity";

interface IBrandSiteRepository extends IRepository<BrandSiteData> {}

export type { IBrandSiteRepository };
