"use client";

import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { DataTableFacetedFilter } from "#/components/data-table/data-table.faceted-filter";
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

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center gap-2">
				<Input
					placeholder="Filter Sites..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
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
				<Button size="sm">Add Site</Button>
			</div>
		</div>
	);
}
