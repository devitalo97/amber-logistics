interface PaginatedResult<T> {
	data: T[];
	totalCount: number;
	nextCursor?: string | null;
	previousCursor?: string | null;
}

interface IQuery<Input, Output> {
	get(params: Input): Promise<Output>;
}

export type { IQuery, PaginatedResult };
