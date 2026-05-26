import type {
	ColumnFiltersState,
	PaginationState,
	SortingState,
} from "@tanstack/react-table";

export interface BaseTableSearch {
	cursor?: string;
	limit?: number;
	sortBy?: string;
	sortOrder?: "asc" | "desc";
}

interface UseDataTableSyncProps<TSearch extends BaseTableSearch> {
	search: TSearch;
	navigate: (options: {
		search: (old: TSearch) => any;
		replace?: boolean;
		resetScroll?: boolean;
	}) => void;
	filterKeys?: (keyof TSearch)[];
	nextCursor?: string | null;
	previousCursor?: string | null;
}

export function useDataTableFilter<TSearch extends BaseTableSearch>({
	search,
	navigate,
	filterKeys = [],
	nextCursor,
	previousCursor,
}: UseDataTableSyncProps<TSearch>) {
	const limit = search.limit ?? 25;

	// --- Pagination ---
	const pagination: PaginationState = {
		pageIndex: search.cursor
			? Math.floor(parseInt(search.cursor, 10) / limit)
			: 0,
		pageSize: limit,
	};

	const handlePaginationChange = (
		updaterOrValue:
			| PaginationState
			| ((old: PaginationState) => PaginationState),
	) => {
		const newPagination =
			typeof updaterOrValue === "function"
				? updaterOrValue(pagination)
				: updaterOrValue;

		navigate({
			search: (old) => ({
				...old,
				limit: newPagination.pageSize,
				cursor: newPagination.pageSize !== old.limit ? undefined : old.cursor,
			}),
			replace: true,
			resetScroll: false,
		});
	};

	const handleNextPage = () => {
		if (nextCursor) {
			navigate({
				search: (old) => ({ ...old, cursor: nextCursor }),
				replace: true,
				resetScroll: false,
			});
		}
	};

	const handlePreviousPage = () => {
		if (previousCursor) {
			navigate({
				search: (old) => ({ ...old, cursor: previousCursor }),
				replace: true,
				resetScroll: false,
			});
		}
	};

	// --- Sorting ---
	const sorting: SortingState = search.sortBy
		? [{ id: search.sortBy, desc: search.sortOrder === "desc" }]
		: [];

	const handleSortingChange = (
		updaterOrValue: SortingState | ((old: SortingState) => SortingState),
	) => {
		const newSorting =
			typeof updaterOrValue === "function"
				? updaterOrValue(sorting)
				: updaterOrValue;

		navigate({
			search: (old) => ({
				...old,
				sortBy: newSorting[0]?.id,
				sortOrder: newSorting[0]?.desc ? "desc" : "asc",
				cursor: undefined,
			}),
			replace: true,
			resetScroll: false,
		});
	};

	// --- Filtering ---
	const columnFilters: ColumnFiltersState = filterKeys
		.filter((key) => search[key] !== undefined && search[key] !== "")
		.map((key) => ({
			id: key as string,
			value: search[key],
		}));

	const handleColumnFiltersChange = (
		updaterOrValue:
			| ColumnFiltersState
			| ((old: ColumnFiltersState) => ColumnFiltersState),
	) => {
		const newFilters =
			typeof updaterOrValue === "function"
				? updaterOrValue(columnFilters)
				: updaterOrValue;

		const filterUpdates = filterKeys.reduce(
			(acc, key) => {
				const filter = newFilters.find((f) => f.id === key);
				acc[key] = filter ? filter.value : undefined;
				return acc;
			},
			{} as Record<keyof TSearch, any>,
		);

		navigate({
			search: (old) => ({
				...old,
				...filterUpdates,
				cursor: undefined,
			}),
			replace: true,
			resetScroll: false,
		});
	};

	return {
		pagination,
		sorting,
		columnFilters,
		handlePaginationChange,
		handleNextPage,
		handlePreviousPage,
		handleSortingChange,
		handleColumnFiltersChange,
	};
}
