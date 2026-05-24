import type { IUseCase } from "@repo/use-case";
import type { ProductData } from "@/domain/product/product.entity";
import type { IProductRepository } from "@/domain/product/product.repository.interface";

interface IListProductsUseCase extends IUseCase<void, ProductData[]> {}

class ListProductsUseCase implements IListProductsUseCase {
	constructor(private readonly productRepository: IProductRepository) {}

	async execute(): Promise<ProductData[]> {
		return await this.productRepository.findAll();
	}
}

export { type IListProductsUseCase, ListProductsUseCase };
