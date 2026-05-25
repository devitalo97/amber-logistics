"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type OnChangeFn,
	type PaginationState,
	type SortingState,
	type Table as TanstackTable,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table.pagination";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	toolbar?: (table: TanstackTable<TData>) => React.ReactNode;
	// Pagination
	pagination?: PaginationState;
	onPaginationChange?: OnChangeFn<PaginationState>;
	pageCount?: number;
	rowCount?: number;
	hasNextPage?: boolean;
	hasPreviousPage?: boolean;
	onNextPage?: () => void;
	onPreviousPage?: () => void;
	// Sorting
	sorting?: SortingState;
	onSortingChange?: OnChangeFn<SortingState>;
	// Filtering
	columnFilters?: ColumnFiltersState;
	onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	toolbar,
	pagination,
	onPaginationChange,
	pageCount,
	rowCount,
	hasNextPage,
	hasPreviousPage,
	onNextPage,
	onPreviousPage,
	sorting,
	onSortingChange,
	columnFilters,
	onColumnFiltersChange,
}: DataTableProps<TData, TValue>) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});

	// Fallbacks for internal state if controlled props are not provided
	const [internalColumnFilters, setInternalColumnFilters] =
		React.useState<ColumnFiltersState>([]);
	const [internalSorting, setInternalSorting] = React.useState<SortingState>(
		[],
	);
	const [internalPagination, setInternalPagination] =
		React.useState<PaginationState>({ pageIndex: 0, pageSize: 25 });

	const isControlledPagination = pagination !== undefined;
	const isControlledSorting = sorting !== undefined;
	const isControlledFiltering = columnFilters !== undefined;

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting: isControlledSorting ? sorting : internalSorting,
			columnVisibility,
			rowSelection,
			columnFilters: isControlledFiltering
				? columnFilters
				: internalColumnFilters,
			pagination: isControlledPagination ? pagination : internalPagination,
		},
		pageCount: isControlledPagination ? (pageCount ?? -1) : undefined,
		rowCount: isControlledPagination ? rowCount : undefined,
		manualPagination: isControlledPagination,
		manualSorting: isControlledSorting,
		manualFiltering: isControlledFiltering,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: isControlledSorting ? onSortingChange : setInternalSorting,
		onColumnFiltersChange: isControlledFiltering
			? onColumnFiltersChange
			: setInternalColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: isControlledPagination
			? onPaginationChange
			: setInternalPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className="flex flex-col gap-4">
			{toolbar?.(table)}
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination
				table={table}
				hasNextPage={hasNextPage}
				hasPreviousPage={hasPreviousPage}
				onNextPage={onNextPage}
				onPreviousPage={onPreviousPage}
			/>
		</div>
	);
}
