import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { DataTable } from "#/components/data-table/data-table";
import { useDataTableFilter } from "#/components/data-table/use-data-table-filter";
import { brandSiteColumns } from "#/components/tables/brand-site/brand-site.data-table.columns";
import { BrandSiteDataTableToolbar } from "#/components/tables/brand-site/brand-site.data-table.toolbar";
import { getBrandSitesFn } from "#/lib/logistics.functions";
import { Route } from "#/routes/_protected/logistics/brand-sites/";

export function BrandSiteListPage() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const { data: response } = useQuery({
		queryKey: ["brandSites", search],
		queryFn: () => getBrandSitesFn({ data: search }),
		placeholderData: keepPreviousData,
	});

	const {
		pagination,
		sorting,
		columnFilters,
		handlePaginationChange,
		handleNextPage,
		handlePreviousPage,
		handleSortingChange,
		handleColumnFiltersChange,
	} = useDataTableFilter({
		search,
		navigate,
		filterKeys: ["name", "operational_status", "type"],
		nextCursor: response?.nextCursor,
		previousCursor: response?.previousCursor,
	});

	if (!response) {
		return (
			<div className="flex h-96 w-full items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
		);
	}

	const { data, totalCount } = response;

	return (
		<div>
			<DataTable
				columns={brandSiteColumns}
				data={data}
				toolbar={(table) => <BrandSiteDataTableToolbar table={table} />}
				pagination={pagination}
				onPaginationChange={handlePaginationChange}
				pageCount={totalCount ? Math.ceil(totalCount / search.limit) : -1}
				rowCount={totalCount}
				hasNextPage={!!response.nextCursor}
				hasPreviousPage={!!response.previousCursor}
				onNextPage={handleNextPage}
				onPreviousPage={handlePreviousPage}
				sorting={sorting}
				onSortingChange={handleSortingChange}
				columnFilters={columnFilters}
				onColumnFiltersChange={handleColumnFiltersChange}
			/>
		</div>
	);
}
