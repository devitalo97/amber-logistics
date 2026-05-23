import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="flex justify-center py-10 px-4">
			<div className="w-full max-w-md p-6 space-y-6">
				<div className="space-y-1.5">
					<h1 className="text-lg font-semibold leading-none tracking-tight">
						Home
					</h1>
					<p className="text-sm text-neutral-500 dark:text-neutral-400">
						Welcome to the home page.
					</p>
				</div>
			</div>
		</div>
	);
}
