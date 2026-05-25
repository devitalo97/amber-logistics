import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "#/components/forms/auth/login.form";
import { getSession } from "#/lib/auth.functions";

export const Route = createFileRoute("/login")({
	beforeLoad: async () => {
		const session = await getSession();

		if (session) {
			throw redirect({
				to: "/logistics/dashboard",
			});
		}
	},
	component: LoginForm,
});
