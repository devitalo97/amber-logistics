"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import {
	Map,
	MapMarker,
	type MapRef,
	MarkerContent,
} from "#/components/ui/map";

export type MapPoint = {
	lat: number | null;
	lng: number | null;
};

interface MapUpdaterProps {
	point: MapPoint;
	mapRef: RefObject<MapRef | null>;
}

function MapUpdater({ point, mapRef }: MapUpdaterProps) {
	const { lat, lng } = point;

	useEffect(() => {
		if (
			lat !== null &&
			lng !== null &&
			!Number.isNaN(lat) &&
			!Number.isNaN(lng)
		) {
			mapRef.current?.flyTo({
				center: [lng, lat],
				zoom: 12,
				duration: 1.5,
			});
		}
	}, [lat, lng, mapRef]);

	return null;
}

interface BrandSiteMapProps {
	point: MapPoint;
}

export function BrandSiteCreateMap({ point }: BrandSiteMapProps) {
	const { lat, lng } = point;
	const mapRef = useRef<MapRef>(null);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div className="flex h-full w-full items-center justify-center bg-muted">
				<p className="text-muted-foreground">Carregando mapa...</p>
			</div>
		);
	}

	const hasValidCoordinates =
		lat !== null &&
		lng !== null &&
		!Number.isNaN(lat) &&
		!Number.isNaN(lng) &&
		lat >= -90 &&
		lat <= 90 &&
		lng >= -180 &&
		lng <= 180;

	const defaultCenter = { lat: -14.235, lng: -51.9253 };
	const center = hasValidCoordinates ? { lng, lat } : defaultCenter;

	return (
		<>
			<Map
				className="h-full w-full"
				ref={mapRef}
				center={center}
				zoom={hasValidCoordinates ? 13 : 4}
			>
				{hasValidCoordinates && (
					<MapMarker longitude={center.lng} latitude={center.lat}>
						<MarkerContent>
							<div className="bg-primary size-4 rounded-full border-2 border-white shadow-lg" />
						</MarkerContent>
					</MapMarker>
				)}
			</Map>
			<MapUpdater point={point} mapRef={mapRef} />
		</>
	);
}
