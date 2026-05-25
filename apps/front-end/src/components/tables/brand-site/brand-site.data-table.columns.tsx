"use client";

import type { BrandSiteData } from "@repo/core";
import type { ColumnDef } from "@tanstack/react-table";
import { BrandSiteDataTableRowActions } from "#/components/tables/brand-site/brand-site.data-table.row-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { operationalStatuses, types } from "./data";

export const brandSiteColumns: ColumnDef<BrandSiteData>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => {
			return (
				<div className="flex gap-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("name")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "operational_status",
		header: "Operational Status",
		cell: ({ row }) => {
			const status = operationalStatuses.find(
				(status) => status.value === row.getValue("operational_status"),
			);

			if (!status) {
				return null;
			}

			return (
				<div className="flex w-[100px] items-center gap-2">
					{status.icon && (
						<status.icon className="size-4 text-muted-foreground" />
					)}
					<span>{status.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "type",
		header: "Type",
		cell: ({ row }) => {
			const type = types.find((type) => type.value === row.getValue("type"));

			if (!type) {
				return null;
			}

			return (
				<div className="flex items-center gap-2">
					{type.icon && <type.icon className="size-4 text-muted-foreground" />}
					<span>{type.label}</span>
				</div>
			);
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "waypoint",
		header: "Address",
		cell: ({ row }) => {
			const waypoint = row.original.waypoint;

			if (!waypoint) {
				return (
					<span className="text-muted-foreground text-xs italic">
						No waypoint linked
					</span>
				);
			}

			const locationParts = [waypoint.city, waypoint.state].filter(Boolean);
			const locationString = locationParts.join(", ");
			const countrySuffix = waypoint.country_code
				? ` (${waypoint.country_code})`
				: "";

			return (
				<div className="flex flex-col gap-1 py-1">
					<div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
						<span className="text-sm">
							{locationString || "Coordinates Only"}
							{countrySuffix}
						</span>
						{waypoint.address_line_1 && (
							<span className="text-xs text-muted-foreground line-clamp-1">
								{waypoint.address_line_1}
							</span>
						)}
					</div>
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <BrandSiteDataTableRowActions row={row} />,
	},
];
