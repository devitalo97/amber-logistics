import { createFileRoute, redirect } from "@tanstack/react-router";
import { ProtectedLayout } from "#/components/layout/protected.layout";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/_protected")({
	beforeLoad: async ({ location, context: { queryClient } }) => {
		const session = await queryClient.fetchQuery({
			queryKey: ["session"],
			queryFn: getSession,
			staleTime: 1000 * 60 * 5,
		});

		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}

		return { user: session.user };
	},
	component: ProtectedLayout,
});
