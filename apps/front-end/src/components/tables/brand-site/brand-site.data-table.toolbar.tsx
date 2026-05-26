"use client";

import { Link } from "@tanstack/react-router";
import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTableFacetedFilter } from "#/components/data-table/data-table.faceted-filter";
import { useDebounce } from "#/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { operationalStatuses, types } from "./data";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function BrandSiteDataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	const [localNameFilter, setLocalNameFilter] = useState(
		(table.getColumn("name")?.getFilterValue() as string) ?? "",
	);

	const debouncedNameFilter = useDebounce(localNameFilter, 300);

	useEffect(() => {
		table.getColumn("name")?.setFilterValue(debouncedNameFilter);
	}, [debouncedNameFilter, table]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center gap-2">
				<Input
					placeholder="Filter Sites..."
					value={localNameFilter}
					onChange={(event) => setLocalNameFilter(event.target.value)}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				{table.getColumn("operational_status") && (
					<DataTableFacetedFilter
						column={table.getColumn("operational_status")}
						title="Operational Status"
						options={operationalStatuses}
					/>
				)}
				{table.getColumn("type") && (
					<DataTableFacetedFilter
						column={table.getColumn("type")}
						title="Type"
						options={types}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => table.resetColumnFilters()}
					>
						Reset
						<X />
					</Button>
				)}
			</div>
			<div className="flex items-center gap-2">
				<Link to="/logistics/brand-sites/create">
					<Button size="lg">Add Site</Button>
				</Link>
			</div>
		</div>
	);
}
