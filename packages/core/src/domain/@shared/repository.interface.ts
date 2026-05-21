interface IRepository<T> {
	create(data: T): Promise<void>;
	update(id: string, data: T): Promise<void>;
	delete(id: string): Promise<void>;
	findOne(id: string): Promise<T | null>;
}

export type { IRepository };
