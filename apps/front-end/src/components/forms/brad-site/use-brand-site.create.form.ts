import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
	type FullFormData,
	fullFormSchema,
	transformToUseCaseInput,
} from "./brand-site.create.schema.form";

export interface BrandSiteFormProps {
	onCoordinatesChange: (lat: number | null, lng: number | null) => void;
}

export const useBrandSite = ({ onCoordinatesChange }: BrandSiteFormProps) => {
	const [currentStep, setCurrentStep] = useState(1);
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

	const validateCurrentStep = async () => {
		let fieldsToValidate: (keyof FullFormData)[] = [];

		switch (currentStep) {
			case 1:
				fieldsToValidate = [
					"waypoint_description",
					"country_code",
					"postal_code",
					"state",
					"city",
					"address_line_1",
				];
				break;
			case 2:
				fieldsToValidate = ["latitude", "longitude"];
				break;
			case 3:
				fieldsToValidate = [
					"brand_type",
					"operational_status",
					"brand_site_description",
				];
				break;
		}

		const result = await form.trigger(fieldsToValidate);
		return result;
	};

	const handleNext = async () => {
		const isValid = await validateCurrentStep();
		if (isValid && currentStep < 3) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1);
		}
	};

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

	// Watch latitude and longitude for map updates
	const watchLatitude = form.watch("latitude");
	const watchLongitude = form.watch("longitude");

	const handleLatitudeChange = (value: string) => {
		const numValue = parseFloat(value);
		if (!Number.isNaN(numValue)) {
			onCoordinatesChange(numValue, watchLongitude || null);
		} else {
			onCoordinatesChange(null, watchLongitude || null);
		}
	};

	const handleLongitudeChange = (value: string) => {
		const numValue = parseFloat(value);
		if (!Number.isNaN(numValue)) {
			onCoordinatesChange(watchLatitude || null, numValue);
		} else {
			onCoordinatesChange(watchLatitude || null, null);
		}
	};

	return {
		handleLatitudeChange,
		handleLongitudeChange,
		isSubmitting,
		handleNext,
		handleBack,
		onSubmit,
		form,
		currentStep,
	};
};
