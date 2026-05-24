import type { IRepository } from "../@shared/repository.interface";
import type { ProductData } from "./product.entity";

interface IProductRepository extends IRepository<ProductData> {}

export type { IProductRepository };
