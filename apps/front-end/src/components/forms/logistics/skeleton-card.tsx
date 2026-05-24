import { Card, CardContent } from "#/components/ui/card";

export function SkeletonCard() {
	return (
		<Card className="border-slate-200 bg-white">
			<CardContent className="pt-6">
				<div className="animate-pulse space-y-4">
					<div className="h-5 w-3/4 rounded bg-slate-200" />
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<div className="h-3 w-16 rounded bg-slate-200" />
							<div className="h-8 w-24 rounded bg-slate-200" />
						</div>
						<div className="space-y-2">
							<div className="h-3 w-16 rounded bg-slate-200" />
							<div className="h-8 w-20 rounded bg-slate-200" />
						</div>
					</div>
					<div className="h-12 rounded bg-slate-100" />
					<div className="h-10 rounded bg-slate-200" />
				</div>
			</CardContent>
		</Card>
	);
}
