interface IRepository<T> {
	create(data: T): Promise<void>;
	update(id: string, data: T): Promise<void>;
	delete(id: string): Promise<void>;
	findOneById(id: string): Promise<T | null>;
	findManyById(ids: string[]): Promise<T[]>;
	findAll(): Promise<T[]>;
}

export type { IRepository };
