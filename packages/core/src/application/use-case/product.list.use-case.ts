import type { IUseCase } from "@repo/use-case";
import type { IQuery } from "@/domain/@shared/query.interface";
import type { ProductData } from "@/domain/product/product.entity";

interface IListProductsUseCase extends IUseCase<void, ProductData[]> {}

class ListProductsUseCase implements IListProductsUseCase {
	constructor(private readonly queryAll: IQuery<void, ProductData[]>) {}

	async execute(): Promise<ProductData[]> {
		return await this.queryAll.get();
	}
}

export { type IListProductsUseCase, ListProductsUseCase };
