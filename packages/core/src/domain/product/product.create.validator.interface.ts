import type { ValidatorProvider } from "@/domain/@shared/validator.interface";
import type { ProductEntityInput } from "./product.entity";

export interface IProductCreateValidator
	extends ValidatorProvider<ProductEntityInput> {}
