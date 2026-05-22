"use client";

import { useState } from "react";
import { BrandSiteForm } from "#/components/forms/brad-site/brand-site.create.form";

export function BrandSiteCreatePage() {
	const [coordinates, setCoordinates] = useState<{
		latitude: number | null;
		longitude: number | null;
	}>({
		latitude: null,
		longitude: null,
	});

	const handleCoordinatesChange = (lat: number | null, lng: number | null) => {
		setCoordinates({ latitude: lat, longitude: lng });
	};

	return (
		<main className="flex h-screen w-full flex-col lg:flex-row">
			{/* Left Column - Form (60% on desktop) */}
			<div className="h-full w-full overflow-y-auto bg-background p-6 lg:w-[60%] lg:p-8">
				<div className="mx-auto max-w-2xl">
					<div className="mb-8">
						<h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
							Criar Brand Site
						</h1>
						<p className="mt-2 text-pretty text-muted-foreground">
							Preencha as informações abaixo para criar um novo Brand Site. O
							mapa ao lado será atualizado automaticamente com as coordenadas
							fornecidas.
						</p>
					</div>
					<BrandSiteForm onCoordinatesChange={handleCoordinatesChange} />
				</div>
			</div>

			{/* Right Column - Map (40% on desktop) */}
			<div className="hidden h-full w-[40%] lg:block">
				<div className="sticky top-0 h-screen w-full">
					{/* <BrandSiteMap
						latitude={coordinates.latitude}
						longitude={coordinates.longitude}
					/> */}
				</div>
			</div>

			{/* Mobile Map Preview */}
			<div className="h-64 w-full lg:hidden">
				{/* <BrandSiteMap
					latitude={coordinates.latitude}
					longitude={coordinates.longitude}
				/> */}
			</div>
		</main>
	);
}
