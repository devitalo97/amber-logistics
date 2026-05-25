import { DataTable } from "#/components/data-table/data-table";
import { brandSiteColumns } from "#/components/tables/brand-site/brand-site.data-table.columns";
import { BrandSiteDataTableToolbar } from "#/components/tables/brand-site/brand-site.data-table.toolbar";
import { Route } from "#/routes/_protected/logistics/brand-sites/";

export function BrandSiteListPage() {
	const { brandSites } = Route.useLoaderData();
	return (
		<div>
			<DataTable
				columns={brandSiteColumns}
				data={brandSites}
				toolbar={(table) => <BrandSiteDataTableToolbar table={table} />}
			/>
		</div>
	);
}
