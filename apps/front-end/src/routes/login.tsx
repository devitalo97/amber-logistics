import { createFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#/components/forms/auth/login";

export const Route = createFileRoute("/login")({
	component: LoginForm,
});
