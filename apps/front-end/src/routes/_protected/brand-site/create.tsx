import { createFileRoute } from "@tanstack/react-router";
import { BrandSiteCreatePage } from "#/pages/brand-site.create.page";

export const Route = createFileRoute("/_protected/brand-site/create")({
	component: BrandSiteCreatePage,
});
