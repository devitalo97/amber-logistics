import { z } from "zod";
import {
	BrandTypeEnum,
	OperationStatusEnum,
	WaypointTypeEnum,
} from "#/types/brand-site.types";

// Step 1: Waypoint & Address Information
export const step1Schema = z.object({
	waypoint_description: z
		.string()
		.min(1, "Descrição do waypoint é obrigatória"),
	country_code: z
		.string()
		.min(2, "Código do país é obrigatório")
		.max(3, "Código do país deve ter no máximo 3 caracteres"),
	postal_code: z.string().min(1, "CEP é obrigatório"),
	state: z.string().min(1, "Estado é obrigatório"),
	city: z.string().min(1, "Cidade é obrigatória"),
	address_line_1: z.string().min(1, "Endereço linha 1 é obrigatório"),
	address_line_2: z.string().optional(),
	time_zone: z.string().optional(),
});

// Step 2: Geolocation Alignment
export const step2Schema = z.object({
	latitude: z.coerce
		.number({ error: "Latitude deve ser um número" })
		.min(-90, "Latitude deve ser maior ou igual a -90")
		.max(90, "Latitude deve ser menor ou igual a 90"),
	longitude: z.coerce
		.number({ error: "Longitude deve ser um número" })
		.min(-180, "Longitude deve ser maior ou igual a -180")
		.max(180, "Longitude deve ser menor ou igual a 180"),
});

// Step 3: Brand Site Operations
export const step3Schema = z.object({
	brand_type: z.enum(BrandTypeEnum, {
		error: "Tipo de unidade é obrigatório",
	}),
	storage_capacity_cbm: z.coerce
		.number({ error: "Capacidade deve ser um número" })
		.positive("Capacidade deve ser maior que zero")
		.optional()
		.or(z.literal("")),
	operational_status: z.enum(OperationStatusEnum, {
		error: "Status operacional é obrigatório",
	}),
	brand_site_description: z.string().min(1, "Descrição do site é obrigatória"),
});

// Combined schema for all steps
export const fullFormSchema = step1Schema
	.extend(step2Schema.shape)
	.extend(step3Schema.shape);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type FullFormData = z.infer<typeof fullFormSchema>;

// Function to transform form data to UseCaseInput
export function transformToUseCaseInput(data: FullFormData) {
	return {
		brandSite: {
			type: data.brand_type,
			storage_capacity_cbm:
				data.storage_capacity_cbm === ""
					? undefined
					: data.storage_capacity_cbm,
			operational_status: data.operational_status,
			description: data.brand_site_description,
		},
		waypoint: {
			description: data.waypoint_description || null,
			type: WaypointTypeEnum.brand_site,
			latitude: data.latitude,
			longitude: data.longitude,
			country_code: data.country_code || null,
			city: data.city || null,
			address_line_1: data.address_line_1 || null,
			address_line_2: data.address_line_2 || null,
			postal_code: data.postal_code || null,
			state: data.state || null,
			time_zone: data.time_zone || null,
		},
	};
}
