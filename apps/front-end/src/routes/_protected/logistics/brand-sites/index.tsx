import { createFileRoute } from "@tanstack/react-router";
import { getBrandSitesFn } from "#/lib/logistics.functions";
import { BrandSiteListPage } from "#/pages/brand-site.list.page";

export const Route = createFileRoute("/_protected/logistics/brand-sites/")({
	loader: async () => {
		const brandSites = await getBrandSitesFn();
		return { brandSites };
	},
	component: BrandSiteListPage,
});
