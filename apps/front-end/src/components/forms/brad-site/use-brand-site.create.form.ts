import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { MapPoint } from "./brand-site.create.map.form";
import {
	type FullFormData,
	fullFormSchema,
	transformToUseCaseInput,
} from "./brand-site.create.schema.form";

export interface BrandSiteFormProps {
	handlePointChange: (point: MapPoint) => void;
}

export const useBrandSite = ({ handlePointChange }: BrandSiteFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FullFormData>({
		resolver: zodResolver(fullFormSchema),
		defaultValues: {
			waypoint_description: "",
			country_code: "",
			postal_code: "",
			state: "",
			city: "",
			address_line_1: "",
			address_line_2: "",
			time_zone: "",
			latitude: 0,
			longitude: 0,
			brand_type: undefined,
			storage_capacity_cbm: undefined,
			operational_status: undefined,
			brand_site_description: "",
		},
		mode: "onChange",
	});

	const onSubmit = async (data: FullFormData) => {
		setIsSubmitting(true);
		try {
			const payload = transformToUseCaseInput(data);
			console.log("Form submitted:", payload);
			alert("Brand Site criado com sucesso!");
		} catch (error) {
			console.error("Error submitting form:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const onCancel = () => {
		form.reset();
	};

	// Monitora latitude e longitude para atualizações no mapa
	const watchLatitude = form.watch("latitude");
	const watchLongitude = form.watch("longitude");

	const handleLatitudeChange = (value: string) => {
		const numValue = parseFloat(value);
		if (!Number.isNaN(numValue)) {
			handlePointChange({ lat: numValue, lng: watchLongitude || null });
		} else {
			handlePointChange({ lat: null, lng: watchLongitude || null });
		}
	};

	const handleLongitudeChange = (value: string) => {
		const numValue = parseFloat(value);
		if (!Number.isNaN(numValue)) {
			handlePointChange({ lat: watchLatitude || null, lng: numValue });
		} else {
			handlePointChange({ lat: watchLatitude || null, lng: null });
		}
	};

	const watchDescription = form.watch("brand_site_description");
	const descriptionLength = watchDescription?.length || 0;

	return {
		form,
		onSubmit,
		onCancel,
		isSubmitting,
		handleLatitudeChange,
		handleLongitudeChange,
		descriptionLength,
	};
};
