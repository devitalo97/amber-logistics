import { createFileRoute } from "@tanstack/react-router";
import { BrandSiteCreatePage } from "#/pages/brand-site.create.page";

export const Route = createFileRoute("/_protected/logistics/brand-sites/create")({
	component: BrandSiteCreatePage,
});
