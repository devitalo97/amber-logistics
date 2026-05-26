import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getBrandSitesFn } from "#/lib/logistics.functions";
import { BrandSiteListPage } from "#/pages/brand-site.list.page";

const searchSchema = z.object({
	cursor: z.string().optional(),
	limit: z.number().catch(25).default(25),
	sortBy: z.string().optional(),
	sortOrder: z.enum(["asc", "desc"]).optional(),
	name: z.string().optional(),
	operational_status: z.string().optional(),
	type: z.string().optional(),
});

export const Route = createFileRoute("/_protected/logistics/brand-sites/")({
	validateSearch: (search) => searchSchema.parse(search),
	loaderDeps: ({ search }) => search,
	loader: async ({ context: { queryClient }, deps }) => {
		await queryClient.ensureQueryData({
			queryKey: ["brandSites", deps],
			queryFn: () => getBrandSitesFn({ data: deps }),
		});
	},
	component: BrandSiteListPage,
});
