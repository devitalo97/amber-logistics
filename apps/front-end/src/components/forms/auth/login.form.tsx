import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { authClient } from "#/lib/auth-client";

export function LoginForm() {
	const navigate = useNavigate();
	const { isPending } = authClient.useSession();
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	if (isPending) {
		return (
			<div className="flex items-center justify-center py-10">
				<div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900 dark:border-neutral-800 dark:border-t-neutral-100" />
			</div>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			if (isSignUp) {
				const result = await authClient.signUp.email(
					{
						email,
						password,
						name,
					},
					{
						onSuccess: () => {
							void navigate({ to: "/dashboard" });
						},
					},
				);
				if (result.error) {
					setError(result.error.message || "Sign up failed");
				}
			} else {
				const result = await authClient.signIn.email(
					{
						email,
						password,
					},
					{
						onSuccess: () => {
							void navigate({ to: "/dashboard" });
						},
					},
				);
				if (result.error) {
					setError(result.error.message || "Sign in failed");
				}
			}
		} catch (_err) {
			setError("An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center py-10 px-4">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-lg font-semibold leading-none tracking-tight">
						{isSignUp ? "Create an account" : "Sign in"}
					</CardTitle>
					<CardDescription className="text-sm">
						{isSignUp
							? "Enter your information to create an account"
							: "Enter your email below to login to your account"}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="grid gap-4">
						{isSignUp && (
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
						)}

						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								minLength={8}
							/>
						</div>

						{error && (
							<div className="bg-destructive/10 dark:bg-destructive/20 border border-destructive/20 p-3 rounded-sm">
								<p className="text-sm text-destructive">{error}</p>
							</div>
						)}

						<Button
							type="submit"
							disabled={loading}
							className="w-full h-9 mt-2"
						>
							{loading ? (
								<span className="flex items-center justify-center gap-2">
									<span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-white dark:border-neutral-600 dark:border-t-neutral-900" />
									<span>Please wait</span>
								</span>
							) : isSignUp ? (
								"Create account"
							) : (
								"Sign in"
							)}
						</Button>
					</form>

					<div className="mt-4 text-center">
						<Button
							type="button"
							variant="link"
							onClick={() => {
								setIsSignUp(!isSignUp);
								setError("");
							}}
							className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto font-normal"
						>
							{isSignUp
								? "Already have an account? Sign in"
								: "Don't have an account? Sign up"}
						</Button>
					</div>
				</CardContent>

				<CardFooter className="justify-center border-t pt-4">
					<p className="text-xs text-center text-muted-foreground">
						Built with{" "}
						<a
							href="https://better-auth.com"
							target="_blank"
							rel="noopener noreferrer"
							className="font-medium hover:text-foreground underline underline-offset-4"
						>
							BETTER-AUTH
						</a>
						.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
