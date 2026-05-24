import type { ITimestampProvider } from "@/application/provider/timestamp-provider.interface.js";
import type { IIdProvider } from "@/application/provider/uuid-provider.interface.js";
import type { IProductCreateValidator } from "./product.create.validator.interface";

type ProductData = {
	id: string;
	name: string;
	volume_cbm_per_unit: number;
	weight_kg_per_unit: number;
	thumbnail: string | null;
	sku: string;
	created_at: Date;
	updated_at: Date;
};

type ProductEntityInput = Omit<ProductData, "id" | "created_at" | "updated_at">;

type ProductEntityUpdate = Partial<
	Omit<ProductData, "id" | "created_at" | "updated_at">
>;

class Product {
	private data: ProductData;

	private constructor(data: ProductData) {
		this.data = data;
	}

	static create(
		input: ProductEntityInput,
		uuidProvider: IIdProvider,
		timestampProvider: ITimestampProvider,
		validator: IProductCreateValidator,
	) {
		validator.validate(input);
		const id = uuidProvider.generate();
		const created_at = new Date(timestampProvider.generate());
		const updated_at = new Date(timestampProvider.generate());

		const data: ProductData = {
			...input,
			id,
			created_at,
			updated_at,
		};
		return new Product(data);
	}

	update(input: ProductEntityUpdate, dateProvider: ITimestampProvider) {
		const updated_at = new Date(dateProvider.generate());

		const cleanInput = Object.fromEntries(
			Object.entries(input).filter(([_, v]) => v !== undefined),
		);

		const data: ProductData = {
			...this.data,
			...cleanInput,
			updated_at,
		};
		return new Product(data);
	}

	getId(): string {
		return this.data.id;
	}

	toObject(): ProductData {
		return {
			...this.data,
		};
	}
}

export { Product, type ProductData, type ProductEntityInput };
