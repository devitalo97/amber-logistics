interface IRepository<T> {
	create(data: T): Promise<void>;
	update(query: Partial<T>, data: T): Promise<void>;
	delete(query: Partial<T>): Promise<void>;
	findOne(query: Partial<T>): Promise<T | null>;
}

export type { IRepository };
