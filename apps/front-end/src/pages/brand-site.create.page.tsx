"use client";

import { useState } from "react";
import { BrandSiteForm } from "#/components/forms/brad-site/brand-site.create.form";
import {
	BrandSiteCreateMap,
	type MapPoint,
} from "#/components/forms/brad-site/brand-site.create.map.form";

export function BrandSiteCreatePage() {
	const [point, setPoint] = useState<MapPoint>({
		lat: null,
		lng: null,
	});

	const handlePointChange = ({ lat, lng }: MapPoint) => {
		setPoint({ lat, lng });
	};

	return (
		<main className="flex h-screen w-full flex-col lg:flex-row">
			{/* Left Column - Form (60% on desktop) */}
			<div className="h-full w-full overflow-y-auto bg-background p-6 lg:w-[60%] lg:p-8">
				<BrandSiteForm handlePointChange={handlePointChange} />
			</div>

			{/* Right Column - Map (40% on desktop) */}
			<div className="hidden h-full w-[40%] lg:block">
				<div className="sticky top-0 h-screen w-full">
					<BrandSiteCreateMap point={point} />
				</div>
			</div>

			{/* Mobile Map Preview */}
			<div className="h-64 w-full lg:hidden">
				<BrandSiteCreateMap point={point} />
			</div>
		</main>
	);
}
