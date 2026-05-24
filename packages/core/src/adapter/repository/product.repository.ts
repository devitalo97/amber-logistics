import { eq } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type { ProductData } from "@/domain/product/product.entity";
import type { IProductRepository } from "@/domain/product/product.repository.interface";
import { productTable as schema } from "@/infrastructure/db/drizzle/schema/product.table";

export class ProductRepository implements IProductRepository {
	constructor(
		private readonly db: PostgresJsDatabase<{
			productTable: typeof schema;
		}>,
	) {}

	async create(data: ProductData): Promise<void> {
		await this.db.insert(schema).values(data);
	}

	async update(id: string, data: ProductData): Promise<void> {
		await this.db.update(schema).set(data).where(eq(schema.id, id));
	}

	async delete(id: string): Promise<void> {
		await this.db.delete(schema).where(eq(schema.id, id));
	}

	async findOne(id: string): Promise<ProductData | null> {
		const rows = await this.db.select().from(schema).where(eq(schema.id, id));

		if (!rows || rows.length === 0) {
			return null;
		}

		return rows[0] as ProductData;
	}
}
